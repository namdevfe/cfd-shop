import ProductCard from "@/components/ProductCard";
import useDebounce from "@/hooks/useDebounce";
import { Empty, Skeleton } from "antd";
import React from "react";
import styled from "styled-components";

const ProductSkeletonStyle = styled.div`
  flex-direction: column;
  gap: 10px;
  padding-bottom: 5%;
`;

const ProductList = ({ products, isError, isLoading }) => {
  console.log("🚀isLoading---->", isLoading);
  const apiLoading = useDebounce(isLoading, 5000);

  // Case: No data || Error
  if ((!apiLoading && products?.length < 1) || isError) {
    return (
      <div className="products mb-3">
        <div className="row justify-content-center">
          <Empty description="There is no products" />
        </div>
      </div>
    );
  }

  // Handle Skeleton Loading when calling API
  if (apiLoading) {
    return (
      <div className="products mb-3">
        <div className="row justify-content-center">
          {new Array(3).fill("").map((_, index) => (
            <ProductSkeletonStyle
              key={index}
              className="col-6 col-md-4 col-lg-4"
            >
              <Skeleton.Image active style={{ width: "100%", height: 275 }} />
              <Skeleton.Input active />
              <Skeleton.Input block active />
            </ProductSkeletonStyle>
          ))}
        </div>
      </div>
    );
  }
  // Case: Has data
  return (
    <div className="products mb-3">
      <div className="row justify-content-center">
        {products.map((product, index) => {
          return (
            <div key={product?.id || index} className="col-6 col-md-4 col-lg-4">
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
