import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import LetterForm from "./LetterForm";
import { SITE } from "@/data";

export const metadata: Metadata = { title: "Visit & contact", description: "Visit our Downtown Dubai showroom or send us a letter." };

export default function Contact() {
  return (
    <>
      <PageHead eyebrow="write us a letter" title="Visit & contact" sub={SITE.address} />
      <div className="wrap grid gap-10 pb-8 lg:grid-cols-[1fr_20rem]">
        <LetterForm />
        <aside className="grid content-start gap-4">
          <a className="card p-5" href={SITE.whatsapp}><b>WhatsApp</b><br />Chat with us</a>
          <a className="card p-5" href={SITE.tel}><b>Call</b><br />{SITE.telLabel}</a>
          <a className="card p-5" href={`mailto:${SITE.email}`}><b>Email</b><br />{SITE.email}</a>
          <a className="card p-5" href={SITE.social}><b>Find us</b><br />{SITE.address}</a>
        </aside>
      </div>
    </>
  );
}
