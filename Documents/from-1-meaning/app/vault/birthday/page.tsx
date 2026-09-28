import Image from "next/image";
import "./birthday.css";

export default function BirthdayPage() {
  return (
    <main className="birthday-page">
      {/* =====================================================
          HERO — IMAGE ONLY
      ===================================================== */}

      <section className="birthday-hero">
        <Image
          src="/birthday.png"
          alt="Babli and Kajal"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          className="birthday-hero-image"
        />
      </section>

      {/* =====================================================
          BIRTHDAY INTRO
      ===================================================== */}

      <section className="birthday-intro">
        <span className="birthday-heart birthday-heart--one" aria-hidden="true">
          ♡
        </span>

        <span className="birthday-heart birthday-heart--two" aria-hidden="true">
          ♡
        </span>

        <span
          className="birthday-heart birthday-heart--three"
          aria-hidden="true"
        >
          ♡
        </span>

        <div className="birthday-intro-inner">
          <p className="birthday-eyebrow">01 / a little celebration</p>

          <h1>
            Happy Birthday,
            <br />
            <em>Kajal.</em>
          </h1>

          <div className="birthday-rule">
            <span />
            <span>♡</span>
            <span />
          </div>

          <p className="birthday-intro-text">
            For the person who somehow became such a beautiful part of my
            everyday life.
          </p>
        </div>
      </section>

      {/* =====================================================
          LETTER
      ===================================================== */}

      <section className="birthday-letter-section">
        <div className="birthday-letter-layout">
          <aside className="birthday-letter-side">
            <span>02</span>
            <p>
              words I
              <br />
              wanted to
              <br />
              tell you
            </p>
          </aside>

          <article className="birthday-letter">
            <p className="birthday-letter-greeting">Dear Kajal,</p>

            <p>
              I don't really know how to put years of friendship into a few
              words. Somehow, whenever I try, there is always another memory
              that comes to mind.
            </p>

            <p>
              The stupid conversations, the random plans, the endless laughs,
              the little fights, the moments where we had absolutely no idea
              what we were doing and somehow still had the best time.
            </p>

            <p>
              There are so many ordinary days that never felt ordinary because
              you were a part of them.
            </p>

            <p>
              And maybe that's what makes our friendship special. We never had
              to make everything perfect. We just kept being ourselves.
            </p>

            <p>
              I hope this new year of your life gives you countless reasons to
              smile. I hope you meet people who make you feel loved, experience
              moments that become stories, and find the courage to choose
              everything that genuinely makes you happy.
            </p>

            <p>
              And wherever life takes us from here, I hope there will always be
              a little corner of it that belongs to all the memories we made
              together.
            </p>

            <p className="birthday-letter-emphasis">
              Here's to another year of your beautiful chaos.
            </p>

            <div className="birthday-signature">
              <span>with love, always</span>
              <strong>Babli</strong>
            </div>
          </article>
        </div>
      </section>

      {/* =====================================================
          MEMORY LINE
      ===================================================== */}

      <section className="birthday-closing">
        <span
          className="birthday-heart birthday-heart--four"
          aria-hidden="true"
        >
          ♡
        </span>

        <div className="birthday-closing-inner">
          <p className="birthday-eyebrow">03 / one more thing</p>

          <h2>
            Some people
            <br />
            become
            <em> memories.</em>
          </h2>

          <div className="birthday-closing-rule">
            <span />
            <span>♡</span>
            <span />
          </div>

          <p>You became a part of mine.</p>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="birthday-footer">
        <span>Babli & Kajal</span>
        <span>♡</span>
        <span>always a story</span>
      </footer>
    </main>
  );
}
