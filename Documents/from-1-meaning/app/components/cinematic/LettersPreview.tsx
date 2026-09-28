"use client";

import Link from "next/link";
import { lettersCopy } from "@/app/lib/cinematic/copy";
import { formatDate, formatPerspective } from "@/app/lib/cinematic/media";
import type { LetterPreview } from "@/app/lib/cinematic/types";

export default function LettersPreview({
  letters,
}: {
  letters: LetterPreview[];
}) {
  const preview = letters.slice(0, 3);

  return (
    <section
      className="cine-letters"
      aria-labelledby="letters-heading"
      data-nav="dark"
    >
      <div className="cine-quiet-copy">
        <p className="cine-kicker">Letters</p>
        <h2 id="letters-heading">{lettersCopy.heading}</h2>
        <p className="cine-lead">{lettersCopy.supporting}</p>
        <p className="cine-body">{lettersCopy.body}</p>
      </div>

      {preview.length > 0 ? (
        <div className="cine-envelope-row">
          {preview.map((letter, index) => (
            <Link
              key={letter._id}
              href={`/vault/letters/${letter._id}`}
              className={`cine-envelope cine-envelope--${index + 1}`}
            >
              <span className="cine-envelope-flap" aria-hidden="true" />
              <span className="cine-envelope-mark">
                {formatPerspective(letter.author)}
              </span>
              <h3>{letter.title}</h3>
              <p>{formatDate(letter.date)}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="cine-empty-line">
          No letters yet. The page is still warm.
        </p>
      )}

      <div className="cine-row-links cine-row-links--ink">
        <Link href="/vault/letters" className="cine-text-link">
          Read Our Letters <span>→</span>
        </Link>
        <Link href="/vault/letters/new" className="cine-text-link">
          Write a Letter +
        </Link>
      </div>
    </section>
  );
}
