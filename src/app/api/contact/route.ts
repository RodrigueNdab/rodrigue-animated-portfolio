import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getContactConfig } from '@/lib/contactConfig';

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
}

const ipCache = new Map<string, { count: number; expires: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (ipCache.size > 500) {
    for (const [key, val] of ipCache.entries()) {
      if (now > val.expires) {
        ipCache.delete(key);
      }
    }
  }
  const record = ipCache.get(ip);
  if (!record || now > record.expires) {
    ipCache.set(ip, { count: 1, expires: now + 15 * 60 * 1000 });
    return false;
  }
  if (record.count >= 5) {
    return true;
  }
  record.count += 1;
  return false;
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function cleanHeader(input: string): string {
  return input.replace(/[\r\n]/g, '').trim();
}

export async function POST(request: Request) {
  const config = getContactConfig();
  if (!config.enabled) {
    return NextResponse.json(
      { success: false, error: 'The contact form is not available. Please email directly.' },
      { status: 503 },
    );
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
      },
      { status: 429 },
    );
  }

  let name = '';
  let email = '';
  let message = '';

  try {
    const body = (await request.json()) as ContactRequestBody;
    name = body.name || '';
    email = body.email || '';
    message = body.message || '';
    if (body.website) {
      return NextResponse.json({ success: true, message: 'Thank you!' });
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid JSON request body',
      },
      {
        status: 400,
      },
    );
  }

  try {
    if (!name || !email || !message)
      return NextResponse.json(
        {
          success: false,
          error: 'All fields are required',
        },
        {
          status: 400,
        },
      );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        {
          status: 400,
        },
      );

    const disposableDomains = [
      'tempmail.com',
      'guerrillamail.com',
      '10minutemail.com',
      'mailinator.com',
      'yopmail.com',
      'throwaway.email',
      'fakeinbox.com',
      'maildrop.cc',
      'temp-mail.org',
      'getnada.com',
      'trashmail.com',
      'sharklasers.com',
      'grr.la',
      'mintemail.com',
      'test.com',
      'example.com',
      'fake.com',
      'spam4.me',
      'emailondeck.com',
    ];

    const parts = email.split('@');
    if (parts.length < 2) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    const domain = parts[1].toLowerCase();
    if (disposableDomains.includes(domain))
      return NextResponse.json(
        {
          success: false,
          error: 'Disposable emails are not allowed',
        },
        {
          status: 400,
        },
      );

    const username = parts[0];
    if (username.length < 1 || username.length > 64)
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        {
          status: 400,
        },
      );

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters long' },
        { status: 400 },
      );
    }
    if (!/[a-zA-Z]/.test(trimmedName)) {
      return NextResponse.json(
        { success: false, error: 'Name must contain at least one letter' },
        { status: 400 },
      );
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 30) {
      return NextResponse.json(
        { success: false, error: 'Please enter a meaningful message (at least 30 characters)' },
        { status: 400 },
      );
    }

    const escapedName = escapeHtml(trimmedName);
    const cleanReplyEmail = cleanHeader(email.trim());
    const escapedMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br>');
    const recipientEmail = config.to as string;
    const fromEmail = cleanHeader(config.from as string);
    const subject = `New message from ${cleanHeader(trimmedName)}`;
    const html = `<p><strong>Name:</strong> ${escapedName}</p><p><strong>Email:</strong> ${escapeHtml(cleanReplyEmail)}</p><p><strong>Message:</strong></p><p>${escapedMessage}</p>`;

    if (config.useResend) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + config.resendKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          reply_to: cleanReplyEmail,
          subject,
          html,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
        });
      }
      if (!config.useSmtp) {
        throw new Error(`Resend responded with status ${resendRes.status}`);
      }
    }

    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpPort === 465,
      auth: { user: config.smtpUser, pass: config.smtpPassword },
      connectionTimeout: 4000,
      greetingTimeout: 4000,
      socketTimeout: 4000,
    });

    await transporter.sendMail({
      from: fromEmail,
      to: recipientEmail,
      replyTo: cleanReplyEmail,
      subject,
      html,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    });
  } catch (error: any) {
    console.error('Contact form SMTP error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message. Please try again later.',
      },
      {
        status: 500,
      },
    );
  }
}
