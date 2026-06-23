import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { galleryConfig, workDetailConfig } from "../config";

export default function WorkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const work = galleryConfig.works.find(
    (w) => w.id.toLowerCase() === (id || "").toLowerCase()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!work) {
    return (
      <div className="notfound">
        <h1>{workDetailConfig.notFoundTitle}</h1>
        <Link className="work-detail__back interactive" to="/">
          {workDetailConfig.notFoundLink}
        </Link>
      </div>
    );
  }

  const paragraphs = work.article.split("\n\n");

  return (
    <article className="work-detail">
      <div className="work-detail__bar">
        <button
          className="work-detail__back interactive"
          onClick={() => navigate(-1)}
        >
          {workDetailConfig.backLabel}
        </button>
        <span className="work-detail__roomsuffix">
          {work.id} // {workDetailConfig.metaRoomSuffix}
        </span>
      </div>

      <div className="work-detail__hero">
        <img className="work-detail__img" src={work.image} alt={work.title} />
      </div>

      <div className="work-detail__body">
        <p className="work-detail__status">
          {work.status} · {work.metrics}
        </p>
        <h1 className="work-detail__title">{work.title}</h1>

        <div className="work-detail__metrow">
          <div>
            <div className="work-detail__met-label">
              {workDetailConfig.artistLabel}
            </div>
            <div className="work-detail__met-value">{work.artist}</div>
          </div>
          <div>
            <div className="work-detail__met-label">
              {workDetailConfig.locationLabel}
            </div>
            <div className="work-detail__met-value">{work.location}</div>
          </div>
          <div>
            <div className="work-detail__met-label">
              {workDetailConfig.mediumLabel}
            </div>
            <div className="work-detail__met-value">{work.medium}</div>
          </div>
        </div>

        <div className="work-detail__article">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="work-detail__footer">
        <Link className="work-detail__back interactive" to="/#gallery">
          {workDetailConfig.backToGalleryLabel}
        </Link>
        <span className="work-detail__footnote">
          {workDetailConfig.footerNote}
        </span>
      </div>
    </article>
  );
}
