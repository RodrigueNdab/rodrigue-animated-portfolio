import 'server-only';

/** Server-side contact-form delivery settings. Nothing here is exposed to the browser. */
export function getContactConfig() {
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPassword = process.env.SMTP_PASSWORD;

  const resend = Boolean(resendKey && from);
  const smtp = Boolean(smtpHost && smtpUser && smtpPassword && from);

  return {
    to,
    from,
    resendKey,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPassword,
    useResend: resend,
    useSmtp: smtp,
    enabled: Boolean(to && (resend || smtp)),
  };
}
