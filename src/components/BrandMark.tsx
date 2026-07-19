export function BrandMark({
  size = "nav",
}: {
  size?: "nav" | "footer";
}) {
  const title =
    size === "footer"
      ? "font-display text-2xl font-semibold tracking-tight text-ink"
      : "font-display text-[1.35rem] font-semibold tracking-tight text-ink sm:text-xl";
  const byline =
    size === "footer"
      ? "mt-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink-soft"
      : "mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink-soft";

  return (
    <span className="inline-flex flex-col leading-none">
      <span className={title}>Pet Portraits</span>
      <span className={byline}>by Hadassah</span>
    </span>
  );
}
