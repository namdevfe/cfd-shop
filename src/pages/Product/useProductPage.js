import { SORT_OPTIONS } from "@/constants/general";
import { useMainContext } from "@/context/MainContext";
import useDebounce from "@/hooks/useDebounce";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/productService";
import scrollTop from "@/utils/scrollTop";
import queryString from "query-string";
import { useEffect, useMemo, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const PRODUCT_LIMITS = 9;

const useProductPage = () => {
  const { handleCloseMenuMobile } = useMainContext();
  // Get queryString from url
  const { search } = useLocation();

  // Parse queryString to object using query-string library
  const queryObject = queryString.parse(search);

  // Change content queryString
  const [_, setSearchParams] = useSearchParams();

  // Cache queryString
  const queryObjectRef = useRef();

  useEffect(() => {
    if (queryObject) {
      queryObjectRef.current = queryObject;
    }
  }, [queryObject]);

  // API Handling
  // API Products
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    execute: fetchProducts,
  } = useMutation((query) =>
    productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`)
  );

  // API Categories
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getCategories);

  const categories = categoriesData?.products || [];

  // ------------------- Data --------------------------
  // Product data
  const products = productsData?.products || [];
  const productsPagi = productsData?.pagination || {};

  useEffect(() => {
    fetchProducts(search);
    scrollTop();
    handleCloseMenuMobile?.();
  }, [search]);

  const productListLoading = useDebounce(productsLoading, 2000);

  const productListProps = {
    isLoading: productListLoading,
    isError: !!productsError,
    products,
  };

  // Handle Pagination
  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };

  const pagiProps = {
    page: Number(productsPagi.page || queryObject.page || 1),
    limit: Number(productsPagi.limit || 0),
    total: Number(productsPagi.total || 0),
    onPagiChange,
  };

  // Handle Toolbox Filter
  const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OPTIONS).find(
        (option) =>
          option.queryObject.orderBy === queryObject.orderBy &&
          option.queryObject.order === queryObject.order
      )?.value || SORT_OPTIONS.popularity.value
    );
  }, [queryObject]);

  const onSortChange = (sortType) => {
    const sortQueryObject = SORT_OPTIONS[sortType].queryObject;
    if (sortQueryObject) {
      updateQueryString({
        ...queryObject,
        ...sortQueryObject,
        page: 1,
      });
    }
  };

  const toolboxProps = {
    showNumb: products?.length || 0,
    totalNumb: productsPagi?.total || 0,
    activeSort,
    onSortChange,
  };

  // Handle Product Filter
  const onCateFilterChange = (cateId, isChecked) => {
    let newCategoryQuery = Array.isArray(queryObject.category)
      ? [...queryObject.category, cateId]
      : [queryObject.category, cateId];

    // Unchecked
    if (!isChecked) {
      newCategoryQuery = newCategoryQuery.filter(
        (category) => category !== cateId
      );
    }

    if (!cateId) {
      newCategoryQuery = [];
    }

    // Update queryString
    updateQueryString({
      ...queryObject,
      category: newCategoryQuery,
      page: 1,
    });
  };

  const priceFilterTimeout = useRef();
  const handlePriceFilterChange = (priceRange) => {
    if (priceRange?.length === 2) {
      // ClearTimeout
      if (priceFilterTimeout.current) {
        clearTimeout(priceFilterTimeout.current);
      }

      // Update queryString
      priceFilterTimeout.current = setTimeout(() => {
        updateQueryString({
          ...queryObjectRef.current,
          minPrice: priceRange[0].substring(1),
          maxPrice: priceRange[1].substring(1),
          page: 1,
        });
      }, 500);
    }
  };

  const filterProps = {
    categories: categories || [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    activeCategory: Array.isArray(queryObject.category)
      ? queryObject.category
      : [queryObject.category],
    currentPriceRange: [
      queryObject.minPrice || 0,
      queryObject.maxPrice || 1000,
    ],
    onCateFilterChange,
    handlePriceFilterChange,
  };

  return {
    productListProps,
    pagiProps,
    toolboxProps,
    filterProps,
  };
};

export default useProductPage;
