"use client";

import Link from "next/link";
import "./capsule.css";
import ArchiveClosingImage from "@/app/components/ArchieveClosingImage";

type Capsule = {
  _id: string;
  title: string;
  unlockAt: string;
  createdAt: string;
  locked: boolean;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function CapsuleArchive({ capsules }: { capsules: Capsule[] }) {
  return (
    <main className="capsules-page">
      {/* TOP NAV */}
      <header className="capsules-top">
        <Link href="/vault" className="capsules-brand">
          MEMENTO
        </Link>

        <nav className="capsules-nav">
          <Link href="/vault">Home</Link>
          <Link href="/story">Story</Link>
          <Link href="/vault/memories">Memories</Link>
          <Link href="/vault/letters">Letters</Link>
        </nav>
      </header>

      {/* INTRO */}
      <section className="capsules-intro">
        <div className="capsules-intro-copy">
          <p className="capsules-kicker">04 / for another day</p>

          <h1>
            Time
            <br />
            <em>capsules.</em>
          </h1>

          <p className="capsules-description">
            Words written today,
            <br />
            waiting for another version of us.
          </p>

          <Link href="/vault/capsules/new" className="capsules-create-button">
            <span>+</span>
            Seal a capsule
          </Link>
        </div>

        <div className="capsules-intro-mark" aria-hidden="true">
          <span className="capsules-large-heart">♡</span>
          <span className="capsules-small-heart">♡</span>
        </div>
      </section>

      {/* ARCHIVE */}
      {capsules.length === 0 ? (
        <section className="capsules-empty">
          <div className="capsules-empty-paper">
            <span className="capsules-empty-number">01</span>

            <div className="capsules-empty-icon">✦</div>

            <p className="capsules-kicker">Sabra... Ka fal Tikha hota hai </p>

            <h2>
              Kyaaaaaa kuch batane ko nhi???? Aisa kaise ho sakta hai Jaana??
            </h2>

            <p>
              Some words are meant to wait.
              <br />
              Perhaps the first one can begin today.
            </p>

            <Link href="/vault/capsules/new" className="capsules-empty-link">
              Create the first capsule
              <span>↗</span>
            </Link>
          </div>
        </section>
      ) : (
        <section className="capsules-archive">
          <div className="capsules-archive-heading">
            <div>
              <p className="capsules-kicker">the archive</p>
              <h2>Words for later.</h2>
            </div>

            <span>{String(capsules.length).padStart(2, "0")} capsules</span>
          </div>

          <div className="capsules-list">
            {capsules.map((capsule, index) => (
              <article
                key={capsule._id}
                className={`capsule-paper ${
                  index % 2 === 0
                    ? "capsule-paper--cream"
                    : "capsule-paper--rose"
                }`}
              >
                {/* decorative marks */}
                <span className="capsule-paper-heart" aria-hidden="true">
                  ♡
                </span>

                <div className="capsule-paper-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div
                  className={`capsule-paper-status ${
                    capsule.locked
                      ? "capsule-paper-status--locked"
                      : "capsule-paper-status--opened"
                  }`}
                >
                  <span className="capsule-status-symbol" aria-hidden="true">
                    {capsule.locked ? "🔒" : "🔓"}
                  </span>

                  <div className="capsule-status-copy">
                    <span className="capsule-status-label">
                      {capsule.locked ? "SEALED" : "OPENED"}
                    </span>

                    <span className="capsule-status-text">
                      {capsule.locked
                        ? "Thoda intezar kar meri fuggiiii...🫣"
                        : "Madamji intezar khatam huaa..."}
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3>{capsule.title}</h3>

                <div className="capsule-paper-rule">
                  <span />
                  <span>♡</span>
                  <span />
                </div>

                {/* DATES */}
                <div className="capsule-paper-dates">
                  <div>
                    <span>Written</span>
                    <strong>{formatDate(capsule.createdAt)}</strong>
                  </div>

                  <div
                    className={
                      capsule.locked
                        ? "capsule-date-highlight capsule-date-highlight--locked"
                        : "capsule-date-highlight capsule-date-highlight--opened"
                    }
                  >
                    <span>{capsule.locked ? "Opens on" : "Opened on"}</span>
                    <strong>{formatDate(capsule.unlockAt)}</strong>
                  </div>
                </div>

                {/* ACTION */}
                <Link
                  href={`/vault/capsules/${capsule._id}`}
                  className="capsule-paper-link"
                >
                  {capsule.locked ? "Open sealed capsule" : "Read capsule"}

                  <span>↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CLOSING */}
      <section className="capsules-closing">
        <span className="capsules-closing-heart">♡</span>

        <p className="capsules-kicker">until then</p>

        <h2>
          Kuch Baaton se Anjaan rehna Chahiye....
          <br />
          <em>Jaaanaaa..❤️</em>
        </h2>

        <p>
          Kuch Baatein Thodi or gehri 🤌
          <br />
          Inke liye thoda sa intezaar kr meri Jaan ❤️
        </p>
      </section>

      <footer className="capsules-footer">
        <span>Babli & Kajal</span>
        <span>♡</span>
        <span>words for another day</span>
      </footer>
      <ArchiveClosingImage />
    </main>
  );
}
