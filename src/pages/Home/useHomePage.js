import useQuery from "@/hooks/useQuery";
import { pageService } from "@/services/pageService";
import { productService } from "@/services/productService";
import { useState } from "react";

const useHomePage = () => {
  // API Handling
  const { data: productsData, loading: productsLoading } = useQuery(
    productService.getProducts
  );

  const { data: homeData, loading: homeLoading } = useQuery(() => {
    return pageService.getPageDataByName("home");
  });

  const { data: categoriesData, loading: categoriesLoading } = useQuery(
    productService.getCategories
  );

  const products = productsData?.products || [];
  const featuredProducts = products?.filter((product) => product.featured);

  // Handle Intro Section
  const introProducts = featuredProducts.slice(0, 3);
  const introProps = {
    introProducts,
  };

  // Handle Hot Product Section
  const onSaleProducts = products?.filter((product) => product.onSale);
  const topRatedProducts = products?.filter((product) => product.topRated);
  const hotProductProps = {
    featuredProducts,
    onSaleProducts,
    topRatedProducts,
  };

  // Handle Deal Section
  const dealProducts = onSaleProducts?.filter(
    (product) => product.discount > 0
  );
  const dealProps = {
    dealProducts,
  };

  // Handle Brand Section
  const brands = homeData?.data?.brands || [];
  const brandProps = { brands };

  // Handle Featured Section
  const [selectedCateSlug, setSelectedCateSlug] = useState("all");
  const categories = categoriesData?.products || [];

  const featureProducts =
    selectedCateSlug === "all"
      ? [...(products || [])]
      : products?.filter(
          (product) => product?.category?.slug === selectedCateSlug
        );

  const featuredProps = {
    categories: [{ name: "All", slug: "all" }, ...categories],
    selectedCateSlug,
    featureProducts,
    handleSelectCate: (slug) => setSelectedCateSlug(slug),
  };

  // Handle Loading
  const apiLoading = productsLoading || homeLoading || categoriesLoading;

  return {
    introProps,
    hotProductProps,
    dealProps,
    brandProps,
    featuredProps,
    apiLoading,
  };
};

export default useHomePage;
