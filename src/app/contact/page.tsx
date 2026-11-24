import type { Metadata } from "next";
import Mascot from "@/components/home/Mascot";
import Img from "@/components/Img";
import { SITE } from "@/data";
import LetterForm from "./LetterForm";
import { CART } from "./art";

export const metadata: Metadata = { title: "Visit & contact", description: "Visit our Downtown Dubai showroom or send us a letter." };

const Svg = ({ k }: { k: keyof typeof CART }) => <span aria-hidden className="contents" dangerouslySetInnerHTML={{ __html: CART[k] }} />;

export default function Contact() {
  return (
    <div className="hw-page">
      <section className="hw-scene" aria-labelledby="contact-title">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1 id="contact-title" className="font-plush text-giant max-w-[12ch] lg:col-span-7">Get in touch with us</h1>
            <p className="text-lede text-[var(--ink-soft)] lg:col-span-5 lg:pb-3">Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d love to hear from you!</p>
          </header>
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <LetterForm />
              <Mascot pose="sit" className="ml-auto mr-6 -mt-3 w-36 md:w-40" />
            </div>
            <div className="lg:col-span-5 lg:row-start-1">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-wa w-full sm:w-auto">WhatsApp {SITE.telLabel}</a>
              <dl className="mt-10 space-y-6">
                <div><dt className="font-scrawl text-[var(--ink-soft)]">call us</dt><dd className="mt-1 text-lg font-semibold"><a className="underline decoration-2 underline-offset-4" href={SITE.tel}>{SITE.telLabel}</a></dd></div>
                <div><dt className="font-scrawl text-[var(--ink-soft)]">email</dt><dd className="mt-1 break-all text-lg font-semibold"><a className="underline decoration-2 underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a></dd></div>
              </dl>
              <section aria-labelledby="visit-title" className="ct-shopfront mt-12">
                <Svg k="shop" />
                <div className="ct-visit relative p-7 pt-6">
                  <div>
                    <h2 id="visit-title" className="font-plush text-[2rem] leading-tight">Visit us in Downtown Dubai</h2>
                    <p className="mt-3 max-w-[38ch] text-cocoa-soft">Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p>
                    <p className="mt-4 flex items-center gap-2 font-semibold"><Svg k="pin" />Downtown Dubai, United Arab Emirates</p>
                    <a href={SITE.social} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6 !bg-milk">Open in Google Maps</a>
                  </div>
                  <figure className="ct-visit__photo"><Img src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg" alt="The apricot teddy bear puppy from our showroom, held up to say hello" /></figure>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
