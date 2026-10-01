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
          Babli & Kajal
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
              src="/home.png"
              alt="Babli and Kajal"
              fill
              priority
              sizes="100vw"
              className="story-hero-image__photo"
            />

            <div className="story-hero-image__overlay" aria-hidden="true" />

            <div className="story-hero-image__title">
              <p>OUR STORY</p>
              <h1>
                Hamari
                <br />
                Kahani
              </h1>
            </div>
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
            Har kahani ki ek shuruwat hoti hai
            <br />
            <em>so simply.</em>
          </h2>

          <p>
            Har kahani ki ek shuruwat hoti hai woh toh bhala ho meri yaad ash jo
            mujhe yaad rehta warna samne wali ko toh bas yeh pta hai ki mai
            babli hu uski Best friend isse zyada usse ye yaad hai ki woh mere
            liye school time me bahut roi hai . I know very negative kind ki
            person hai meri bestie usse positive toh kuch yaad hi nhi rehta 🤷.
            Don't worry mai hu na 😉 har ek kissa bataungi no matter positive ho
            ya negative
          </p>

          <p>
            So mai Babli, 1st row ke chair wale section me last chair wale bench
            pe baithti thi jiske jinke piche bench wale baitha krte the , mai ek
            chote se chair pe baithti thi jiske pich ek bench 3 log baithte
            jinme se ek thi hamari kahani ki main character "Miss Kajal Gupta"
            ha sahi suna , wo madam piche baithkar mujhse ek din puchti hai ki
            tujhe (yaani mai babli) chair pe baithkar toh bahut maza aata hoga
            na jabki mai toh uske jagah par baithna chahti toh maine bhi baat
            aage badhayi or wahi bachkani baatein hamari waha se shuru hui,
            <em> Ek anokhi dosti ki shuruwaat</em>
          </p>

          <p>
            Fir coincidently ya fir bolo kismat ka Karishma ki hum 2nd standard
            me aas paas baithne lage or wahi bachkani baatein krte the or
            baatein itni ki har din tr. maarti thi par hame kya hamari baatein
            toh rukne se rahi . Ek din kajal ne mujhse pucha ki "babli tere papa
            kya krte hai Maine bola mujhe nhi pta par subah jaate hai or raat 10
            baje tak aate hai " toh kajal ne bola "mere papa bhi subah jaate hai
            or raat 10 baje tak ate kahi hamare papa saath me toh nhi 😂😂"
            bachpana waqai masum hota hai . Inhi masumiyat ke saath ye saal bhi
            bit gya
          </p>

          <div className="story-small-note">
            <span>💗</span>
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
            Turning
            <br />
            Point
          </p>
        </div>

        <div className="story-chapter-content">
          <p className="story-kicker">Third person enters in our Story</p>

          <h2>
            Yaha kahani ne ek alag
            <br />
            <em>mod liya or shayad kahi na kahi ye zaruri bhi tha!!!</em>
          </h2>

          <p>
            Ye baat hai 3rd std ki jab farheen ki entry hamari zindagi me yaani
            ki hamare school me hui . Jabki hamare bich bahut fasla tha jaisa ki
            har bar ki tarah mai or kajal 1st row me baithte or wahi farheen 3rd
            row me toh dosti ki toh gunaish hi nhi thi par kahi na kahi farheen
            ka intelligency mujhe usse dosti krne pe majboor kr rhi thi or kajal
            bhi usse dosti karna chahti thi magar fir bhi mai uske paas kabhi
            nhi gyi haalaki farheen ke school ke first din usse maine "hi" kaha
            tha bas fir ek or coincident hua wo kajal ke tution me aane lagi
            jaha kajal or farheen mile or unki dosti Hui yaani pehle kajal or
            farheen ki dosti Hui or kajal toh meri dost school se hi thi toh
            meri farheen se dosti karna laazmi tha qki kajal ki dost meri bhi
            toh dost hui na 😉 fir waha se hum 3no dost bane #triply haalaki ab
            bhi meri or kajal ki dost thodi gehri thi par ehsaas nahi kajal ko
            tha or naahi mujhe because kajal ko pta nhi hota tha wo exactly best
            friend maanti kisko hai ?{" "}
          </p>

          <p>
            Or mai us time itni samjhdaar nhi thi toh mere liye best friend kya
            hota hai uska concept bahut hi naya tha mujhe dosti ka bhi matlab
            nhi pata mere Ghar walo ne mujhe hamesha yahi bataya tha ki dost
            matlabi hote hai unka kaam tumse nikal jaata hai toh wo chale jaate
            hai isliye maine dosti me kabhi utna initiative daala hu nhi lekin
            kajal or farheen ke Milne ke baad mere liye dosti ke mayne dheere
            dheere badal rhe the par ye bhi tha mummy papa ki baat ko bhi mai
            hamesha yaad rakhti thi isliye maine kajal or farheen ko apni
            kamjori banne ka moka nhi diya maine dosti sirf unse utni hi rakhi
            jitni mujhe hurt na kar sake qki mai bahut hi practical bandi thi
            toh mujhe malum tha ki inlog mere feelings ke saath toh kabhi nhi
            khel skte ......{" "}
          </p>

          <p>
            Par aisa bilkul bhi nhi tha kahani ek alag mod pe chali gyi jaha
            mujhe aisa lagta tha ki humari triply hai par andar hi andar ek duo
            chal rhi thi meri or kajal kii....
          </p>

          <p>
            Par is baat ka mujhe bhi andaza nhi tha ki kajal mujhe manane lagi
            qki sach bolu toh mere liye naya experience tha isliye mai ye chiz
            expect hi nhi kr paa rhi thi...
          </p>

          <p>
            Waqt ke saath hum 3no ki dosti badh rhi thi saal bite or humari
            baatein, masti sab badhne lagi or isi ke bich kajal ke man me mere
            liye bhi kuch tha jo badh rha tha or aise hi haste khelte hum 6th
            std me aa gye jaga hum 3no ab ek ache dost ban gye ek aise dost jo
            woh school ke first day ek dusre ke liye jagah bachate hai taki
            poore saal saath baithe....
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
            Irritated, Cried,
            <br />
            But Realized
          </p>
        </div>

        <div className="story-chapter-content">
          <p className="story-kicker">Ups and down</p>

          <h2>
            Somewhere along the way,
            <br />
            <em>you became everything.</em>
          </h2>

          <p>
            Aise hi ek din class ke middle row ke first bench pe hum random baat
            kr rhe the jisme baato baato me kajal ne ye bola ki ek ladke ko like
            krti jiska naam yash tha or hum us time se the jaha kisi ladke ko
            like karna besharmi kehlati thi haalaki humara ye concept galat tha
            haalaki humne kajal ke saamne ye fun me hi liya or humne ek ek
            random naam le liya so that we can look cool but hum itni cool 😎
            the nhi because uske jaane ke baad farheen ne mujhse ye kaha ki
            babli mai usse baad nhi kar skti qki wo ek ladke ko like krti hai or
            kahi na kahi mujhe bhi uski baat valid lagne lagi or maine bhi
            decide kr liya ki mai bhi baat nhi karungi jaha shayad mai galat thi
            qki ek acha dost hone ke naate mujhe ye samjhana chahiye tha ki nhi
            farheen hume usse na baat krne ke bajaye usko samjhana chahiye par
            khair aakhir thi toh mere man me mere maa baap ki baatein jo mujhe
            ye keh rhe the jaha dost ache nhi waha Jana nhi bas wahi follow kr
            rhi thi jo bataya gya tha fir coincidently tr ne kajal ki place
            change krke usko 3rd row me bitha diya haalaki zyada dur nhi thi wo
            .
          </p>

          <p>
            Us din mai farheen khush huye the ki wo chali gyi ki baat karne na
            karne ki jhanjat hi nhi . Aisi hi humne usse baat Krna chod diya fir
            usne bhi school me kabhi manaya nhi ki babli mujhse baat kr bas uske
            aankh me har waqt jab bhi mai piche mudti toh aasu moti ki tarah
            chamkte the jinki qadar shayad tab mujhe thi hi nhi . Qki zindagi me
            mere liye kabhi koi roya hi nhi tha toh mujhe ye lag rha tha ki hum
            dono baat nhi kr rhe hai isliye wo hurt but mujhe realise hi nhi hua
            reason mai thi . Tab mujhe ye rona dhona ek emotional drama lagta
            tha aise hi time bit gya jab kajal ko ye chiz realize hui ki mujhe
            wo school me nhi mana payegi . Wo nanhi si jaan mere ghar aa gyi .
            Wo ghar ke bahar aakar khadi ho gyi tabhi mere papa ne use dekha or
            mujhe bataya . Pta nhi mai q chahti thi tab ki papa use na dekhe ki
            because wo shakhs papa hi the Jo bolte the ki zyada dosti me involve
            nhi hone ka barbaad kar deti hai ye dosti . Shayad isliye mai gusse
            me aa gyi or maine use apne ghar ki chaukat pe dekha or uske un
            aankho me ab bhi aasu moti jaise chamak rhe the 🥹
          </p>

          <p>
            Hairani ki baad ye dinwo mujhe kuch samjhana ya kuch batana nhi
            chahti thi wo bas meri taraf us aasu bhare aankho se dekhti thi mai
            kambakth zaahil gawar usko pyar se gale lagakar maaf krne ke bajaye
            usko apne ghar se jaane ko kaha maine bola mere ghar aakar tamasha
            mat kr mere papa kya soch rhe ho par mai harami ne ye nhi socha wo
            masum kya soch rhi hogi meri pyari si choti si dost ka Dil dukha
            diya maine 😭. Haalaki fir ye baat bit gyi humari dosti wapas ho gyi
            par ab ehsaas kuch naya tha
          </p>

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
            Ek
            <br />
            naya <em>ehsas..</em>
          </h2>

          <div className="story-hard-copy">
            <p>
              Kehte hai na jaha nok jhok or jhage wo hote hai waha pyar badta
              hai shayad us jhagde ke baad jo maine kajal se Kiya tha uske baad
              mai badal rhi thi bahut dheere magar ha kuch toh badal rha tha mai
              kajal ko dheere dheere apna best friend maan ne or use us nazar se
              dekhne lagi jo mai pehle nhi dekhti thi usme pehle mai usme sirf
              kamiya dhundti thi usme ki ye sirf roti rehti hai , gandi baate
              krti hai but ab mujhe usme sab acha lagne lag rha tha usko baatein
              uska lehza sab kuch acha lag rha tha . Ab maine usko dekhne ka
              nazariya badal diya tha uske andar sab acha lagne laga tha is
              sivaay ek chiz ke ki use chugli karne ki bahut gandi aadat thi or
              ye chahkar bhi apna nhi paayi thi q ki meri hi chugli kisi or se
              krti thi par khair bachi thi jaane Diya aakhir usne bhi toh mujhe
              maaf Kiya tha na ...
            </p>

            <p>
              Now this dosti become really 2 sided toh mujhe bhi chizo se fark
              padne laga ab mujhe bhi kajal ka meri taraf dhyan na deke farheen
              se baat Krna pasand nhi tha par mai bol nhi paati thi qki mujhe
              aisa lagta ye sab bolte huye mai bahut cringe lagungi jo ki mujhe
              nhi chahiye tha par man hi man mujhe bhi bura lagne laga tha mujhe
              kajal ki attention chahiye thi 🫠 or kajal aisi thi agar maine
              farheen se baat nhi kiya toh wo bhi nhi karegi mujhe toh aaj soch
              ke bhi ye sab itna ajib lagta hai ki koi dosti me itna loyal kaise
              ho skta hai 🥹but uski isi chiz ka maine faida uthaya or farheen
              se maine baat bande kardi or iski wajah sirf or sirf kajal thi qki
              ab mujhe uski attention achi lagne lagi thi mujhe ab uska us nazar
              se dekhna irritate nhi krta tha 😚 Mujhe sharam aa rhi hai aaj ye
              sab likhte waqt aisa lag rha mai usi daur me wapas chali gyi 😌 or
              shayad farheen se na baat Krne ka mujhe tab dukh bhi nhi ho rha
              tha qki tab mujhe kajal ke saath rehna pasand aa chuka tha fir 2
              mahine baad haalaki farheen se baat wapas hone lagi par ab meri or
              kajal ki dosti badal gyi thi now we have became best friends ❤️ ha
              yahi toh tha ab merq wajood . Ab kajal mere school Jane ki wajah
              ban chuki thi .........{" "}
            </p>

            <p>
              Mujhe uske saath itna acha lagne laga tha par fir kismat ne taang
              adaayi or hamari class change ho gyi 8 th std me and I was like
              stuck mujhe achanak se us din waisa hi laga tha jab first std me
              bunty dusri class me chali gyi thi qki kajal mere saath first std
              se thi or wo achanak dusri class me chali gyi or daastan toh dekho
              wo kajal jo mujhse baat krne ke liye roti thi Aaj usko koi emotion
              nhi tha pta hai q ? Qki wo emotions kahi or beh rhe the Aaj...
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
            src="/our.mp4"
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
