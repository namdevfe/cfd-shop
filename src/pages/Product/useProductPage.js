import useMutation from "@/hooks/useMutation";
import { productService } from "@/services/productService";
import queryString from "query-string";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const PRODUCT_LIMITS = 9;

const useProductPage = () => {
  // Get queryString from url
  const { search } = useLocation();

  // Parse queryString to object using query-string library
  const queryObject = queryString.parse(search);

  // Change content queryString
  const [_, setSearchParams] = useSearchParams();

  // API Handling
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    execute: fetchProducts,
  } = useMutation((query) =>
    productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`)
  );

  // ------------------- Data --------------------------
  // Product data
  const products = productsData?.products || [];
  const productsPagi = productsData?.pagination || {};

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const productListProps = {
    isLoading: productsLoading,
    isError: !!productsError,
    products,
  };

  // // Handle Pagination
  // const updateQueryString = (queryObject) => {
  //   const newQueryString = queryString.stringify({
  //     ...queryObject,
  //     limit: PRODUCT_LIMITS
  //   })
  //   return newQueryString
  //  }

  return {
    productListProps,
  };
};

export default useProductPage;
