"use client";
import { useState } from "react";
import Img from "@/components/Img";
import { mediaUrl, type Media } from "@/data";

export default function Gallery({ media }: { media: Media[] }) {
  const [i, setI] = useState(0);
  const [play, setPlay] = useState(false);
  const m = media[i];
  const go = (d: number) => { setPlay(false); setI((i + d + media.length) % media.length); };
  return (
    <div>
      <div className="card relative aspect-[4/5] overflow-hidden">
        {m.kind === "video" ? (
          play
            ? <video src={mediaUrl(m.url)} poster={m.poster && mediaUrl(m.poster)} autoPlay muted loop playsInline controls className="h-full w-full object-cover" />
            : <>
                <Img src={m.poster ?? m.url} alt={m.alt} />
                <button onClick={() => setPlay(true)} aria-label="Play video" className="absolute inset-0 m-auto h-20 w-20 rounded-full border-[3px] border-cocoa bg-honey text-3xl">▶</button>
              </>
        ) : <Img m={m} eager />}
        {media.length > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border-2 border-cocoa bg-milk">‹</button>
            <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border-2 border-cocoa bg-milk">›</button>
            <span className="hand absolute bottom-3 left-3 rounded-full bg-cocoa px-3 py-1 text-sm text-milk">{i + 1} / {media.length}</span>
          </>
        )}
      </div>
    </div>
  );
}
