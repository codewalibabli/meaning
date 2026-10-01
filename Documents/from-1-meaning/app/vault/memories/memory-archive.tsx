"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./memory.css";

type Media = { url: string; resourceType?: "image" | "video" | string };
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
  if (typeof value === "string") return [{ url: value }];
  return Array.isArray(value) ? value : [value];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function MemoryArchive({ memories }: { memories: Memory[] }) {
  const [filter, setFilter] = useState<"babli" | "kajal">("babli");
  const visibleMemories = memories.filter(
    (memory) => (memory.perspective ?? "babli") === filter,
  );

  return (
    <main className="memento-shell memento-archive-page">
      <div className="memory-archive-shell">
        <header className="memory-archive-top">
          <Link href="/vault" className="memory-archive-brand">
            MEMENTO
          </Link>

          <nav className="memory-archive-nav" aria-label="Archive navigation">
            <Link href="/vault">Home</Link>
            <Link href="/story">Story</Link>
            <Link href="/vault/letters">Letters</Link>
            <Link href="/vault/capsules">Capsules</Link>
          </nav>
        </header>

        {/* rest of your Memory Archive */}
      </div>

      <section className="memento-page-header">
        <p className="memento-kicker">02 / archive</p>
        <h1>Memories</h1>
        <p>the moments we decided to keep.</p>
        <Link
          href="/vault/memories/new"
          className="memento-button memento-button--primary"
        >
          + New memory
        </Link>
      </section>

      <div className="memento-filter-row" aria-label="Perspective filter">
        {(["babli", "kajal"] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={`memento-filter-pill ${filter === option ? "is-active" : ""}`}
            onClick={() => setFilter(option)}
          >
            {option === "babli" ? "Babli" : "Kajal"}
          </button>
        ))}
      </div>

      {visibleMemories.length === 0 ? (
        <section className="memento-empty-state">
          <h2>Nothing here yet.</h2>
          <p>Every story begins with a moment.</p>
        </section>
      ) : (
        <section
          className="memento-memory-grid memento-memory-grid--archive"
          aria-label="Memory archive"
        >
          {visibleMemories.map((memory) => {
            const media = mediaList(memory.media);
            const first = media[0];
            const perspective =
              memory.perspective === "kajal"
                ? "KAJAL'S MEMORY"
                : "BABLI'S MEMORY";

            return (
              <Link
                key={memory._id}
                href={`/vault/memories/${memory._id}`}
                className="memento-memory-card memento-memory-card--archive"
              >
                <div className="memento-memory-image-wrap">
                  {first && first.resourceType === "video" ? (
                    <video
                      src={first.url}
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : first ? (
                    <Image
                      src={first.url}
                      alt={memory.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 40vw"
                      className="memento-memory-image"
                    />
                  ) : (
                    <div className="memento-memory-placeholder">
                      A story without a photograph
                    </div>
                  )}
                </div>
                <div className="memento-memory-body">
                  <p className="memento-memory-meta">
                    {formatDate(memory.date)}
                  </p>
                  <p className="memento-memory-perspective">{perspective}</p>
                  <h3>{memory.title}</h3>
                  <p className="memento-memory-story">{memory.story}</p>
                  <span className="memento-text-link memento-text-link--inline">
                    Open memory →
                  </span>
                </div>
              </Link>
            );
          })}
          <section className="memento-heart-section">
            {/* Main large heart */}
            <span className="memento-heart-section__outline" aria-hidden="true">
              ♡
            </span>

            {/* Surrounding hearts */}
            <span
              className="memento-heart-section__heart memento-heart-section__heart--one"
              aria-hidden="true"
            >
              ♡
            </span>

            <span
              className="memento-heart-section__heart memento-heart-section__heart--two"
              aria-hidden="true"
            >
              ♡
            </span>

            {/* Content inside the heart */}
            <div className="memento-heart-section__content">
              <p className="memento-heart-section__label">
                You are my beautiful memory jaana....💗
              </p>

              <p>
                Can't forget the single moments
                <br />
                that made us laugh, cry, and love
              </p>
            </div>

            {/* Bottom surrounding hearts */}
            <span
              className="memento-heart-section__heart memento-heart-section__heart--three"
              aria-hidden="true"
            >
              ♡
            </span>

            <span
              className="memento-heart-section__heart memento-heart-section__heart--four"
              aria-hidden="true"
            >
              ♡
            </span>
          </section>
        </section>
      )}
    </main>
  );
}
