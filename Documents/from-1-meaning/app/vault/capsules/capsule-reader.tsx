"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CommentSection from "@/app/components/CommentSection";

type Capsule = {
  _id: string;
  title: string;
  unlockAt: string;
  createdAt: string;
  locked: boolean;
  content?: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function CapsuleReader({ capsule }: { capsule: Capsule }) {
  const router = useRouter();

  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function remove() {
    setDeleting(true);

    try {
      const response = await fetch(`/api/capsules/${capsule._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/vault/capsules");
        router.refresh();
      } else {
        setDeleting(false);
        setConfirming(false);
      }
    } catch {
      setDeleting(false);
      setConfirming(false);
    }
  }

  const isLocked = capsule.locked;

  return (
    <main
      className={`capsule-reader-page ${isLocked ? "is-locked" : "is-open"}`}
    >
      {/* ------------------------------------------------
          TOP
      ------------------------------------------------ */}

      <header className="capsule-reader-top">
        <Link href="/vault/capsules">
          Capsules <span>/ back to the archive</span>
        </Link>

        <span>{isLocked ? "A sealed page" : "A page opened"}</span>
      </header>

      {/* ------------------------------------------------
          READER
      ------------------------------------------------ */}

      <section className="capsule-reader-shell">
        <article className="capsule-reader-paper">
          {/* Decorative number */}

          <span className="capsule-reader-number" aria-hidden="true">
            {isLocked ? "04" : "04"}
          </span>

          {/* Heart */}

          <span className="capsule-reader-heart" aria-hidden="true">
            ♡
          </span>

          {/* Status */}

          <div className="capsule-reader-status">
            <span className="capsule-reader-status-line" />

            <span>
              {isLocked ? "waiting for its moment" : "the moment has arrived"}
            </span>

            <span className="capsule-reader-status-line" />
          </div>

          {/* Title */}

          <h1>{capsule.title}</h1>

          {/* ------------------------------------------------
              LOCKED
          ------------------------------------------------ */}

          {isLocked ? (
            <div className="capsule-reader-locked">
              <div className="capsule-reader-symbol">♡</div>

              <p className="capsule-reader-locked-title">
                Some words
                <br />
                are meant to wait.
              </p>

              <div className="capsule-reader-rule">
                <span />
                <span>♡</span>
                <span />
              </div>

              <p className="capsule-reader-unlock-label">This page opens on</p>

              <p className="capsule-reader-unlock-date">
                {formatDate(capsule.unlockAt)}
              </p>

              <p className="capsule-reader-locked-note">
                Until then, its words remain quietly sealed.
              </p>

              <Link className="capsule-reader-back" href="/vault/capsules">
                Return to the archive
                <span>↗</span>
              </Link>
            </div>
          ) : (
            /* ------------------------------------------------
               OPENED
            ------------------------------------------------ */

            <div className="capsule-reader-open">
              <div className="capsule-reader-open-meta">
                <span>Written {formatDate(capsule.createdAt)}</span>

                <span>Opened {formatDate(capsule.unlockAt)}</span>
              </div>

              <div className="capsule-reader-rule">
                <span />
                <span>♡</span>
                <span />
              </div>

              <div className="capsule-reader-content">
                {capsule.content?.split("\n").map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`}>{paragraph}</p>
                ))}
              </div>

              <div className="capsule-reader-signoff">
                <span>kept for the right day.</span>
                <strong>♡</strong>
              </div>
            </div>
          )}

          {/* ------------------------------------------------
              ACTIONS
          ------------------------------------------------ */}

          <div className="capsule-reader-actions">
            {isLocked && (
              <Link href={`/vault/capsules/${capsule._id}/edit`}>
                Edit capsule
                <span>↗</span>
              </Link>
            )}

            <button type="button" onClick={() => setConfirming(true)}>
              Delete capsule
            </button>
          </div>
        </article>
      </section>

      {/* ------------------------------------------------
          COMMENTS
      ------------------------------------------------ */}

      {!isLocked && (
        <div className="capsule-reader-comments">
          <CommentSection targetId={capsule._id} targetType="capsule" />
        </div>
      )}

      {/* ------------------------------------------------
          DELETE CONFIRMATION
      ------------------------------------------------ */}

      {confirming && (
        <div
          className="capsule-confirm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="capsule-confirm-title"
        >
          <div className="capsule-confirm-paper">
            <span className="capsule-confirm-heart" aria-hidden="true">
              ♡
            </span>

            <p className="capsule-confirm-kicker">a small goodbye</p>

            <h2 id="capsule-confirm-title">Let this capsule go?</h2>

            <p className="capsule-confirm-copy">
              It will leave the archive,
              <br />
              unopened or not.
            </p>

            <div className="capsule-confirm-rule">
              <span />
              <span>♡</span>
              <span />
            </div>

            <div className="capsule-confirm-actions">
              <button type="button" onClick={() => setConfirming(false)}>
                Keep it
              </button>

              <button type="button" disabled={deleting} onClick={remove}>
                {deleting ? "Letting go..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
