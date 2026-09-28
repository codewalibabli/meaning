"use client";

import Link from "next/link";
import Image from "next/image";
import type { MemoryPreview } from "@/app/lib/cinematic/types";

type MemoryMedia = {
  url: string;
  publicId?: string;
  resourceType?: "image" | "video";
  format?: string;
};

type MemoryWithMedia = MemoryPreview & {
  media?: MemoryMedia[] | MemoryMedia | string;
  image?: string;
};

function getMedia(memory: MemoryPreview) {
  const media = memory.media;

  if (Array.isArray(media) && media.length > 0) {
    return media[0];
  }

  if (media && typeof media === "object" && "url" in media) {
    return media;
  }

  if (typeof media === "string" && media) {
    return { url: media, resourceType: "image" as const };
  }

  return null;
}

export function MemoryVisual({
  memory,
  index,
}: {
  memory: MemoryPreview;
  index: number;
}) {
  const media = getMedia(memory);

  return (
    <div className="cine-memory-visual" data-memory-index={index}>
      <Link
        href={`/vault/memories/${memory._id}`}
        className="cine-memory-visual-link"
        aria-label={`Open memory: ${memory.title}`}
      >
        {media?.resourceType === "video" ? (
          <video
            src={media.url}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="cine-memory-video"
          />
        ) : media?.url ? (
          <Image
            src={media.url}
            alt={memory.title}
            fill
            sizes="(max-width: 980px) 100vw, 55vw"
            className="object-cover"
            priority={index === 0}
          />
        ) : (
          <div className="cine-memory-fallback">{memory.title}</div>
        )}
      </Link>
    </div>
  );
}

export function MemoryCopy({ memory }: { memory: MemoryPreview }) {
  return (
    <div className="cine-memory-copy">
      <Link href={`/vault/memories/${memory._id}`} className="block">
        <h3>{memory.title}</h3>

        <div className="cine-memory-meta">
          <span>
            {new Date(memory.date).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          {memory.perspective && (
            <span>
              {memory.perspective === "babli"
                ? "Babli's memory"
                : "Kajal's memory"}
            </span>
          )}
        </div>

        {memory.story && <p className="cine-memory-story">{memory.story}</p>}

        <span className="cine-memory-open">Open memory →</span>
      </Link>
    </div>
  );
}
