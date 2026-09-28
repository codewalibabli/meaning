"use client";

import { coupleIntroCopy } from "@/app/lib/cinematic/copy";

export default function CoupleIntro() {
  const [babli, kajal] = coupleIntroCopy.names
    .split("&")
    .map((part) => part.trim());

  return (
    <section
      className="cine-couple"
      aria-labelledby="couple-title"
      data-nav="dark"
    >
      <div className="cine-couple-scene">
        <div
          className="cine-couple-photo"
          style={{ backgroundImage: `url(${coupleIntroCopy.image})` }}
          aria-hidden="true"
        />
        <p className="cine-kicker">The two of us</p>
        <h2
          id="couple-title"
          className="cine-name-mask"
          style={{ backgroundImage: `url(${coupleIntroCopy.image})` }}
        >
          <span>{babli}</span>
          <span className="cine-name-amp">&</span>
          <span>{kajal}</span>
        </h2>
        <p className="cine-couple-line">{coupleIntroCopy.supporting}</p>
      </div>
    </section>
  );
}
