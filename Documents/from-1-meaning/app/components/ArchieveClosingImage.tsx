import Image from "next/image";

export default function ArchiveClosingImage() {
  return (
    <section className="archive-closing-image">
      <div className="archive-closing-image__frame">
        <div className="archive-closing-image__inner">
          <Image
            src="/images/16.jpeg"
            alt="Babli and Kajal"
            width={1920}
            height={1080}
            sizes="(max-width: 700px) 92vw, 1000px"
            className="archive-closing-image__photo"
          />
        </div>

        <span className="archive-closing-image__heart" aria-hidden="true">
          ♡
        </span>
      </div>

      <p className="archive-closing-image__caption">kept between us</p>
    </section>
  );
}
