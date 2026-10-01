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
            <span>💗</span>
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
            <p>I wish you will get everything you want in your life.</p>
            <p>
              May you get really succeed in you life dear an I am saying it with
              my whole heart bro... Yes bro you think that I don't respect your
              career it was never like that bas i thought aisa mujhe lagta tha u
              never wanted to be a dentist it was just your father dream !
              That's it !
            </p>
            <p>
              But jaise jaise time bita i came to know that you started having
              an interested in your career and it's a very good thing dear .
            </p>
            <p>
              Ek bande ko safalta haasil karna ke liye pehle ye jaanna hota hai
              ki q wo haasil karna chahta agar reason tu sirf ye bolegi ki tere
              mummy papa chahte hai isliye toh wo tujhe aage badhne ke liye
              motivate thodi karega meri jaan. Infact you should have complete
              interest in it . Ek passion hona chahiye wo chiz paane ka
            </p>
            <p>
              Bas mujhe ye realise nhi hua like tu us chiz ko hasil karna chahti
              hai because mai bachpan se tere saath thoda or humne hazar baar
              career pe baat ki thi toh tere muh se maine kabhi dentist ya dr
              nhi suna tha bas isliye mujhe ye baat khatki kya tu waqai me banna
              chahti hai qki pehle mai khud nhi chahti thi ki tu bane qki mujhe
              aisa laga hi nhi u literally want to be a dentist but...
            </p>
            <p>
              after seeing you in a lab coat and a complete interest in your
              work haalaki padhai tujhe tough lag rhi hai wo toh har kisiko
              lagti hai but you are trying your best 💪 and I know you will be
              going to be the best dentist in your whole khandan dear 💫 so bro
              do hardwork and more hard work because hard work pays off darling
              because ab toh mai bhi dil se chahti hu jaldi se doctor/dentist
              banja qki tu lab coat me badi pyari lagti hai or agar stetescope
              bhi pehen le toh haaaye 🤌.
            </p>
            <p className="birthday-letter-emphasis">
              Bro no matter mai tere paas hu ya na hou but I will always support
              you from far or even closer .Qki Kya pata tu mujhse baat Krna chod
              de kya pata tu nai best friend bana le par mai tujhe tab bhi
              support karungi I will promise you because tune mujhe wo diya hai
              jo shayad utna kisine nhi diya hai pta hai kya "khushi" chand bhar
              ki hi sahi but you somewhere made genuinely happy and uske badle
              Mai yeh chahungi tujhe usko ×1000 khushi mile . Tujhe Jo chahiye
              wo mile meri jaan .
            </p>
            <p>
              And you ever feel low toh just yaha aakar letter likh dena bolte
              hai man ki baat bol Dene se ya likh Dene se halki ho jaati qki hum
              shayad ab utna emotionally attached nhi rhe isliye I have made
              this for you ki tu woh har chiz share kare jo shayad ab tu mujhse
              kar hi nhi paati ab tu bhi chize chupane lagi . Ab tu bhi bolne se
              pehle sochti hai . Ab tu mere saamne expressive nhi rehti I don't
              know q . And shayad mujhe pta bhi ho par mai tujhse jaana hai if
              you were not comfortable at telling me things you can just simply
              write down the things qki ise tere or mere siva koi or nahi padh
              skta because it's our space dear 💫
            </p>
            <p>
              there will no one in between 💗 atleast in this digital vault..
              once again happy wala birthday and stay blessed 💕.
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
