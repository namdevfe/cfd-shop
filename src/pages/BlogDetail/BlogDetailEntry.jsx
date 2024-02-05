import ShareLink from "@/components/ShareLink";
import { formatDate } from "@/utils/format";
import React from "react";
import styled from "styled-components";

const ShareLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BlogDetailEntry = ({
  image,
  createdAt,
  author,
  description,
  name,
  filterTag,
}) => {
  const pathUrl = window.location.href;
  return (
    <article className="entry single-entry">
      <div className="entry-body">
        <figure className="entry-media">
          <img src={image} alt={name} />
        </figure>
        {!!name && <h1 className="entry-title entry-title-big">{name}</h1>}
        <div className="entry-meta">
          {!!createdAt && <span>{formatDate(createdAt)}</span>}
          <span className="meta-separator">|</span>
          {!!author && (
            <span className="entry-author">
              by <a href="#">{author}</a>
            </span>
          )}
        </div>
        <div
          className="entry-content editor-content"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <div className="entry-footer row no-gutters flex-column flex-md-row">
          <div className="col-md">
            <div className="entry-tags">
              <span>Tags:</span>
              {filterTag?.map((tag, index) => {
                return (
                  <a key={tag.id || index} href="#">
                    {tag.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="col-md-auto mt-2 mt-md-0">
            <ShareLinkWrapper className="social-icons social-icons-color">
              <span className="social-label">Share this post:</span>
              <ShareLink path={pathUrl} title={name}>
                <i className="icon-facebook-f" />
              </ShareLink>
              <ShareLink path={pathUrl} type="twitter" title={name}>
                <i className="icon-twitter" />
              </ShareLink>
              <ShareLink path={pathUrl} type="instagram" title={name}>
                <i className="icon-instagram" />
              </ShareLink>
              <ShareLink path={pathUrl} type="pinterest" title={name}>
                <i className="icon-pinterest" />
              </ShareLink>
            </ShareLinkWrapper>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogDetailEntry;
