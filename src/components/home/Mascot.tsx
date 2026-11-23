import { MASCOT_ART } from "./mascot-art";

export default function Mascot({ pose = "peek", className }: { pose?: "peek" | "sit" | "walk"; className?: string }) {
  return <div aria-hidden className={className} dangerouslySetInnerHTML={{ __html: MASCOT_ART[pose] }} />;
}
