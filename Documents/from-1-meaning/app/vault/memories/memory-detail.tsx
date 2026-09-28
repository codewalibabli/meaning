"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CommentSection from "@/app/components/CommentSection";

type Media = {
  url: string;
  publicId?: string;
  resourceType?: "image" | "video" | string;
};

type Memory = {
  _id: string;
  title: string;
  story: string;
  date: string;
  perspective?: "babli" | "kajal";
  media?: string | Media | Media[];
};

function mediaList(value: Memory["media"]): Media[] {
  if (!value) return [];

  if (typeof value === "string") {
    return [{ url: value }];
  }

  return Array.isArray(value) ? value : [value];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function MemoryDetail({ memory }: { memory: Memory }) {
  const router = useRouter();

  const media = mediaList(memory.media);

  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const current = media[selected];

  const perspective = memory.perspective ?? "babli";

  const perspectiveName = perspective === "babli" ? "Babli" : "Kajal";

  async function removeMemory() {
    setDeleting(true);

    try {
      const response = await fetch(`/api/memories/${memory._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/vault/memories");
        router.refresh();
        return;
      }

      setDeleting(false);
      setConfirming(false);
    } catch {
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <main className="memory-detail-page">
      {/* TOP BAR */}

      <header className="memory-detail-top">
        <Link href="/vault/memories">Memories / back to the archive</Link>

        <span>Private memory</span>
      </header>

      {/* MEMORY HEADING */}

      <section className="memory-detail-heading">
        <span
          className="memory-detail-heading__heart memory-detail-heading__heart--one"
          aria-hidden="true"
        >
          ♡
        </span>

        <span
          className="memory-detail-heading__heart memory-detail-heading__heart--two"
          aria-hidden="true"
        >
          ♡
        </span>

        <span
          className="memory-detail-heading__heart memory-detail-heading__heart--three"
          aria-hidden="true"
        >
          ♡
        </span>

        <div className="memory-detail-heading__inner">
          <p className="memory-detail-eyebrow">{formatDate(memory.date)}</p>

          <h1>{memory.title}</h1>

          <div className="memory-detail-heading__rule">
            <span />
            <span>♡</span>
            <span />
          </div>

          <p className="memory-detail-heading__from">
            remembered by {perspectiveName}
          </p>
        </div>
      </section>

      {/* MEMORY */}

      <section className="memory-detail-section">
        <div className="memory-detail-layout">
          {/* SIDE INFORMATION */}

          <aside className="memory-detail-side">
            <span className="memory-detail-number">01</span>

            <p>
              remembered by
              <br />
              {perspectiveName}
            </p>

            <div className="memory-detail-side-line" />

            <p>{formatDate(memory.date)}</p>
          </aside>

          {/* PAPER */}

          <article className="memory-detail-paper">
            <span
              className="memory-paper-heart memory-paper-heart--one"
              aria-hidden="true"
            >
              ♡
            </span>

            <span
              className="memory-paper-heart memory-paper-heart--two"
              aria-hidden="true"
            >
              ♡
            </span>

            {/* MEDIA */}

            <div className="memory-detail-media">
              <div className="memory-detail-media-main">
                {current ? (
                  current.resourceType === "video" ? (
                    <video src={current.url} controls playsInline />
                  ) : (
                    <button
                      type="button"
                      className="memory-detail-image-button"
                      onClick={() => setLightbox(true)}
                      aria-label="Open memory photo"
                    >
                      <Image
                        src={current.url}
                        alt={memory.title}
                        fill
                        priority
                        sizes="(max-width: 900px) 100vw, 760px"
                        className="memory-detail-image"
                      />
                    </button>
                  )
                ) : (
                  <div className="memory-detail-no-photo">
                    <span>♡</span>

                    <p>
                      A photograph
                      <br />
                      will live here.
                    </p>
                  </div>
                )}
              </div>

              {/* THUMBNAILS */}

              {media.length > 1 && (
                <div
                  className="memory-detail-thumbnails"
                  aria-label="Memory media"
                >
                  {media.map((item, index) => (
                    <button
                      type="button"
                      key={item.publicId ?? `${item.url}-${index}`}
                      className={index === selected ? "is-selected" : ""}
                      onClick={() => setSelected(index)}
                      aria-label={`View memory media ${index + 1}`}
                    >
                      {item.resourceType === "video" ? (
                        <video
                          src={item.url}
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <Image
                          src={item.url}
                          alt=""
                          fill
                          sizes="90px"
                          className="memory-thumb-image"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PAPER META */}

            <header className="memory-paper-header">
              <div className="memory-paper-meta">
                <p>{formatDate(memory.date)}</p>

                <span>Private memory</span>
              </div>

              <div className="memory-paper-perspective">
                <span>Remembered by</span>

                <strong>{perspectiveName}</strong>
              </div>
            </header>

            {/* TITLE */}

            <div className="memory-paper-title">
              <p>a moment that stayed</p>

              <h2>{memory.title}</h2>

              <div className="memory-paper-rule">
                <span />
                <span>♡</span>
                <span />
              </div>
            </div>

            {/* STORY */}

            <div className="memory-detail-story">
              {memory.story
                .split("\n")
                .filter((paragraph) => paragraph.trim())
                .map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`}>{paragraph}</p>
                ))}
            </div>

            {/* FOOTER */}

            <footer className="memory-detail-footer">
              <div className="memory-detail-signature">
                <span>kept in the archive, quietly.</span>

                <strong>{perspectiveName}</strong>
              </div>

              <div className="memory-detail-actions">
                <Link href={`/vault/memories/${memory._id}/edit`}>
                  Edit memory
                  <span>↗</span>
                </Link>

                <button type="button" onClick={() => setConfirming(true)}>
                  Delete memory
                </button>
              </div>
            </footer>
          </article>
        </div>
      </section>

      {/* COMMENTS */}

      <section className="memory-comments-section">
        <div className="memory-comments-heading">
          <p>02 / conversation</p>

          <h2>
            What we
            <br />
            <em>remember.</em>
          </h2>
        </div>

        <CommentSection targetId={memory._id} targetType="memory" />
      </section>

      {/* LIGHTBOX */}

      {lightbox && current && current.resourceType !== "video" && (
        <div
          className="memory-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded memory photo"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="memory-lightbox-close"
            aria-label="Close expanded photo"
            onClick={() => setLightbox(false)}
          >
            ×
          </button>

          <img
            src={current.url}
            alt={memory.title}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      {/* DELETE CONFIRMATION */}

      {confirming && (
        <div
          className="memory-confirm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="memory-confirm-title"
        >
          <div className="memory-confirm-box">
            <p className="memory-confirm-label">A small goodbye</p>

            <h2 id="memory-confirm-title">Let this memory go?</h2>

            <p>
              It will leave the archive,
              <br />
              but not the story.
            </p>

            <div className="memory-confirm-actions">
              <button type="button" onClick={() => setConfirming(false)}>
                Keep it
              </button>

              <button type="button" onClick={removeMemory} disabled={deleting}>
                {deleting ? "Letting go..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
