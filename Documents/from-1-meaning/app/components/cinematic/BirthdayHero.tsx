"use client";

import Image from "next/image";
import Link from "next/link";
import { birthdayHeroCopy } from "@/app/lib/cinematic/copy";

export default function BirthdayHero() {
  return (
    <section className="cine-hero" aria-label="Birthday hero" data-nav="light">
      <div className="cine-hero-scene">
        <div className="cine-hero-image">
          <Image
            src={birthdayHeroCopy.background}
            alt=""
            fill
            priority
            sizes="100vw"
            className="cine-cover"
          />
        </div>
        <div className="cine-hero-veil" aria-hidden="true" />

        <Link href="/story" className="cine-story-link">
          {birthdayHeroCopy.storyLinkLabel} <span>→</span>
        </Link>

        <div className="cine-hero-copy" aria-live="polite">
          {birthdayHeroCopy.stages.map((message, index) => (
            <p
              key={message}
              className={`cine-hero-word cine-hero-word--${index + 1}`}
            >
              {message}
            </p>
          ))}
        </div>

        <p className="cine-scroll-hint">{birthdayHeroCopy.scrollHint}</p>
      </div>
    </section>
  );
}
