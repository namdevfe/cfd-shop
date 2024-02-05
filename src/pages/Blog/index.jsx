import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constants/path";
import React from "react";
import { Link } from "react-router-dom";
import BlogList from "./BlogList";
import Pagination from "@/components/Pagination";
import useBlogPage from "./useBlogPage";
import BlogCategories from "./BlogCategories";
import BlogPopular from "./BlogPopular";
import BlogBanner from "./BlogBanner";
import Tag from "@/components/Tag";
import BlogSearch from "./BlogSearch";

const Blog = () => {
  const {
    blogListProps,
    pagiProps,
    categoriesProps,
    blogPopularProps,
    blogTagsProps,
    blogSearchProps,
  } = useBlogPage();

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Blog</h1>
        </div>
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Blog</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <BlogList {...blogListProps} />
              <Pagination {...pagiProps} />
            </div>
            <aside className="col-lg-3">
              <div className="sidebar">
                <BlogSearch {...blogSearchProps} />
                <BlogCategories {...categoriesProps} />
                <BlogPopular {...blogPopularProps} />
                <BlogBanner />
                <Tag {...blogTagsProps} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blog;
