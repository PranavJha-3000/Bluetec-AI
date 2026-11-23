import type { Metadata } from "next";
import { Suspense } from "react";
import PageHead from "@/components/PageHead";
import Browser from "./Browser";

export const metadata: Metadata = { title: "Puppies", description: "Meet the puppies looking for a home in Dubai." };

export default function Puppies() {
  return (
    <>
      <PageHead eyebrow="from Teddy's sketchbook" title="Meet the pups" />
      <Suspense fallback={null}>
        <Browser />
      </Suspense>
    </>
  );
}
