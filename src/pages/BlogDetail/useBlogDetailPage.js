import useQuery from "@/hooks/useQuery";
import { blogService } from "@/services/blogService";
import { useParams } from "react-router-dom";

const useBlogDetailPage = () => {
  const { blogSlug } = useParams();
  const { data: blogDetailData } = useQuery(
    () => blogService.getBlogBySlug(blogSlug),
    [blogSlug]
  );
  const { data: blogTagsData } = useQuery(blogService.getBlogTags);
  const { data: relatedBlogsData } = useQuery(
    () =>
      blogDetailData?.id &&
      blogService.getBlogs(`?category=${blogDetailData?.category?.id}`),
    [blogDetailData?.id]
  );

  const name = blogDetailData?.name;

  // Filter tags
  const filterTag = blogTagsData?.blogs?.filter((tag) =>
    blogDetailData?.tags?.includes(tag.id)
  );

  // BlogDetailEntry Props
  const blogDetailEntryProps = {
    ...blogDetailData,
    filterTag,
  };

  // Related Blog Props
  const relatedBlogProps = { relatedBlogsData };

  return {
    name,
    blogDetailEntryProps,
    relatedBlogProps,
  };
};

export default useBlogDetailPage;
