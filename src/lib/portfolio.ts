/*
  ─────────────────────────────────────────────────────────────
  YOUR PORTFOLIO  —  the easy way.

  You do NOT need to edit this file. Just drop your photos into the
  folder:   public/portfolio

  • The file's NAME becomes the caption shown under the portrait.
        golden-retriever.jpg   →   "Golden Retriever"
        cricket.jpg            →   "Cricket"
  • Photos appear in alphabetical order. To control the order (and
    which 4 show on the homepage), start the name with a number:
        01-golden-retriever.jpg
        02-cricket.jpg
    The number is hidden in the caption — it's only for ordering.
  • The first 4 photos automatically become the homepage "favorites".

  (If the folder is empty, the sample placeholders below are shown
  instead, so the site always looks finished.)
  ─────────────────────────────────────────────────────────────
*/
import fs from "node:fs";
import path from "node:path";

export type Portrait = {
  id: string;
  name: string;
  subtitle: string;
  image?: string;
  featured?: boolean;
  zoom?: number; // 1 = no zoom; 1.4 = zoomed in 40% to crop the background
  position?: string; // which part stays centered, e.g. "50% 40%" (x y)
};

/*
  Per-photo overrides. The key is the file name without its extension.
    name:     the caption shown (overrides the auto name from the filename)
    subtitle: the small text on the right (breed, medium, etc.)
    zoom:     1 = original. Higher zooms in and crops the edges/background.
    position: which part to keep centered as it zooms. "50% 50%" is dead
              center; lower the 2nd number to favor the top of the drawing.
  (Just tell me e.g. "more zoom on the chihuahua" and I'll adjust these.)
*/
type Override = {
  name?: string;
  subtitle?: string;
  zoom?: number;
  position?: string;
};

const OVERRIDES: Record<string, Override> = {
  "01-golden-retriever": { name: "Willow", zoom: 1.12, position: "54% 40%" },
  "02-cricket": { name: "Cricket" },
  "03-chihuahua": { name: "Pip", zoom: 1.22, position: "42% 50%" },
  "04-yorkshire-terrier": { name: "Shadow" },
  "06-red-stag": { name: "Elk" },
  "07-mountain-lion": { zoom: 1.32, position: "50% 42%" },
};

const PORTFOLIO_DIR = path.join(process.cwd(), "public", "portfolio");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

// The medium shown under each piece. Change this default if you like.
const DEFAULT_MEDIUM = "Colored Pencil";

function prettyName(file: string): string {
  return file
    .replace(/\.[^.]+$/, "") // drop the extension
    .replace(/^\d+[-_\s]*/, "") // drop a leading order-number like "01-"
    .replace(/[-_]+/g, " ") // dashes/underscores → spaces
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Title Case
}

// Shown only when you haven't added any photos yet.
const samplePortfolio: Portrait[] = [
  { id: "s1", name: "Your Pet", subtitle: DEFAULT_MEDIUM, featured: true },
  { id: "s2", name: "Their Best Friend", subtitle: DEFAULT_MEDIUM, featured: true },
  { id: "s3", name: "A Loyal Companion", subtitle: DEFAULT_MEDIUM, featured: true },
  { id: "s4", name: "A Treasured Friend", subtitle: DEFAULT_MEDIUM, featured: true },
];

export function getPortfolio(): Portrait[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(PORTFOLIO_DIR);
  } catch {
    files = [];
  }

  const images = files
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (images.length === 0) return samplePortfolio;

  return images.map((file, i) => {
    const id = file.replace(/\.[^.]+$/, "").toLowerCase();
    const override = OVERRIDES[id] ?? {};
    // Bust browser / Next image cache when you replace a photo with the same name
    let version = "0";
    try {
      version = String(Math.floor(fs.statSync(path.join(PORTFOLIO_DIR, file)).mtimeMs));
    } catch {
      /* ignore */
    }
    return {
      id,
      name: override.name ?? prettyName(file),
      subtitle: override.subtitle ?? DEFAULT_MEDIUM,
      image: `/portfolio/${encodeURIComponent(file)}?v=${version}`,
      featured: i < 4,
      zoom: override.zoom,
      position: override.position,
    };
  });
}

export function getFeatured(): Portrait[] {
  return getPortfolio().filter((p) => p.featured);
}
