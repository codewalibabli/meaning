"use client";

import Image from "next/image";
import { loveCopy } from "@/app/lib/cinematic/copy";

export default function LoveSection() {
  return (
    <section
      className="cine-love"
      aria-labelledby="love-heading"
      data-nav="light"
    >
      <div className="cine-love-image">
        <Image
          src={loveCopy.image}
          alt=""
          fill
          sizes="100vw"
          className="cine-cover"
        />
      </div>
      <div className="cine-love-veil" aria-hidden="true" />
      <div className="cine-love-copy">
        <h2 id="love-heading">{loveCopy.title}</h2>
        <p>
          {loveCopy.lines[0]}
          <br />
          {loveCopy.lines[1]}
        </p>
      </div>
    </section>
  );
}
