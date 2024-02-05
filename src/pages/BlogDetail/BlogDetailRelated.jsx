import { PATHS } from "@/constants/path";
import { formatDate } from "@/utils/format";
import owlCarousels from "@/utils/owlCarousel";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const BlogDetailRelated = ({ relatedBlogsData }) => {
  useEffect(() => {
    owlCarousels();
  }, [relatedBlogsData]);

  return (
    <div className="related-posts">
      <h3 className="title">Related Posts</h3>
      {relatedBlogsData?.blogs?.length > 0 && (
        <div
          className="owl-carousel owl-simple"
          data-toggle="owl"
          data-owl-options='{
                                      "nav": false, 
                                      "dots": true,
                                      "margin": 20,
                                      "loop": false,
                                      "responsive": {
                                          "0": {
                                              "items":1
                                          },
                                          "480": {
                                              "items":2
                                          },
                                          "768": {
                                              "items":3
                                          }
                                      }
                                  }'
        >
          {relatedBlogsData.blogs.map((blog, index) => {
            const { id, name, slug, author, createdAt, image } = blog || {};
            const detailPath = PATHS.BLOG.INDEX + `/${slug}`;
            return (
              <article key={id || index} className="entry entry-grid">
                <figure className="entry-media">
                  <Link to={detailPath}>
                    <img src={image} alt={name} />
                  </Link>
                </figure>
                <div className="entry-body">
                  <div className="entry-meta">
                    {createdAt && <span>{formatDate(createdAt)}</span>}
                    <span className="meta-separator">|</span>
                    {author && (
                      <span className="entry-author">
                        by <a href="#">{author}</a>
                      </span>
                    )}
                  </div>
                  <h2 className="entry-title">
                    <Link to={detailPath}>{name || ""}</Link>
                  </h2>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogDetailRelated;
