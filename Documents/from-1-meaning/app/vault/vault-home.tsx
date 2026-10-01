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
import { AnimatePresence, motion } from "framer-motion";

type VaultHomeProps = {
  memories: MemoryPreview[];
  letters: LetterPreview[];
  capsules: CapsulePreview[];
};

const STORY_IMAGES = [
  "/images/54.jpeg",
  "/images/30.jpeg",
  "/images/22.jpeg",
  "/images/24.jpeg",
] as const;

const STORY_LINES = [
  [
    "Log kya jaane tere baare me",
    "Koi mujhse puche ahemiyat teriii...💎",
    "Mai khudko girwi rakh dungi",
    "Agar log mere saamne lagaye kimat teri...",
  ],
  [
    "Kabhi Kabhi ",
    "Ek hi insan ki kami se",
    "Puri Kaainaat khali lagti hai...",
    "Aur tu toh sach me meri kaainaat hai yaar...❤️",
  ],
  [
    "Ki tune hi apne kadam piche karliye.. ",
    "Mujhme Kaha thi Himmat tujhe gawane ki?",
    "Tere liye to mai har shaqs ko thukra deti",
    "Tu zidd to karti mujhe paane ki....🤌",
  ],
  [
    "Safar me tu kisi or se milta bhatakta bhi hai",
    "Mujhe mat batana ye faisla tera hi hai",
    "Rehne de ye vehem mujhko ki tu ",
    "Sirf or sirf mera hi hai....🤌",
  ],
] as const;

const VIDEO_SRC = "/our.mp4";
const COVER_SRC = "/vaulthome.png";

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
          Babli & Kajal
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
          src="/vault.png"
          alt="A photograph from our album"
          fill
          priority
          sizes="100vw"
          className="book-cover-image"
        />
        <div className="book-cover-veil" aria-hidden="true" />
        <div className="book-cover-copy">
          <p className="book-cover-title">Babli & Kajal</p>
          <p className="book-cover-names">Forever through Memories</p>

          <div className="book-cover-actions">
            <Link
              href="/vault/birthday"
              className="book-cover-button book-cover-button--primary"
            >
              Happy Birthday
            </Link>

            <Link
              href="/story"
              className="book-cover-button book-cover-button--secondary"
            >
              Our Story
            </Link>
          </div>
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
      <StorySection />

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
      <FullImageSection />
    </main>
  );
}

function StorySection() {
  const totalSlides = Math.min(STORY_IMAGES.length, STORY_LINES.length);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (totalSlides <= 1) return;

    const timer = window.setInterval(() => {
      setDirection(1);

      setIndex((current) => (current + 1) % totalSlides);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [totalSlides]);

  if (!STORY_IMAGES.length || !totalSlides) return null;

  const currentIndex = index % totalSlides;
  const lines = STORY_LINES[currentIndex];
  const currentImage = STORY_IMAGES[currentIndex];

  function goToSlide(nextIndex: number) {
    if (nextIndex === currentIndex) return;

    setDirection(nextIndex > currentIndex ? 1 : -1);
    setIndex(nextIndex);
  }

  function goNext() {
    setDirection(1);
    setIndex((currentIndex + 1) % totalSlides);
  }

  function goPrevious() {
    setDirection(-1);
    setIndex((currentIndex - 1 + totalSlides) % totalSlides);
  }

  return (
    <section className="book-story" aria-labelledby="story-heading">
      <div className="book-story-inner">
        {/* Decorative hearts */}

        <span
          className="book-story-heart book-story-heart--one"
          aria-hidden="true"
        >
          ♡
        </span>

        <span
          className="book-story-heart book-story-heart--two"
          aria-hidden="true"
        >
          ♡
        </span>

        <span
          className="book-story-heart book-story-heart--three"
          aria-hidden="true"
        >
          ♡
        </span>

        <span
          className="book-story-heart book-story-heart--four"
          aria-hidden="true"
        >
          ♡
        </span>

        {/* LEFT — SHAYARI */}

        <div className="book-story-copy">
          <p id="story-heading" className="book-story-kicker">
            A changing page
          </p>

          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={`copy-${currentIndex}`}
              className="book-story-text"
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 28 : -28,
                y: 8,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -28 : 28,
                y: -8,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="book-story-line">
            <span />
            <span>♡</span>
            <span />
          </div>

          {/* Slide controls */}

          <div className="book-story-controls">
            <button
              type="button"
              className="book-story-control-arrow"
              onClick={goPrevious}
              aria-label="Previous memory"
            >
              ←
            </button>

            <div className="book-story-progress" aria-label="Story slides">
              {Array.from({ length: totalSlides }).map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  type="button"
                  className={dotIndex === currentIndex ? "is-active" : ""}
                  onClick={() => goToSlide(dotIndex)}
                  aria-label={`Go to memory ${dotIndex + 1}`}
                  aria-current={dotIndex === currentIndex ? "true" : undefined}
                />
              ))}
            </div>

            <button
              type="button"
              className="book-story-control-arrow"
              onClick={goNext}
              aria-label="Next memory"
            >
              →
            </button>
          </div>
        </div>

        {/* RIGHT — PHOTO */}

        <div className="book-story-photo-area">
          <div className="book-story-photo-stack">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={`photo-${currentIndex}`}
                className="book-story-photo is-active"
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 80 : -80,
                  rotate: direction > 0 ? 3 : -3,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotate: -1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -80 : 80,
                  rotate: direction > 0 ? -3 : 3,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="book-story-photo-paper">
                  <Image
                    src={currentImage}
                    alt=""
                    fill
                    sizes="(max-width: 800px) 90vw, 52vw"
                    className="book-story-photo-image"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
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
