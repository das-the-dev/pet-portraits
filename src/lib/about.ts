import fs from "node:fs";
import path from "node:path";

const ABOUT_DIR = path.join(process.cwd(), "public", "about");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

// Looks for any image in public/about/ and uses the first one found.
// Drop your photo there as e.g. artist.jpg — no code changes needed.
export function getArtistPhoto(): string | undefined {
  let files: string[] = [];
  try {
    files = fs.readdirSync(ABOUT_DIR);
  } catch {
    return undefined;
  }

  const image = files
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()[0];

  if (!image) return undefined;
  return `/about/${encodeURIComponent(image)}`;
}
