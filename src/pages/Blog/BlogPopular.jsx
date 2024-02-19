import { PATHS } from "@/constants/path";
import { formatDate } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostListWrapper = styled.ul`
  li {
    display: flex;
    align-items: center;

    figure {
      float: unset;
    }

    h4 {
      a {
        height: 80;
        display: -webkit-inline-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
      }
    }
  }
`;

const BlogPopular = ({ blogsPopular }) => {
  return (
    <div className="widget">
      <h3 className="widget-title">Popular Posts</h3>
      <PostListWrapper className="posts-list">
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
      </PostListWrapper>
    </div>
  );
};

export default BlogPopular;
