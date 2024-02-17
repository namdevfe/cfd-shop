import { GENERAL_MESSAGE, HOME_MESSAGE } from "@/constants/message";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { pageService } from "@/services/pageService";
import { productService } from "@/services/productService";
import { subscribeService } from "@/services/subscribeService";
import { message } from "antd";
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

  const {
    data,
    error,
    loading,
    execute: dealExecute,
  } = useMutation(subscribeService.subscribeDeal);

  const products = productsData?.products || [];
  const featuredProducts = products?.filter((product) => product.featured);

  // Handle Intro Section
  const introProducts = homeData?.data?.category || [];
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

  // Handle Service Section
  const services = homeData?.data?.information || {};
  const serviceProps = {
    services,
  };

  // Handle Loading
  const apiLoading = productsLoading || homeLoading || categoriesLoading;

  const handleSubscribeDeal = (email, callback) => {
    if (email) {
      dealExecute(email, {
        onSuccess: (data) => {
          message.success(HOME_MESSAGE.dealSuccess);
          callback?.();
        },
        onFail: (error) => {
          message.error(GENERAL_MESSAGE.error);
        },
      });
    }
  };

  const getDealProps = {
    handleSubscribeDeal,
  };

  return {
    introProps,
    hotProductProps,
    dealProps,
    brandProps,
    featuredProps,
    serviceProps,
    getDealProps,
    apiLoading,
  };
};

export default useHomePage;
