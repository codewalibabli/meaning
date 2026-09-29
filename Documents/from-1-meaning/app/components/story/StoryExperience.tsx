"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import "./story.css";

export default function StoryPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  async function playStory() {
    const video = videoRef.current;

    if (!video) return;

    try {
      video.muted = false;
      await video.play();
      setPlaying(true);
    } catch {
      video.controls = true;
    }
  }

  return (
    <main className="story-page">
      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <header className="story-topbar">
        <Link href="/vault" className="story-brand">
          MEMENTO
        </Link>

        <nav className="story-nav">
          <Link href="/vault">Home</Link>
          <Link href="/vault/memories">Memories</Link>
          <Link href="/vault/letters">Letters</Link>
          <Link href="/vault/capsules">Capsules</Link>
        </nav>
      </header>
      <section className="story-hero-image">
        <div className="story-hero-image__frame">
          <div className="story-hero-image__photo-wrap">
            <Image
              src="/story.png"
              alt="Babli and Kajal"
              fill
              priority
              sizes="(max-width: 900px) 94vw, 1050px"
              className="story-hero-image__photo"
            />
          </div>
        </div>
      </section>
      {/* =====================================================
          OPENING
      ===================================================== */}

      <section className="story-opening">
        <span className="story-heart story-heart--one">♡</span>
        <span className="story-heart story-heart--two">♡</span>

        <div className="story-opening-inner">
          <p className="story-kicker">our story</p>

          <h1>
            How we
            <br />
            <em>became us.</em>
          </h1>

          <div className="story-divider">
            <span />
            <span>♡</span>
            <span />
          </div>

          <p className="story-opening-text">
            It didn't start with knowing
            <br />
            how important it would become.
          </p>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 01 — HOW WE MET
      ===================================================== */}

      <section className="story-chapter story-chapter--first">
        <div className="story-chapter-number">
          <span>01</span>
          <p>
            how
            <br />
            we met
          </p>
        </div>

        <div className="story-chapter-content">
          <p className="story-kicker">chapter one</p>

          <h2>
            It all started
            <br />
            <em>so simply.</em>
          </h2>

          <p>
            I still think it's funny how some of the most important people in
            our lives can enter them without making any announcement.
          </p>

          <p>
            There wasn't some dramatic beginning. There wasn't a moment where we
            knew,
            <em> "this person is going to matter."</em>
          </p>

          <p>We just met.</p>

          <p>
            And then somehow, one conversation became another. One day became
            another. And slowly, without either of us really noticing, you
            became familiar.
          </p>

          <div className="story-small-note">
            <span>♡</span>
            <p>Some stories begin quietly.</p>
          </div>
        </div>
      </section>

      {/* =====================================================
          PHOTO
      ===================================================== */}

      <section className="story-photo-section">
        <div className="story-photo-frame">
          <Image
            src="/images/3.jpeg"
            alt=""
            fill
            sizes="(max-width: 800px) 100vw, 900px"
            className="story-photo"
          />
        </div>

        <p className="story-photo-caption">
          before we knew how much this friendship would become a part of us.
        </p>
      </section>

      {/* =====================================================
          CHAPTER 02 — BECOMING CLOSE
      ===================================================== */}

      <section className="story-chapter story-chapter--close">
        <div className="story-chapter-number">
          <span>02</span>
          <p>
            becoming
            <br />
            close
          </p>
        </div>

        <div className="story-chapter-content">
          <p className="story-kicker">somewhere between then and now</p>

          <h2>
            Then somehow,
            <br />
            <em>you became my person.</em>
          </h2>

          <p>I don't remember the exact day when we became close.</p>

          <p>Maybe there wasn't one.</p>

          <p>
            Maybe it happened through all those small conversations. The things
            we told each other. The jokes nobody else would understand. The
            plans that sometimes happened and sometimes didn't.
          </p>

          <p>
            You slowly became someone I could tell things to without thinking
            twice.
          </p>

          <p>
            And somewhere along the way, talking to you stopped feeling like
            talking to a friend.
          </p>

          <p className="story-emotional-line">
            It started feeling like talking to home.
          </p>
        </div>
      </section>

      {/* =====================================================
          TWO PHOTO MEMORY
      ===================================================== */}

      <section className="story-photo-pair">
        <div className="story-pair-photo story-pair-photo--one">
          <Image
            src="/images/13.jpeg"
            alt=""
            fill
            sizes="(max-width: 700px) 80vw, 420px"
          />
        </div>

        <div className="story-pair-photo story-pair-photo--two">
          <Image
            src="/images/22.jpeg"
            alt=""
            fill
            sizes="(max-width: 700px) 65vw, 330px"
          />
        </div>

        <span className="story-pair-heart">♡</span>
      </section>

      {/* =====================================================
          CHAPTER 03 — OTHER PEOPLE
      ===================================================== */}

      <section className="story-chapter story-chapter--people">
        <div className="story-chapter-number">
          <span>03</span>
          <p>
            then came
            <br />
            other people
          </p>
        </div>

        <div className="story-chapter-content">
          <p className="story-kicker">life happened</p>

          <h2>
            And then,
            <br />
            <em>life got bigger.</em>
          </h2>

          <p>Other people came into our lives.</p>

          <p>
            New friendships. New priorities. New conversations. New parts of
            life that the other person wasn't always a part of.
          </p>

          <p>And I think that's where things slowly started changing.</p>

          <p>Not because what we had suddenly became meaningless.</p>

          <p>Just because life has this strange way of moving people around.</p>

          <div className="story-side-thought">
            <span>♡</span>
            <p>
              Sometimes people don't leave.
              <br />
              Life just gets louder.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 04 — THINGS GOT TOUGH
      ===================================================== */}

      <section className="story-hard-section">
        <div className="story-hard-inner">
          <p className="story-kicker">chapter four</p>

          <h2>
            Then things
            <br />
            got <em>hard.</em>
          </h2>

          <div className="story-hard-copy">
            <p>There were things we didn't say.</p>

            <p>Things we misunderstood.</p>

            <p>
              Moments where one of us needed the other and somehow we weren't
              there in the way we used to be.
            </p>

            <p>And maybe we both changed.</p>

            <p>Maybe life changed us.</p>

            <p>
              Maybe some distance just happens even when nobody actually asks
              for it.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 05 — DISTANCE
      ===================================================== */}

      <section className="story-chapter story-chapter--distance">
        <div className="story-chapter-number">
          <span>05</span>
          <p>the distance</p>
        </div>

        <div className="story-chapter-content">
          <p className="story-kicker">the part I don't know how to explain</p>

          <h2>
            Somewhere along
            <br />
            the way,
            <br />
            <em>you forgot me.</em>
          </h2>

          <p>Or maybe it only felt that way to me.</p>

          <p>
            Maybe you were busy living your life. Maybe you had new people, new
            things, new reasons to look somewhere else.
          </p>

          <p>
            And I understand that people grow. I understand that priorities
            change.
          </p>

          <p>
            But understanding something doesn't automatically make it hurt less.
          </p>

          <p>
            There were moments when I wondered whether all those years meant as
            much to you as they meant to me.
          </p>

          <div className="story-distance-line">
            <span>“</span>
            <p>I missed the version of us that didn't have to try.</p>
          </div>
        </div>
      </section>

      {/* =====================================================
          EMPTY / QUIET SECTION
      ===================================================== */}

      <section className="story-quiet">
        <span className="story-quiet-heart">♡</span>

        <p className="story-kicker">but here's the strange part</p>

        <h2>
          Even after all of that,
          <br />
          <em>it was still you.</em>
        </h2>
      </section>

      {/* =====================================================
          CHAPTER 06 — STILL TOO MUCH
      ===================================================== */}

      <section className="story-chapter story-chapter--still">
        <div className="story-chapter-number">
          <span>06</span>
          <p>
            still
            <br />
            too much
          </p>
        </div>

        <div className="story-chapter-content">
          <p className="story-kicker">after everything</p>

          <h2>
            Because some people
            <br />
            don't become
            <br />
            <em>less important.</em>
          </h2>

          <p>Even when conversations become less frequent.</p>

          <p>Even when life becomes different.</p>

          <p>
            Even when you don't know what the other person is thinking anymore.
          </p>

          <p>
            There are some people whose place in your life doesn't disappear
            just because things became complicated.
          </p>

          <p>And somehow, you are still one of those people for me.</p>

          <p className="story-emotional-line">
            Maybe that's why I still remember so much.
          </p>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 07 — WHY THIS EXISTS
      ===================================================== */}

      <section className="story-reason">
        <div className="story-reason-inner">
          <p className="story-kicker">so I made this</p>

          <h2>
            Not because
            <br />
            everything was perfect.
          </h2>

          <p>I made this because it wasn't.</p>

          <p>
            Because our story has the good parts, the confusing parts, the funny
            parts, the painful parts and all the ordinary little moments in
            between.
          </p>

          <p>And I didn't want to remember only the easy version of us.</p>

          <p>
            I wanted to remember
            <em> all of it.</em>
          </p>
        </div>
      </section>

      {/* =====================================================
          FINAL LETTER-LIKE SECTION
      ===================================================== */}

      <section className="story-final-letter">
        <div className="story-final-letter-inner">
          <p className="story-kicker">if you ever read this</p>

          <h2>
            I hope you know
            <br />
            <em>you mattered.</em>
          </h2>

          <div className="story-final-copy">
            <p>You mattered when we first met.</p>

            <p>You mattered when we became close.</p>

            <p>You mattered when everything felt easy.</p>

            <p>You mattered when things became difficult.</p>

            <p>And you still matter now.</p>
          </div>

          <div className="story-final-signature">
            <span>with love,</span>

            <strong>Babli</strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL STATEMENT
      ===================================================== */}

      <section className="story-ending">
        <span className="story-ending-heart">♡</span>

        <p className="story-kicker">and maybe that's our story</p>

        <h2>
          We changed.
          <br />
          We grew.
          <br />
          We got lost.
          <br />
          <em>But we happened.</em>
        </h2>

        <div className="story-divider">
          <span />
          <span>♡</span>
          <span />
        </div>

        <p className="story-ending-small">
          And some things are worth remembering, even when they didn't stay
          exactly the same.
        </p>
      </section>

      {/* =====================================================
          VIDEO
      ===================================================== */}

      <section className="story-video-section">
        <div className="story-video-heading">
          <p className="story-kicker">07 / one last thing</p>

          <h2>
            Our memories
            <br />
            <em>don't need words.</em>
          </h2>

          <p>Just press play.</p>
        </div>

        <div className="story-video-wrapper">
          <video
            ref={videoRef}
            className="story-video"
            src="/videos/our-story.mp4"
            playsInline
            preload="metadata"
            controls={playing}
            onEnded={() => setPlaying(false)}
          />

          {!playing && (
            <button
              type="button"
              className="story-video-play"
              onClick={playStory}
            >
              <span className="story-video-play-icon">▶</span>

              <span>Play our story</span>

              <small>with sound</small>
            </button>
          )}

          <span className="story-video-heart story-video-heart--one">♡</span>

          <span className="story-video-heart story-video-heart--two">♡</span>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="story-footer">
        <span>Babli &amp; Kajal</span>

        <span>♡</span>

        <span>our story</span>
      </footer>
    </main>
  );
}
