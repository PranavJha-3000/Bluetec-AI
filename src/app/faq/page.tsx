import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import FaqBoard from "./FaqBoard";
import { faqs } from "@/data";

export const metadata: Metadata = { title: "FAQ", description: "Answers about our puppies, health checks, delivery and reservations." };

export default function Faq() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  return (
    <>
      <PageHead eyebrow="pinned to the board" title="Good questions" sub="Everything families ask us before bringing a puppy home." />
      <FaqBoard />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
