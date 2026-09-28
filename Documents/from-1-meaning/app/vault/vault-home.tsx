"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { authApi } from "@/app/lib/api";
import {
  collectMemoryImages,
  formatDate,
  formatPerspective,
  getPrimaryVisual,
  visualSrc,
} from "@/app/lib/cinematic/media";
import type {
  CapsulePreview,
  LetterPreview,
  MemoryPreview,
} from "@/app/lib/cinematic/types";
import "./vault-home.css";

type VaultHomeProps = {
  memories: MemoryPreview[];
  letters: LetterPreview[];
  capsules: CapsulePreview[];
};

const STORY_LINES = [
  ["Some days are ordinary.", "Until we remember them."],
  ["Some photographs hold", "more than a thousand words."],
  ["We were never trying", "to make memories.", "We were simply living."],
] as const;

const VIDEO_SRC = "/images/3.mp4";
const COVER_SRC = "/images/24.jpeg";

function personLabel(value?: string) {
  return value === "kajal" ? "Kajal" : "Babli";
}

function featuredMemories(memories: MemoryPreview[]) {
  const withVisual = memories.filter((memory) => getPrimaryVisual(memory));

  const source = withVisual.length > 0 ? withVisual : memories;

  return source.slice(0, 6);
}

export default function VaultHome({
  memories,
  letters,
  capsules,
}: VaultHomeProps) {
  const selectedMemories = featuredMemories(memories);
  const selectedLetters = letters.slice(0, 2);
  const lockedCount = capsules.filter((capsule) => capsule.locked).length;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleLogout() {
    try {
      await authApi.logout();
    } finally {
      window.location.href = "/login";
    }
  }

  return (
    <main className="book-home">
      <header className={`book-nav ${scrolled ? "is-scrolled" : ""}`}>
        <Link href="/vault" className="book-brand">
          MEMENTO
        </Link>
        <nav className="book-nav-links" aria-label="Main navigation">
          <Link href="/story">Our Story</Link>
          <Link href="/vault/memories">Memories</Link>
          <Link href="/vault/letters">Letters</Link>
          <Link href="/vault/capsules">Capsules</Link>
          <button type="button" className="book-logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <section className="book-cover" aria-label="Album cover">
        <Image
          src={COVER_SRC}
          alt="A photograph from our album"
          fill
          priority
          sizes="100vw"
          className="book-cover-image"
        />
        <div className="book-cover-veil" aria-hidden="true" />
        <div className="book-cover-copy">
          <p className="book-cover-title">ours.</p>
          <p className="book-cover-names">Babli & Kajal</p>
        </div>
        <p className="book-scroll-hint">scroll</p>
      </section>

      <section
        className="book-section book-memories"
        aria-labelledby="memories-heading"
      >
        <span className="memory-glow memory-glow-one" aria-hidden="true" />
        <span className="memory-glow memory-glow-two" aria-hidden="true" />

        <span className="memory-heart memory-heart-one" aria-hidden="true">
          ♡
        </span>

        <span className="memory-heart memory-heart-two" aria-hidden="true">
          ♡
        </span>

        <div className="memories-inner">
          <header className="memories-header">
            <div>
              <div className="memory-label">
                <span />
                OUR MEMORIES
                <span />
              </div>

              <h2 id="memories-heading">
                Little
                <br />
                moments.
              </h2>
            </div>

            <p className="memories-description">
              The days we almost forgot to remember,
              <br />
              kept somewhere between then and now.
            </p>
          </header>

          {selectedMemories.length > 0 ? (
            <div className="memory-cards">
              {selectedMemories.slice(0, 6).map((memory, index) => {
                const visual = getPrimaryVisual(memory);
                const src = visual ? visualSrc(visual, 1200) : "";
                const isVideo = visual?.resourceType === "video";

                return (
                  <Link
                    key={memory._id}
                    href={`/vault/memories/${memory._id}`}
                    className={`memory-card memory-card-${index + 1}`}
                  >
                    <div className="memory-card-image">
                      {src && !isVideo ? (
                        <Image
                          src={src}
                          alt={memory.title}
                          fill
                          sizes="(max-width: 600px) 45vw, (max-width: 900px) 45vw, 280px"
                          className="memory-card-photo"
                        />
                      ) : visual?.url && isVideo ? (
                        <video
                          src={visual.url}
                          className="memory-card-video"
                          muted
                          autoPlay
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <div className="memory-no-image">
                          <span>♡</span>
                          <p>No photograph yet</p>
                        </div>
                      )}

                      <div className="memory-card-overlay">
                        <span>View memory</span>
                        <strong>↗</strong>
                      </div>
                    </div>

                    <div className="memory-card-content">
                      <div className="memory-card-meta">
                        <span>{formatPerspective(memory.perspective)}</span>

                        <span className="memory-meta-dot" />

                        <span>{formatDate(memory.date)}</span>
                      </div>

                      <h3>{memory.title}</h3>

                      <span className="memory-card-arrow">↗</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="memory-empty-card">
              <span>♡</span>
              <p>The first photographs are still waiting.</p>
            </div>
          )}

          <div className="memories-bottom">
            <p>A small collection of moments that became ours.</p>

            <Link href="/vault/memories" className="memories-view-button">
              View all memories
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
      <StorySection memories={memories} />
      <FullImageSection />
      <section
        className="book-section book-letters"
        aria-labelledby="letters-heading"
      >
        <header className="book-section-intro">
          <h2 id="letters-heading">Words we kept.</h2>
          <p>Some things are easier to write than say.</p>
        </header>

        {selectedLetters.length > 0 ? (
          <div className="book-letter-row">
            {selectedLetters.map((letter, index) => (
              <Link
                key={letter._id}
                href={`/vault/letters/${letter._id}`}
                className={`book-letter book-letter--${index % 2 === 0 ? "left" : "right"}`}
              >
                <span className="book-letter-mark">Letter</span>
                <p className="book-letter-from">
                  {personLabel(letter.author)} → {personLabel(letter.recipient)}
                </p>
                <small>{formatDate(letter.date)}</small>
                <h3>{letter.title}</h3>
              </Link>
            ))}
          </div>
        ) : (
          <p className="book-empty">The desk is still empty of letters.</p>
        )}

        <Link href="/vault/letters" className="book-text-button">
          Read our letters
        </Link>
      </section>

      <VideoSection />

      <section className="book-capsules" aria-labelledby="capsules-heading">
        <div className="book-lock" aria-hidden="true">
          <svg viewBox="0 0 72 72" fill="none">
            <rect
              x="16"
              y="32"
              width="40"
              height="28"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M24 32V24a12 12 0 0 1 24 0v8"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="36" cy="46" r="2.4" fill="currentColor" />
          </svg>
        </div>
        <p className="book-capsule-verse">
          Some things are meant
          <br />
          for a later day.
        </p>
        <h2 id="capsules-heading">Time Capsules</h2>
        {lockedCount > 0 ? (
          <p className="book-capsule-count">
            {lockedCount} {lockedCount === 1 ? "memory" : "memories"} waiting
            for another day
          </p>
        ) : null}
        <Link href="/vault/capsules" className="book-text-button">
          Open the capsules
        </Link>
      </section>
    </main>
  );
}

function StorySection({ memories }: { memories: MemoryPreview[] }) {
  const images = useMemo(() => collectMemoryImages(memories, 3), [memories]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % STORY_LINES.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  const lines = STORY_LINES[index];

  return (
    <section className="book-story" aria-labelledby="story-heading">
      {images.map((src, imageIndex) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          className={`book-story-image ${imageIndex === index % images.length ? "is-active" : ""}`}
        />
      ))}
      <div className="book-story-veil" aria-hidden="true" />
      <div className="book-story-copy" aria-live="polite">
        <p id="story-heading" className="book-story-kicker">
          A changing page
        </p>
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </section>
  );
}

function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [engaged, setEngaged] = useState(false);

  async function playMoment() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    try {
      await video.play();
      setEngaged(true);
    } catch {
      video.muted = true;
      await video.play();
      setEngaged(true);
    }
  }

  return (
    <section className="book-video" aria-label="A video memory">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster="/images/4.jpeg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="book-video-veil" aria-hidden="true" />
      {!engaged ? (
        <button type="button" className="book-play" onClick={playMoment}>
          <span className="book-play-ring" aria-hidden="true" />
          Play our moment
        </button>
      ) : null}
    </section>
  );
}

function FullImageSection() {
  return (
    <section className="memento-full-image">
      <Image
        src="/hero.png"
        alt=""
        width={1920}
        height={1080}
        sizes="100vw"
        className="memento-full-image__img"
      />
    </section>
  );
}
