import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/productService";
import { reviewsService } from "@/services/reviewsService";
import { handleAddWishList } from "@/store/reducers/authReducer";
import { handleAddCart } from "@/store/reducers/cartReducer";
import { message } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const useProductDetailPage = () => {
  // Init hooks
  const { productSlug } = useParams();
  const colorRef = useRef();
  const quantityRef = useRef();
  const dispatch = useDispatch();

  // Fetch data
  const { data: productDetailData } = useQuery(
    () => productService.getProductBySlug(productSlug),
    [productSlug]
  );

  const { id, name, description, shippingReturn, price, discount } =
    productDetailData || {};

  const { data: productDetailReviews } = useQuery(
    () => id && reviewsService.getReviewsByProductId(id),
    [id]
  );

  const handleAddToCart = async () => {
    const { value: color, reset: colorReset } = colorRef.current || {};
    const { value: quantity, reset: quantityReset } = quantityRef.current || {};

    if (!color) {
      message.error("Please select color!");
      return;
    }

    if (isNaN(quantity) && quantity < 1) {
      message.error("Quantity must be greater than 1!");
      return;
    }

    const addPayload = {
      addedId: id,
      addedColor: color,
      addedQuantity: quantity,
      addedPrice: price - discount,
    };

    // Call API
    try {
      const res = await dispatch(handleAddCart(addPayload)).unwrap();
      if (res) {
        colorReset?.();
        quantityReset?.();
      }
    } catch (error) {
      console.log("🚀error---->", error);
    }
  };

  const handleAddToWishList = () => {
    dispatch(handleAddWishList(id));
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
