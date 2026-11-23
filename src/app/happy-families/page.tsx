import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Wall from "./Wall";

export const metadata: Metadata = { title: "Happy families", description: "Families who brought their TeddyPups puppy home." };

export default function Families() {
  return (
    <>
      <PageHead eyebrow="the polaroid wall" title="Happy families" />
      <Wall />
    </>
  );
}
