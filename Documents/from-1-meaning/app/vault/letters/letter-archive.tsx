"use client";

import Link from "next/link";
import { useState } from "react";
import "./letter.css";
import ArchiveClosingImage from "@/app/components/ArchieveClosingImage";

type Letter = {
  _id: string;
  title: string;
  date: string;
  author?: "babli" | "kajal";
  recipient?: "babli" | "kajal";
  createdAt: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function LetterArchive({ letters }: { letters: Letter[] }) {
  const [filter, setFilter] = useState<"babli" | "kajal">("babli");

  const visibleLetters = letters.filter(
    (letter) => (letter.author ?? "babli") === filter,
  );

  return (
    <main className="letters-page">
      {/* Decorative hearts */}
      <div className="letters-page-hearts" aria-hidden="true">
        <span className="letters-page-heart letters-page-heart--one">💗</span>

        <span className="letters-page-heart letters-page-heart--two">💗</span>

        <span className="letters-page-heart letters-page-heart--three">💗</span>

        <span className="letters-page-heart letters-page-heart--four">💗</span>
      </div>

      <div className="letters-page-shell">
        {/* TOP NAV */}
        <header className="letters-page-top">
          <Link href="/vault" className="letters-page-brand">
            Babli & Kajal
          </Link>

          <nav className="letters-page-nav" aria-label="Letters navigation">
            <Link href="/vault">Home</Link>
            <Link href="/vault/memories">Memories</Link>
            <Link href="/vault/letters" className="is-active">
              Letters
            </Link>
            <Link href="/vault/capsules">Capsules</Link>
          </nav>
        </header>

        {/* INTRO */}
        <section className="letters-page-intro">
          <div className="letters-page-intro-copy">
            <p className="letters-page-kicker">03 / words we kept</p>

            <h1>
              Letters
              <em>we never wanted to lose.</em>
            </h1>

            <p className="letters-page-description">
              Some things are easier to write than to say.
              <br />
              So we kept the words here.
            </p>

            <Link href="/vault/letters/new" className="letters-write-button">
              <span>+</span>
              Write a letter
            </Link>
          </div>

          <div className="letters-page-intro-mark" aria-hidden="true">
            <span>♡</span>
            <small>
              words
              <br />
              kept here
            </small>
          </div>
        </section>

        {/* FILTER */}
        <section className="letters-filter-section">
          <div className="letters-filter-heading">
            <span>01</span>
            <p>whose words?</p>
          </div>

          <div className="letters-filter-options">
            {(["babli", "kajal"] as const).map((option) => {
              const active = filter === option;

              return (
                <button
                  key={option}
                  type="button"
                  className={`letters-filter-option ${
                    active ? "is-active" : ""
                  }`}
                  onClick={() => setFilter(option)}
                >
                  <span className="letters-filter-name">
                    {option === "babli" ? "Babli" : "Kajal"}
                  </span>

                  <span className="letters-filter-sub">
                    {option === "babli" ? "her words" : "her words"}
                  </span>

                  <span className="letters-filter-symbol">
                    {active ? "♡" : "○"}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ARCHIVE */}
        <section className="letters-archive">
          <div className="letters-archive-heading">
            <div>
              <p className="letters-page-kicker">the archive</p>

              <h2>
                Words worth
                <br />
                <em>keeping.</em>
              </h2>
            </div>

            <span className="letters-count">
              {String(visibleLetters.length).padStart(2, "0")}
            </span>
          </div>

          {visibleLetters.length === 0 ? (
            <section className="letters-empty">
              <span className="letters-empty-heart">♡</span>

              <p className="letters-page-kicker">nothing here yet</p>

              <h3>
                The first letter
                <br />
                is still waiting.
              </h3>

              <p>Maybe there are words you've been meaning to write.</p>

              <Link href="/vault/letters/new" className="letters-empty-link">
                Write the first letter
                <span>↗</span>
              </Link>
            </section>
          ) : (
            <div className="letters-list">
              {visibleLetters.map((letter, index) => {
                const author = letter.author ?? "babli";

                const recipient =
                  letter.recipient ?? (author === "babli" ? "kajal" : "babli");

                return (
                  <article
                    key={letter._id}
                    className={`letter-card ${
                      index % 2 === 0
                        ? "letter-card--left"
                        : "letter-card--right"
                    }`}
                  >
                    {/* Number */}
                    <div className="letter-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Paper */}
                    <div className="letter-card-paper">
                      <div className="letter-card-top">
                        <span>{formatDate(letter.date)}</span>

                        <span>
                          {author === "babli" ? "from Babli" : "from Kajal"}
                        </span>
                      </div>

                      <div className="letter-card-rule">
                        <span />
                        <span>♡</span>
                        <span />
                      </div>

                      <div className="letter-card-content">
                        <p className="letter-card-label">
                          A letter for{" "}
                          {recipient === "babli" ? "Babli" : "Kajal"}
                        </p>

                        <h3>{letter.title}</h3>

                        <p className="letter-card-from">
                          written by{" "}
                          <em>{author === "babli" ? "Babli" : "Kajal"}</em>
                        </p>
                      </div>

                      <div className="letter-card-bottom">
                        <Link
                          href={`/vault/letters/${letter._id}`}
                          className="letter-open-link"
                        >
                          Open letter
                          <span>→</span>
                        </Link>

                        <Link
                          href={`/vault/letters/${letter._id}/edit`}
                          className="letter-edit-link"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>

                    {/* Decorative heart */}
                    <span className="letter-card-heart" aria-hidden="true">
                      💗
                    </span>
                  </article>
                );
              })}
            </div>
          )}
          <ArchiveClosingImage />
        </section>
      </div>
    </main>
  );
}
