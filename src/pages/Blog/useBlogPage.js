import useDebounce from "@/hooks/useDebounce";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { blogService } from "@/services/blogService";
import scrollTop from "@/utils/scrollTop";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const BLOG_LIMITS = 6;

const useBlogPage = () => {
  const { search } = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const queryObject = queryString.parse(search);
  const [searchValue, setSearchValue] = useState(null);
  const searchValueDebounced = useDebounce(searchValue, 500);

  // API handling
  const {
    data: blogsData,
    execute: fetchBlogs,
    loading: blogsLoading,
  } = useMutation((query) =>
    blogService.getBlogs(query || `?limit=${BLOG_LIMITS}`)
  );

  const { data: categoriesData } = useQuery(blogService.getBlogCategories);
  const { data: tagsData } = useQuery(blogService.getBlogTags);

  const categories = categoriesData?.blogs || [];
  const tags = tagsData?.blogs || [];

  // Blog List
  const blogs = blogsData?.blogs || [];
  const blogsPopular = blogs.filter((blog) => blog.isPopular === true);

  // Blog Pagination
  const blogPagi = blogsData?.pagination || {};

  const apiLoading = useDebounce(blogsLoading, 500);

  // General Functions
  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: BLOG_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };

  const onSearchChange = (value) => {
    updateQueryString({
      ...queryObject,
      page: 1,
      search: value,
    });
  };

  // Props
  const blogListProps = {
    blogs,
    apiLoading,
  };

  const pagiProps = {
    limit: Number(blogPagi.limit) || Number(queryObject.limit) || 1,
    total: Number(blogPagi.total) || 0,
    page: Number(blogPagi.page) || 0,
    onPagiChange,
  };

  const onCateFilterChange = (cateId) => {
    const newCategoryQuery = [cateId];
    if (!cateId) {
      newCategoryQuery = [];
    }

    updateQueryString({
      ...queryObject,
      category: newCategoryQuery,
      page: 1,
    });
  };

  const categoriesProps = {
    categories,
    onCateFilterChange,
  };

  const blogPopularProps = {
    blogsPopular,
  };

  const blogTagsProps = {
    tags,
  };

  const blogSearchProps = {
    setSearchValue,
    onSearchChange,
    searchValueDebounced,
  };

  useEffect(() => {
    fetchBlogs(search);
    scrollTop();
  }, [search]);

  useEffect(() => {
    if (typeof searchValueDebounced === "string") {
      onSearchChange?.(searchValueDebounced);
    }
  }, [searchValueDebounced]);

  return {
    blogListProps,
    pagiProps,
    categoriesProps,
    blogPopularProps,
    blogTagsProps,
    blogSearchProps,
  };
};

export default useBlogPage;
