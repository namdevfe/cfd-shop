import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/productService";
import { reviewsService } from "@/services/reviewsService";
import { useRef } from "react";
import { useParams } from "react-router-dom";

const useProductDetailPage = () => {
  // Init hooks
  const { productSlug } = useParams();
  const colorRef = useRef();
  const quantityRef = useRef();

  // Fetch data
  const { data: productDetailData } = useQuery(
    () => productService.getProductBySlug(productSlug),
    [productSlug]
  );

  const { id, name } = productDetailData || {};

  const { data: productDetailReviews } = useQuery(
    () => id && reviewsService.getReviewsByProductId(id),
    [id]
  );

  const handleAddToCart = () => {
    console.log("handleAddToCard");
  };

  const handleAddToWishList = () => {
    console.log("handleAddToWishList");
  };

  // Props
  const productDetailTopProps = {
    ...productDetailData,
    reviews: productDetailReviews,
    colorRef,
    quantityRef,
    handleAddToCart,
    handleAddToWishList,
  };

  const productDetailTabProps = {};

  return {
    productName: name,
    productDetailTopProps,
    productDetailTabProps,
  };
};

export default useProductDetailPage;
