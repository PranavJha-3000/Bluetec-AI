"use client";
import { useEffect, useRef } from "react";
import Mascot from "./Mascot";
import { Rig } from "./rig";

// The reference's "bow" pose, applied once; the art is otherwise the shared mascot.
export default function HomeTeddy() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const svg = box.current?.querySelector("svg");
    if (!svg) return;
    const rig = new Rig(svg, "bow", 1);
    rig.tick(0.016, 0);
  }, []);
  return <div ref={box} className="tph2-teddy"><Mascot pose="sit" /></div>;
}
