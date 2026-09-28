"use client";

import Image from "next/image";

type ScrapbookPhotoProps = {
  src: string;
  index: number;
  nodeRef?: (node: HTMLElement | null) => void;
};

export default function ScrapbookPhoto({
  src,
  index,
  nodeRef,
}: ScrapbookPhotoProps) {
  return (
    <figure
      ref={nodeRef}
      className={`cine-scrap-photo cine-scrap-photo--${index + 1}`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 760px) 72vw, 22vw"
        className="cine-cover"
      />
    </figure>
  );
}
