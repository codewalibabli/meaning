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
              src="/vault.png"
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

            <p>
              Haa aaj mai kajal ke liye pehli baar roti thi waise hi jaise mai
              first std me bunty ke jaane pe royi par tab mai us class me bunty
              ke alawa kisi ko nhi jaanti thi or aaj 8 saal baad jab mai puri
              class ko jaanti or sab mere dost the fir bhi mujhe ajib lag rha
              tha qki maine kajal ko apni school Jane ki wajah bana liya tha mai
              us din uske liye pehli foot footkar royi or wo aasu sache the💗
              because I started feel for her and this feeling will going to
              destroy me in future but still I had feel for her that genuine
              wali feeling jo shayad jaa hi nhi skti thi mujhe aisa lagne laga
              bhai abhi toh humari kahani shuru hui hai agar maine kajal ko jane
              diya toh wo kisi or ki ho jaayegi
            </p>

            <p>
              Haa aaj mai kajal ke liye pehli baar roti thi waise hi jaise mai
              first std me bunty ke jaane pe royi par tab mai us class me bunty
              ke alawa kisi ko nhi jaanti thi or aaj 8 saal baad jab mai puri
              class ko jaanti or sab mere dost the fir bhi mujhe ajib lag rha
              tha qki maine kajal ko apni school Jane ki wajah bana liya tha mai
              us din uske liye pehli foot footkar royi or wo aasu sache the💗
              because I started feel for her and this feeling will going to
              destroy me in future but still I had feel for her that genuine
              wali feeling jo shayad jaa hi nhi skti thi mujhe aisa lagne laga
              bhai abhi toh humari kahani shuru hui hai agar maine kajal ko jane
              diya toh wo kisi or ki ho jaayegi
            </p>

            <p>
              or fir dheere dheere is Dil se bhi pyar pani ki tarah behne laga
              haalaki mai cringe type ki ladki bilkul nhi thi par uske saath
              rehkar mai badalne lag gyi thi or wo saari harqate achi lagne lagi
              thi mujhe jise mai cringe maanti thi .
            </p>
            <p>
              Mai pehle kisi ko zyada touch nhi krti thi par ab mai kajal bina
              kissi kiye bye nhi bolti thi . Jab bhi hum assembly se hokar alag
              class me jaati thi toh ek dusre ko puppy karte the , jab bhi hum
              tution se ghar jaate the hum tab bhi ek dusre ko puppy krte the
              par mujhe samjh aaya ki logo ko ye pasand farheen mujhe ispe taunt
              krne lagi thi or bunty ye log ko bhi acha nhi lagta tha toh mai
              kissi Krna thoda avoid krti thi public me because logo ko pasand
              nhi tha but kajal ko aisa lagta tha ki mujhe usse ghin aata tha
              jabki aisi koi baat thi hi nhi . Agar aisa kuch hota toh mai usko
              kabhi nhi krti fir isi hasti khelti kahani me ke twist aaya ....
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
          <p>A twist</p>
        </div>

        <div className="story-chapter-content">
          <p className="story-kicker">the part that changes the story</p>

          <h2>
            Twins
            <br />
            fall,
            <br />
            <em>for the same</em>
          </h2>

          <p>
            Wo twist tha meri behn ki entry kajal ko sabko hi special feel
            karane wale nature ki wajah se meri hi naiya dub gyi.. bunty roz
            bolti teri best friend hone ke bawajood wo mere paas baithne ke liye
            roti hai. Mai prastuti baat krti hai toh usko jalan hone lagata
            hai{" "}
          </p>

          <p>
            pehle toh yeh sab mujhe chidhane ke liye bata deti thi fir dheere
            dheere wo bhi maanne lagi usko or itna maanne lagi ki usko ye baat
            pasand hi nhi aayi ki hum saath me rhe din raat bas uske saath rehne
            ke liye daat ti .
          </p>

          <p>
            Wo chidne lagi thi hamare saath rehne se . Mere paas kajal se dur
            rehne ke alawa koi wajah hi nhi bachi or apni hi best friend se
            mujhe chup chup ke milna padta tha yahi silsila fir chalta hame
            hamari friendship private rakhni padi haalaki pata sabko tha par
            sunna kisi ko acha nhi lagta tha so we stop showing our friendship
            again and again
          </p>

          <p>
            Ek baar duniya ke liye toh mai terse lad bhi leti par samjh nhi aata
            tha tere liye apni hi behen se kaise ladu . Har chiz mujhe khud ke
            hi behn aw chupana padta tha hume aisa react Krna padta tha hum ko
            gf bf hai jiske baare me kisiko pta nhi chalna chahiye..
          </p>

          <p>
            There were moments when I wondered whether all those years meant as
            much to you as they meant to me.
          </p>
        </div>
      </section>

      {/* =====================================================
          EMPTY / QUIET SECTION
      ===================================================== */}

      <section className="story-quiet">
        <span className="story-quiet-heart">♡</span>

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
          <p className="story-kicker">A long distance friendship</p>

          <h2>
            Because some people
            <br />
            don't become
            <br />
            <em>less important.</em>
          </h2>

          <p className="story-kicker">
            Par waqt bitta chize sort hone lagi bunty bhi ne bolna kam kr diya
            par dil me shiqhwa tha uske fir aise hi rote gaate jhagade we came
            into 11th standard...
          </p>
          <p>
            Yes here our path get seperated. Kajal ab nashik Jane wali hi thi
            jab ye baat maine suni thi mera dil baith gya tha qki mai wo thi jab
            8th me kajal dusre class me chali gyi thi toh mere pair ke niche se
            zameen khisak gyi thi tu mujhe samjh hi nhi aa rha tha mai Karu kya
            kaise roku kajal ko ? Kaha jau ? Kisko batau? Samjh hi nhi aa rha
            hai tha kaise batau kajal ko ki mai bhi reh paungi kajal terse
            durrrr. Nhi hoga mujhse qki tu sirf meri aadat nhi ab mera sab ban
            chuki hai.{" "}
          </p>
          <p>
            Mai usko bata hi nhi paayi .....us waqt aisa tha agar kajal ko mai
            farheen ke dikh jaati ya baat krte dikh jaati toh kajal mujhse baat
            hi nhi krti thi qki wo expect krti thi ki mai usse many or us time
            mk mehta ke starting daya or 1 hafte me hi kajal nashik jaane wali
            thi... Mujhe is baat ka bahut malal tha ki wo mujhe chod ke chali
            jayegi isliye mai usse baat nhi Krna chahti thi mujhe uspe bahut
            gussa aa rha tha ki wo mujhe chod kaise skti q ki wo mujhe hamesha
            bolti thi babli mai tere bina 2 din bhi nhi reh paati or dusri taraf
            wo 2 saal ke liye mujhse dur Jaa rhi thiiii...{" "}
          </p>
          <p>
            Mujhe uspe bahut gussa aa rha tha isi bich Mai bich farheen mere is
            side or kajal dusre side baithi thi haalaki mujhe kajal se baat hi
            nhi karni thi qki i was stressed par usne mujhe manaya bhi nhi balki
            wo khud mujhse gussa hoke chali gyi dusre ke paas baith gyi or rone
            lagi qki mai farheen se baat kr rhi thi mai usko us din chup karana
            chahati thi par mere man me tha agar wo 1 hafte me yaha se chali
            jaayegi toh ye chiz toh honi hai agar tujhe fark pad rha hai toh ruk
            Jana . Par mai ye bol hi nhi paayi ab wo present ko leke gussa thi
            or mai 1 hafte baad aane wale future ke liye ..Par mujhe use rokna
            ek baar roke chikh ke chila ke usko bolna tha ki mai nhi reh paungi
            kajal tere bina par bolte hai jisko jaana hai wo chala hi jaata hai
            us din mujhe ye realise hua ki usne apni zindagi me mujhe sirf ek
            best friend hi mana tha or maine usko apna sab kuch....
          </p>

          <p>
            And somehow, this was not true. It was just way of thinking negative
          </p>

          <p className="story-emotional-line">And wo nhi rukiiiiii.....</p>
          <br></br>
          <p>
            Uske baad wo nashik chali gyi or mere Dil me ye malal reh gya maine
            soch liya tha ab mai usse baat hi nhi karungi agar itna dur rehna
            hai toh baat bhi nhi karna mujhse . Aisa hi hua maine usse saamne se
            kabhi baat nhi maine bahane banaye ye ki mujhe phone nhi ye wo, par
            asli wajah toh sirf mai jaanti thi ki agar wo dur rehkar mujhse baat
            karegi toh mai tadap jaungi usse Milne aise hi 6 mahine bit gye the
            hamari baatein bahut kam ya na ke barabar hoti thi phone par wo jab
            Umbergaon aati thi toh hum milte the par gile shiqhwe mere andar ab
            bhi the ..
          </p>
          <p>
            Fir time beete gya or wo aati ab dur rehti thi wo isliye jab bhi
            Umbergaon aati thi toh mere man me ek khushi hamesha hoti thi par
            gussa bhi par time ke saath mera gussa shant isliye qki hum dur
            rehte the or 2 se 3 din ke liye hi aati thi or agar mai usse fir bhi
            gussa rahungi toh hum khulke baat hi nhi kar paayenge fir time ke
            saath maine bhi maaf kr diya or wapas thode karib ho gye . Shayad
            dur the isliye kuch zyada hi ho gye par wo jab bhi nashik se aati
            mai bokle jaati thi bas yahi hota tha ki saara Kaam chodke bas usse
            milna hai or wo aati thi toh aisa muljhaye huye plant ☘️ par kisine
            paani daalke usko wapas khila diya ho .. har baar aakar wo memories
            de jaati wo or ab mai usse chat pe bhi baat krne lagi or kuch zyada
            hi mere paas phone nhi hota tha toh mai us sirf usse baat karne ke
            liye dukan jaati thi mummy ka phone use or bas uska ek reply hi
            mujhe khush kar deta ek baar toh aisa hua tha humne poori raat baat
            ki thi haalaki bahut baar aisa bhi hota tha mujhe padhna hota tha
            par mai use nhi batati because agar mai use batati toh mujhe ye pata
            wo bol degi babli baad me baat krte hai padh shayad isliye mai usko
            batati hi.
          </p>

          <p>
            Fir aise hi uske yaad me , usse raat raat bhar chat pe baat krke ,
            uske aane pe usse milkar har chiz bhul jaana , yahi sab me dusra
            saal bhi bit gyi ab wo wapas kuch waqt ke liye Ghar aa chuki , jiski
            wajah se mai fir khush thi q ab wo 3 se 4 mahine ke liye kahi nhi
            Jaa rhi wo mere paas rehne wali kuch mahino 🫣ye sab soch kr hi ami
            khush ho jaati thi
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
            Something
            <br />
            was unexpected!
          </h2>

          <p>I made this because it wasn't.</p>

          <p>
            For aise hi ek din uska result aaya marks jisne kahani puri palat di
            . Qki maine ab sapne me bhi imagine nhi Kia tab wo 2 3 mahine 5 saal
            hone wale 🥹 the . Mujhe itni khushi hui ki wo 5 saal ab mere saath
            hogi . Ab mujhe aisa lag rha tha ki ab ye 5 saal humari doori ke
            faasle mita denge or humare sare gile shiqhwe ab puri tarah khatam
            ho jayenge waise bhi khatam toh ho chuke the but kahi na kahi thoda
            malal mujhe tab bhi tha par kajal ke idhar rehne ki baat sunkar wo
            bhi mit gya .
          </p>

          <p>
            Waise hi hum roz milte the baatein krte sab ek sapne jaisa lagta tha
            mujhe..
          </p>

          <p>
            Mere man me ye tha ab hum school time ki tarah roz mil skte hai
            saath baith skte hai , kha sakte hai , baate share kar skte hai ,
            sab kuch par aisa nhi tha ...
            <em> it was just my assumption.</em>
          </p>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 02 — BECOMING CLOSE
      ===================================================== */}

      <section className="story-chapter story-chapter--close">
        <div className="story-chapter-number">
          <span>02</span>
          <p>
            Sudden
            <br />
            Change
          </p>
        </div>

        <div className="story-chapter-content">
          <p className="story-kicker">
            Dont know who enters in our Story but it deeply affect the story
          </p>

          <h2>
            Yaha kahani ne ek alag
            <br />
            <em>mod liya or shayad kahi na kahi ye zaruri bhi tha!!!</em>
          </h2>

          <p>
            Fir vacationa khatam ho gye or kajal college jaane lagi or wo roz up
            down krne lagi toh wo roz up down krne ki wajah se thak jaati thi or
            ab wo mujhse itna nhi mil paati thi jaise jaise time bita uske ek
            badlaav aana chalu hua wo exactly kya wo toh mai nhi bata skti wo
            ghar hi rehti thi . Dheere dheere usne milna kam kr diya wo college
            se aake thak jaati thi isliye so jaati or uth ke kha pike apne
            college ka kaam karke fir so jaati toh uski life aise hi busy ho
            chuki thi. Jo ki mujhe samjhna chahiye tha par mai samajh nhi paa
            rhi thi.
          </p>

          <p>
            Mujhe aisa lagne laga ab kajal mujhse utna pyaar nhi karti . Qki wo
            shaqa kabhi ye bolta tha ki mere bina ek din bhi usko gawara nhi
            nashik jaane ki baat toh mai samjh skti thi par yaha rehkar bhi na
            milna aisa kabhi hua nhi tha. Lockdown me hum nhi mil paate tho wo
            mere ghar aa jaya krti thi toh mujhe aisa tha ab kya 10 min toh
            nikal hi sakta hai na insan . Par hogi uske taraf ki ek kahani par
            mujhe toh bas ye kehti thi mujhe anxiety hoti hai bahar nikalne me .
            Or sach bolu toh mujhe is word ka matlab aaj bhi nhi pata mai ne
            google pe bhi search Kiya par pta nhi q kajal ka diya hua reason
            mujhe waqai bahana laga . Fir bhi mai try krti thi usko ye sab se
            baahar nikalu . Par wo khud nhi nikalna chahti thi fir dheere aise
            hi bitta gya uske college ka first year and wo pura bahut baar aisa
            hua hai ki mai farheen bunty hi ghumne bahar gedi maarna jaate or wo
            90% aayi hi nhi mujhe aisa hota tha kya matlab uske idhar rehne ka
            kya jab wo mere sath itna waqt hi nhi bitati . Ab yahi sab chalne
            laga dimage me q aisi ho gyi hai
          </p>

          <p>
            Mere man me gile shikhwe aane lage maine kajal se bahut baar is
            silsile me baat ki par aisa laga usko jawab dene ka man hi nhi hai
            toh maine puchna chod diya lekin fir bhi takleef hoti thi or tab toh
            or jab wo ek tarf merse milti bhi nhi thi or na hi hum chat pe baat
            krte the or wahi mujhe pata chalta tha wo apne college friends ke
            saaath ghumne jaa rhi hai toh bahut hurt krta tha mujhe , mujhe aisa
            tha tujhe gandhiwadi me nikalne me dikkat hoti hai , anxiety hoti
            hai toh unke saath bhi q rehti hai unke saath bhi q ghumne jaati h?
          </p>

          <p>
            Par ye mere man ki befizul baat thi jo aaye din chalti hu rehti thi
            mere dimag me chalti thi
          </p>

          <p>
            Mai kajal se har baat pe ladne lag jaati thi ki tu nhi jaayegi unke
            saath movie dekhne , nhi jayegi unke saath khane , nhi karegi unke
            saath bunk kuch bhi nhi karegi ... Pyar ke naam pe poori toxic ho
            chuki thi mai bichari meri dost ko pareshan kr rhi thi par kya hi
            karti nhi hota tha mujhse control... Dimag kharab ho jaata tha mera
            but when I realised ki kajal mujhse jhagde ke dar se chize chupane
            lagi hai or ab uske aankho me wo pyar ke badle dar aa gya toh mujhe
            takleef huyi qki mujhe chahiye tha kajal mujhse pyar kare naaki
            mujhse pareshan ho jaayeg ya fir dare . Or yahi sab chizo ke bich ek
            aisa hadsaa hua jisne shayad mujhe hila diya ..
          </p>
          <p>
            Kajal ka accident haalaki uske baare me mai idhar zyada lekin wo din
            manzar I can never forget...😭 Usme mujhe kahi na kahi badal diya us
            chiz ne mujhe bataya ki bhale hi mere man hazar gile shiqwe hai usko
            lekar magar wo shiqwe mere liye usse badhkar nhi....us accident ke
            baad maine chuppi saad li mujhe aisa realise hua mai galat thi .....
            Bahut saari chiz or tabse aaj tak maine har waqt apne aap ko control
            Kiya ki mai kajal ko kuch nhi bolungi qki mere liye sabse badhkar
            kajal hai ye narazgi nhi ... Nhi bhale hi wo mujhe maane ya na maane
            par mera pyar uske liye sacha tha hai or rahega ...
          </p>
          <p>
            Ab ye sach hai mai kajal se koi accpectation nhi rakhti hu qki mujhe
            wo pta hai ki wo meri accpectations kabhi puri nhi kr payegi qki
            meri acceptation wahi hai ... Par khair{" "}
          </p>
          <p>
            Maine bina acceptation ke jina sikh liya or kajal bhi apni zindagi
            me khush hai ya shayad nhi hai and I know that ab wo bhi mere jaise
            feelings daba leti hai or mai bhi usse puch nhi paati qki agar maine
            pucha toh mujhe bhi sab bolna padega or mai uske saamne wapas khulna
            nhi chahti mai ab nhi chahti ki wo wapas pehle jaisi ho qki ab sab
            badal chuka hai or ab mai chahti hu wo bhi aage badhe... Or wo badh
            bhi rahi .
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
            <p>
              Mai bhi ab uske samne rona nhi chahti . Mai bas ye chahti ki usko
              wo har khushi mile jo shayad usne kabhi meri wajah se thukarayi
              hai 🥹. Mai bas ye chahti hu ki wo un sab log ko leke chale jinko
              shayad unhone meri wajah se choda tha . Mai shayad aage uske saath
              nhi chal paungi par wada hai mera mai hamesha uske pich khadi
              rahungi .... Use jab bhi meri zarurat padegi mai sab chod kar
              aaunga or ye mai future ki baat kr rhi hu kajal jaha bhi rahegi
              mai saaye ki tarah uske piche rahungi bas uske saamne nhi aaungi .
              Mujhe pta nhi mai kya bole jaa rhi hu par jab kajal ki baat krti
              hu toh man karta hai boli hi rahu itna bolu ,itna bolu ki meri
              zuban thak jaaye
            </p>
          </div>

          <div className="story-distance-line">
            <span>“</span>
            <p>
              Pta nhi kya hai .....wo par aisa lagta bas chale toh mar bhi jau
              kabhi kabhi itna pyar aaya hai na uske upar par samjh hi nhi aata
              usko bayana kaise karu . Kaise samjhau usko ki kaise jatau mai ye
              pyar jo shayad ye likhte waqt bhi aa rha .
            </p>
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

        <p className="story-kicker">
          Ye thi meri kahani ... shayad utne ache se bayan na kar paayi
        </p>

        <h2>
          But Still
          <br />
          This story
          <br />
          I will
          <br />
          <em>Never forget..... Janaa....</em>
        </h2>

        <div className="story-divider">
          <span />
          <span>♡</span>
          <span />
        </div>
      </section>

      {/* =====================================================
          VIDEO
      ===================================================== */}

      <section className="story-video-section">
        <div className="story-video-heading">
          <p className="story-kicker">07 / one last thing</p>

          <h2>
            Hamar Adhuri Kahani.....
            <br />
            <em> because kahani abhi khatm nhi hui hai meri jaan....</em>
          </h2>

          <p>Just press play.</p>
        </div>

        <div className="story-video-wrapper">
          <video
            ref={videoRef}
            className="story-video"
            src="/kahani.mp4"
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

        <span>
          Hamar Adhuri Kahani..... because kahani abhi khatm nhi hui hai meri
          jaan....
        </span>
      </footer>
    </main>
  );
}
