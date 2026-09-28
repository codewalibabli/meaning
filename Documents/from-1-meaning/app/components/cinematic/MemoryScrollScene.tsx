"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MemoryCopy,
  MemoryVisual,
} from "@/app/components/cinematic/MemoryScene";
import { memoriesIntroCopy } from "@/app/lib/cinematic/copy";
import { homepageMemories } from "@/app/lib/cinematic/media";
import type { MemoryPreview } from "@/app/lib/cinematic/types";

export default function MemoryScrollScene({
  memories,
}: {
  memories: MemoryPreview[];
}) {
  const scenes = homepageMemories(memories);

  return (
    <section
      className="cine-memories"
      aria-labelledby="memory-showcase-heading"
      data-nav="light"
    >
      <div className="cine-memories-scene">
        <div className="cine-memory-background">
          <Image
            src="/images/35.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="cine-memory-background-image"
          />

          <div className="cine-memory-background-overlay" />
        </div>

        {scenes.length > 0 ? (
          <div className="cine-memory-frame">
            <div className="cine-memory-media" aria-label="Featured memories">
              {scenes.map((memory, index) => (
                <MemoryVisual
                  key={`${memory._id}-visual`}
                  memory={memory}
                  index={index}
                />
              ))}
            </div>

            <div className="cine-memory-rail">
              <p className="cine-kicker cine-kicker--light">
                Our little memories
              </p>
              <h2 id="memory-showcase-heading">{memoriesIntroCopy.heading}</h2>
              <p className="cine-memories-quote">{memoriesIntroCopy.quote}</p>

              <div className="cine-memory-copy-stack">
                {scenes.map((memory) => (
                  <MemoryCopy key={`${memory._id}-copy`} memory={memory} />
                ))}
              </div>

              <div className="cine-row-links">
                <Link href="/vault/memories" className="cine-text-link">
                  See All Memories <span>→</span>
                </Link>
                <Link href="/vault/memories/new" className="cine-text-link">
                  Write a Memory +
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="cine-memory-empty">
            <p className="cine-kicker cine-kicker--light">
              Our little memories
            </p>
            <h2 id="memory-showcase-heading">{memoriesIntroCopy.heading}</h2>
            <p>The first page of this scrapbook is still blank.</p>
            <Link href="/vault/memories/new" className="cine-text-link">
              Write a Memory +
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
