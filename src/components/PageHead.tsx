export default function PageHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="wrap pt-16 pb-10 text-center">
      <p className="hand text-xl text-toffee-ink">{eyebrow}</p>
      <h1 className="mt-2 text-[clamp(2.75rem,8vw,6.2rem)] leading-[0.92]">{title}</h1>
      {sub && <p className="mx-auto mt-5 max-w-2xl text-lg text-cocoa-soft">{sub}</p>}
    </div>
  );
}
