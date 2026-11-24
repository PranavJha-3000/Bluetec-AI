"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CURTAIN_ART } from "./curtain-art";
import "./curtain.css";

type State = "intro" | "idle" | "covering" | "covered" | "lifting";

// Page curtain from the reference: plays once on load, and covers/lifts around client-side navigations
// (internal link click -> cover -> router.push -> lift once the new path renders).
export default function Curtain() {
  const [state, setState] = useState<State>("intro");
  const path = usePathname();
  const router = useRouter();
  const pending = useRef<string | null>(null);
  const timer = useRef(0);
  const settle = useRef<(() => void) | null>(null); // resolves the native view transition once the new route has rendered

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- media query is only readable after mount
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setState("idle"); return; }
    timer.current = window.setTimeout(() => setState("idle"), 1100);
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (pending.current && pending.current.split(/[?#]/)[0] === path) {
      pending.current = null;
      settle.current?.(); settle.current = null;
      setState("lifting");
      timer.current = window.setTimeout(() => setState("idle"), 480);
    }
  }, [path]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target || a.hasAttribute("download")) return;
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search)) return; // same page or hash jump: no curtain
      e.preventDefault(); e.stopPropagation(); // capture phase: pre-empt next/link so the curtain covers first
      pending.current = u.pathname;
      setState("covering");
      const go = () => router.push(u.pathname + u.search + u.hash);
      window.setTimeout(() => {
        setState("covered");
        // Native View Transitions API (where supported): the browser snapshots the covered page and swaps to the new route under the curtain.
        if ("startViewTransition" in document) document.startViewTransition(() => new Promise<void>((done) => { settle.current = done; go(); }));
        else go();
      }, 300);
      // fail-safe: never leave the page covered
      window.setTimeout(() => { if (pending.current) { pending.current = null; settle.current?.(); settle.current = null; setState("lifting"); window.setTimeout(() => setState("idle"), 480); } }, 4000);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <div className="cu-curtain" data-state={state} aria-hidden="true">
      <div className="cu-curtain__blanket" dangerouslySetInnerHTML={{ __html: CURTAIN_ART }} />
    </div>
  );
}
