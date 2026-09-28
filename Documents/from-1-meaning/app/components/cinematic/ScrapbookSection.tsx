"use client";

import { useMemo } from "react";
import ScrapbookPhoto from "@/app/components/cinematic/ScrapbookPhoto";
import { scrapbookCopy } from "@/app/lib/cinematic/copy";
import { collectMemoryImages } from "@/app/lib/cinematic/media";
import type { MemoryPreview } from "@/app/lib/cinematic/types";

export default function ScrapbookSection({
  memories,
}: {
  memories: MemoryPreview[];
}) {
  const images = useMemo(() => collectMemoryImages(memories, 6), [memories]);

  return (
    <section
      className="cine-scrapbook"
      aria-labelledby="scrapbook-heading"
      data-nav="dark"
    >
      <div className="cine-scrapbook-scene">
        <p className="cine-kicker">A scrapbook of us</p>
        <h2 id="scrapbook-heading">{scrapbookCopy.heading}</h2>
        <p className="cine-scrapbook-line">{scrapbookCopy.line}</p>

        {images.length > 0 ? (
          <div className="cine-scrapbook-stage" aria-label="Memory collage">
            {images.map((src, index) => (
              <ScrapbookPhoto key={`${src}-${index}`} src={src} index={index} />
            ))}
          </div>
        ) : (
          <p className="cine-empty-line">
            The table is cleared. The photographs will find their places.
          </p>
        )}
      </div>
    </section>
  );
}
