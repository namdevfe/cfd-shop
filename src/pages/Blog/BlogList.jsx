import BlogItem from "@/components/BlogItem";
import { Skeleton } from "antd";
import React from "react";
import styled from "styled-components";

const BlogSkeletonStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 5%;
`;

const BlogList = ({ blogs, apiLoading }) => {
  return (
    <div className="entry-container max-col-2" data-layout="fitRows">
      {!apiLoading &&
        blogs?.length > 0 &&
        blogs.map((blog, index) => {
          return <BlogItem key={blog?.id || index} {...blog} />;
        })}

      {apiLoading &&
        new Array(6).fill("").map((_, index) => {
          return (
            <BlogSkeletonStyle
              className="entry-item col-sm-6"
              key={new Date().getTime() + index}
            >
              <Skeleton.Image active style={{ width: "100%", height: 275 }} />
              <Skeleton.Input active />
              <Skeleton.Input block active />
            </BlogSkeletonStyle>
          );
        })}
    </div>
  );
};

export default BlogList;
