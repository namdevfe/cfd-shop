import { SHIPPING_OPTIONS } from "@/constants/general";
import {
  handleRemoveFromCart,
  handleUpdateCart,
} from "@/store/reducers/cartReducer";
import { sumArrayNumber } from "@/utils/calculate";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCartPage = () => {
  const dispatch = useDispatch();
  const quantityRef = useRef([]);
  const updatedQuantityTimeoutRef = useRef();
  const { cartInfo, cartLoading } = useSelector((state) => state.cart);

  const {
    product,
    quantity,
    totalProduct,
    variant,
    shipping,
    total,
    subTotal,
    discount,
  } = cartInfo || {};

  // Handle remove product
  const handleRemoveProduct = (removedIndex) => {
    if (cartLoading || removedIndex < 0) return;
    dispatch(handleRemoveFromCart({ removedIndex }));
  };

  // Handle update cart
  const handleUpdateQuantity = (updatedQuantity, updatedIndex) => {
    // Handle payload before calling api
    const getPayload = () => {
      const newQuantity = quantity.map((item, index) =>
        index === updatedIndex ? updatedQuantity : item
      );
      const newTotalProduct = totalProduct.map((item, index) =>
        index === updatedIndex
          ? product[updatedIndex]?.price * updatedQuantity
          : item
      );
      const newSubTotal = sumArrayNumber(newTotalProduct);
      const newTotal = newSubTotal - (discount ?? 0) + (shipping?.price ?? 0);

      return {
        ...cartInfo,
        product: product.map((item) => item.id),
        quantity: newQuantity,
        totalProduct: newTotalProduct,
        subTotal: newSubTotal,
        total: newTotal,
      };
    };

    if (updatedQuantityTimeoutRef.current) {
      clearTimeout(updatedQuantityTimeoutRef.current);
    }

    updatedQuantityTimeoutRef.current = setTimeout(async () => {
      if (
        !cartLoading &&
        updatedQuantity !== "" &&
        quantity[updatedIndex] !== updatedQuantity
      ) {
        try {
          const res = await dispatch(handleUpdateCart(getPayload())).unwrap();
        } catch (error) {
          quantityRef.current[updatedIndex]?.reset?.();
        }
      }
    }, 300);
  };

  // Handle Update Shipping
  const handleUpdateShipping = (selectedTypeShipping) => {
    const selectedShipping = SHIPPING_OPTIONS.find(
      (option) => option.value === selectedTypeShipping
    );

    if (selectedShipping) {
      const updatePayload = {
        ...cartInfo,
        product: product.map((item) => item.id),
        shipping: {
          typeShip: selectedShipping.value,
          price: selectedShipping.price,
        },
        total: total - (shipping?.price || 0) + selectedShipping.price,
      };

      dispatch(handleUpdateCart(updatePayload));
    }
  };

  // CartTable Props
  const cartTableProps = {
    products: product?.map((item, index) => {
      return {
        ...item,
        quantity: quantity?.[index],
        variant: variant?.[index],
        totalProduct: totalProduct?.[index],
      };
    }),
    quantityRef,
    handleRemoveProduct,
    handleUpdateQuantity,
  };

  // CartSummary Props
  const cartSummaryProps = {
    total,
    subTotal,
    typeShip: shipping?.typeShip,
    handleUpdateShipping,
  };

  return {
    cartTableProps,
    cartSummaryProps,
  };
};

export default useCartPage;
