import { PATHS } from "@/constants/path";
import { formatDate } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";

const BlogPopular = ({ blogsPopular }) => {
  return (
    <div className="widget">
      <h3 className="widget-title">Popular Posts</h3>
      <ul className="posts-list">
        {blogsPopular?.map((blog, index) => {
          const { id, image, name, slug, createdAt } = blog || {};
          const detailPath = PATHS.BLOG.INDEX + `/${slug}`;
          return (
            <li key={id || index}>
              <figure>
                <Link to={detailPath}>
                  <img src={image || ""} alt={name || ""} />
                </Link>
              </figure>
              <div>
                <span>{formatDate(createdAt)}</span>
                <h4>
                  <Link to={detailPath}>{name || ""}</Link>
                </h4>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BlogPopular;
