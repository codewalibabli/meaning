"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CommentSection from "@/app/components/CommentSection";

type Letter = {
  _id: string;
  title: string;
  content: string;
  date: string;
  author?: "babli" | "kajal";
  recipient?: "babli" | "kajal";
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function LetterReader({ letter }: { letter: Letter }) {
  const router = useRouter();

  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const author = letter.author ?? "babli";
  const recipient = letter.recipient ?? "kajal";

  const authorName = author === "babli" ? "Babli" : "Kajal";
  const recipientName = recipient === "babli" ? "Babli" : "Kajal";

  async function removeLetter() {
    setDeleting(true);

    const response = await fetch(`/api/letters/${letter._id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      router.push("/vault/letters");
      router.refresh();
    } else {
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <main className="letter-reader-page">
      {/* =====================================================
          TOP NAV
      ===================================================== */}

      <header className="letter-reader-top">
        <Link href="/vault/letters">Letters / back to the archive</Link>

        <span>Private correspondence</span>
      </header>

      {/* =====================================================
          LETTER HEADER
      ===================================================== */}

      <section className="letter-reader-intro">
        <span
          className="letter-reader-heart letter-reader-heart--one"
          aria-hidden="true"
        >
          ♡
        </span>

        <span
          className="letter-reader-heart letter-reader-heart--two"
          aria-hidden="true"
        >
          ♡
        </span>

        <div className="letter-reader-intro-inner">
          <p className="letter-reader-eyebrow">02 / private correspondence</p>

          <h1>
            A letter,
            <br />
            <em>kept here.</em>
          </h1>

          <div className="letter-reader-divider">
            <span />
            <span>♡</span>
            <span />
          </div>

          <p>
            Some words are worth giving
            <br />a quiet place to stay.
          </p>
        </div>
      </section>

      {/* =====================================================
          LETTER PAPER
      ===================================================== */}

      <section className="letter-reader-section">
        <div className="letter-reader-layout">
          <aside className="letter-reader-side">
            <span className="letter-reader-number">02</span>

            <p>
              written by
              <br />
              {authorName}
            </p>

            <div className="letter-reader-side-line" />

            <p>
              for
              <br />
              {recipientName}
            </p>
          </aside>

          <article className="letter-reader-paper">
            {/* paper hearts */}

            <span
              className="letter-paper-heart letter-paper-heart--one"
              aria-hidden="true"
            >
              ♡
            </span>

            <span
              className="letter-paper-heart letter-paper-heart--two"
              aria-hidden="true"
            >
              ♡
            </span>

            {/* paper header */}

            <header className="letter-paper-header">
              <div>
                <p className="letter-paper-date">{formatDate(letter.date)}</p>

                <p className="letter-paper-private">Private letter</p>
              </div>

              <div className="letter-paper-from">
                <span>From</span>
                <strong>{authorName}</strong>

                <span>To</span>
                <strong>{recipientName}</strong>
              </div>
            </header>

            {/* title */}

            <div className="letter-paper-title">
              <p className="letter-paper-small-label">words that stayed</p>

              <h2>{letter.title}</h2>

              <div className="letter-paper-rule">
                <span />
                <span>♡</span>
                <span />
              </div>
            </div>

            {/* content */}

            <div className="letter-reader-content">
              {letter.content
                .split("\n")
                .filter((paragraph) => paragraph.trim())
                .map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`}>{paragraph}</p>
                ))}
            </div>

            {/* sign off */}

            <footer className="letter-reader-signature">
              <span>kept here, quietly.</span>

              <strong>{authorName}</strong>
            </footer>

            {/* actions */}

            <div className="letter-reader-actions">
              <Link href={`/vault/letters/${letter._id}/edit`}>
                Edit letter
                <span>↗</span>
              </Link>

              <button type="button" onClick={() => setConfirming(true)}>
                Delete letter
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* =====================================================
          COMMENTS
      ===================================================== */}

      <section className="letter-comments-section">
        <div className="letter-comments-heading">
          <p>03 / conversation</p>

          <h2>
            Words after
            <br />
            <em>the letter.</em>
          </h2>
        </div>

        <CommentSection targetId={letter._id} targetType="letter" />
      </section>

      {/* =====================================================
          DELETE CONFIRMATION
      ===================================================== */}

      {confirming && (
        <div
          className="letter-confirm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-confirm-title"
        >
          <div className="letter-confirm-box">
            <p className="letter-confirm-label">A small goodbye</p>

            <h2 id="letter-confirm-title">Let this letter go?</h2>

            <p>Its words will leave the archive.</p>

            <div className="letter-confirm-actions">
              <button type="button" onClick={() => setConfirming(false)}>
                Keep it
              </button>

              <button type="button" disabled={deleting} onClick={removeLetter}>
                {deleting ? "Letting go..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
