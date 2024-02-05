import { PATHS } from "@/constants/path";
import { formatDate } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ author, createdAt, image, description, slug, name }) => {
  const detailPath = PATHS.BLOG.INDEX + `/${slug}`;
  return (
    <div className="entry-item col-sm-6">
      <article className="entry entry-grid">
        <figure className="entry-media">
          <Link to={detailPath}>
            <img src={image || ""} alt={name || ""} />
          </Link>
        </figure>
        <div className="entry-body">
          <div className="entry-meta">
            <span>{formatDate(createdAt)}</span>
            <span className="meta-separator">|</span>
            {author && (
              <span className="entry-author">
                by <a href="#">{author || ""}</a>
              </span>
            )}
          </div>
          <h2 className="entry-title">
            <Link to={detailPath}>{name || ""}</Link>
          </h2>
          <div className="entry-content">
            <div
              style={{
                height: 80,
                display: "-webkit-inline-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                overflow: "hidden",
                wordBreak: "break-word",
              }}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            <Link to={detailPath} className="read-more">
              Read More
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogItem;
