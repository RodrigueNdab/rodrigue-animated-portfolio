import 'server-only';
import fs from 'fs';
import path from 'path';
import type { TalkRecord } from '@/content/types';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

/** True only when a site-root-relative path (e.g. `/uploads/a.pdf`) points to a real file in `public/`. */
export function publicFileExists(publicPath?: string): publicPath is string {
  if (!publicPath || !publicPath.startsWith('/')) return false;
  const resolved = path.join(PUBLIC_DIR, publicPath);
  if (!resolved.startsWith(PUBLIC_DIR + path.sep)) return false;
  try {
    return fs.statSync(resolved).isFile();
  } catch {
    return false;
  }
}

function listPublicDir(dir: string): string[] {
  try {
    return fs.readdirSync(path.join(PUBLIC_DIR, dir)).sort();
  } catch {
    return [];
  }
}

/** Portrait is used only if `public/images/profile/portrait.(jpg|jpeg|png|webp|avif)` exists. */
export function findPortrait(): string | undefined {
  const file = listPublicDir('images/profile').find((f) =>
    /^portrait\.(jpe?g|png|webp|avif)$/i.test(f),
  );
  return file ? `/images/profile/${file}` : undefined;
}

/** CV is offered only if a PDF exists in `public/documents/cv/`. */
export function findCv(): string | undefined {
  const file = listPublicDir('documents/cv').find((f) => /\.pdf$/i.test(f));
  return file ? `/documents/cv/${file}` : undefined;
}

/** Drops optional talk materials (programme, slides, video, photos) whose files are not present. */
export function resolveTalkAssets(talk: TalkRecord): TalkRecord {
  return {
    ...talk,
    programme: publicFileExists(talk.programme) ? talk.programme : undefined,
    slides: publicFileExists(talk.slides) ? talk.slides : undefined,
    video: talk.video && publicFileExists(talk.video.src) ? talk.video : undefined,
    photos: talk.photos?.filter((p) => publicFileExists(p.src)),
  };
}
