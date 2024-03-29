import { PATHS } from "@/constants/path";
import { handleAddWishList } from "@/store/reducers/authReducer";
import { handleAddCart } from "@/store/reducers/cartReducer";
import { formatCurrency } from "@/utils/format";
import { Empty } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { id, images, slug, title, price, rating, discount, color } =
    product || {};
  const productPath = PATHS.PRODUCT.INDEX + `/${slug}`;

  // Handle Add to cart
  const _onAddToCart = (e) => {
    e?.preventDefault();

    // ADD CART
    const addPayload = {
      addedId: id,
      addedColor: color?.[0],
      addedQuantity: 1,
      addedPrice: price - discount,
    };

    dispatch(handleAddCart(addPayload));
  };

  // Handle Add To Wishlist
  const _onAddToWishList = (e) => {
    e?.preventDefault();
    dispatch(handleAddWishList(id));
  };

  return (
    <div className="product product-2">
      <figure className="product-media" style={{ height: 275 }}>
        {discount > 0 && (
          <span className="product-label label-circle label-sale">Sale</span>
        )}
        <Link to={productPath} style={{ width: "100%", height: "100%" }}>
          {images?.length > 0 ? (
            <img
              src={images[0]}
              alt={title || ""}
              className="product-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <ImageWrapper>
              <Empty description="" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </ImageWrapper>
          )}
        </Link>
        <div className="product-action-vertical">
          <a
            href="#"
            className="btn-product-icon btn-wishlist btn-expandable"
            onClick={_onAddToWishList}
          >
            <span>add to wishlist</span>
          </a>
        </div>
        <div className="product-action product-action-dark">
          <a
            href="#"
            className="btn-product btn-cart"
            title="Add to cart"
            onClick={_onAddToCart}
          >
            <span>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link
            style={{
              height: 60,
              display: "-webkit-inline-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
            to={productPath}
          >
            {title || ""}
          </Link>
        </h3>
        <div className="product-price">
          {discount > 0 ? (
            <>
              <span className="new-price">
                ${formatCurrency(price - discount, "en-US") || 0}
              </span>
              <span className="old-price">
                Was ${formatCurrency(price, "en-US") || 0}
              </span>
            </>
          ) : (
            <>${formatCurrency(price, "en-US") || 0}</>
          )}
        </div>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{ width: `${(rating || 0) * 20}%` }}
            />
          </div>
          <span className="ratings-text">( {Math.ceil(rating)} Reviews )</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
