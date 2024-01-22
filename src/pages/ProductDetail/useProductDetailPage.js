import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/productService";
import { reviewsService } from "@/services/reviewsService";
import { message } from "antd";
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

  const { id, name, description, shippingReturn } = productDetailData || {};

  const { data: productDetailReviews } = useQuery(
    () => id && reviewsService.getReviewsByProductId(id),
    [id]
  );

  const handleAddToCart = () => {
    const { value: color, reset: colorReset } = colorRef.current || {};
    const { value: quantity, reset: quantityReset } = quantityRef.current || {};

    if (!color) {
      message.error("Please select color!");
    }

    if (isNaN(quantity) && quantity < 1) {
      message.error("Quantity must be greater than 1!");
    }

    console.log("color", color);
    console.log("quantity", quantity);

    // Call API

    colorReset?.();
    quantityReset?.();
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

  const productDetailTabProps = {
    description,
    shippingReturn,
    reviews: productDetailReviews,
  };

  return {
    productName: name,
    productDetailTopProps,
    productDetailTabProps,
  };
};

export default useProductDetailPage;
