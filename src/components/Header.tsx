"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SITE } from "@/data";

export const NAV = [
  { href: "/", label: "Home" }, { href: "/puppies", label: "Puppies" }, { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" }, { href: "/faq", label: "FAQ" }, { href: "/contact", label: "Visit & contact" },
];

export default function Header() {
  const path = usePathname();
  // Menu is open only for the path it was opened on, so navigating closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === path;
  const setOpen = useCallback((v: boolean) => setOpenAt(v ? path : null), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, setOpen]);
  // Reference behaviour: the bar slides away while scrolling down past the hero and returns on any upward scroll.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = scrollY, raf = 0;
    const on = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; const y = scrollY; if (Math.abs(y - last) > 4) { setHidden(y > 120 && y > last); last = y; } }); };
    addEventListener("scroll", on, { passive: true });
    return () => { removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));

  return (
    <>
      <header data-hidden={hidden && !open} className="sticky top-0 z-50 flex transition-transform duration-300 ease-[var(--ease-silk)] data-[hidden=true]:-translate-y-[120%] h-[var(--header-h)] items-center justify-between bg-milk/90 backdrop-blur px-[var(--gutter)]">
        <Link href="/" className="flex items-center gap-3 font-display text-xl font-extrabold">
          <Image src="/brand/logo.png" alt="" width={48} height={48} priority className="h-12 w-12 rounded-full" />
          TeddyPups
        </Link>
        <nav aria-label="Main" className="hidden gap-9 font-medium lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} className={`relative ${active(n.href) ? "text-toffee-deep" : ""}`}>
              {n.label}
              {active(n.href) && <span aria-hidden className="absolute left-1/2 top-full -translate-x-1/2 text-[10px]">🐾</span>}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={SITE.whatsapp} className="hidden whitespace-nowrap rounded-full border-2 border-cocoa bg-wa px-5 sm:inline-flex py-2 font-bold text-white shadow-[0_4px_0_-1px_var(--color-cocoa)]">WhatsApp us</a>
          <button className="rounded-full border-2 border-cocoa px-4 py-2 font-bold lg:hidden" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      {open && (
        <div id="menu" role="dialog" aria-label="Menu" className="fixed inset-0 top-[var(--header-h)] z-40 flex flex-col gap-2 overflow-auto bg-milk p-[var(--gutter)] lg:hidden">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="font-display text-5xl font-extrabold">{n.label}</Link>)}
          <a href={SITE.whatsapp} className="btn btn-wa mt-6 self-start">WhatsApp us</a>
          <a href={SITE.tel} className="mt-2 font-semibold">{SITE.telLabel}</a>
        </div>
      )}
      <div className="fixed inset-x-0 bottom-0 z-50 flex h-[var(--bar-h)] items-start gap-3 border-t-2 border-cocoa bg-milk p-2 pb-[env(safe-area-inset-bottom)] md:hidden">
        <a href={SITE.whatsapp} className="flex-1 rounded-full bg-wa py-3 text-center font-bold text-white">WhatsApp</a>
        <a href={SITE.tel} className="flex-1 rounded-full border-2 border-cocoa py-3 text-center font-bold">Call</a>
      </div>
    </>
  );
}
