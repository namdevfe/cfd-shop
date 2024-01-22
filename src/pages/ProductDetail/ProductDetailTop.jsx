import ProductCorlor from "@/components/ProductColor";
import ProductImageZoom from "@/components/ProductImageZoom";
import ShareLink from "@/components/ShareLink";
import { PATHS } from "@/constants/path";
import { formatCurrency, transformNumberToPercent } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";

const ProductDetailTop = ({
  images,
  title,
  reviews,
  rating,
  price,
  description,
  color,
  category,
  colorRef,
  quantityRef,
  handleAddToCart,
  handleAddToWishList,
}) => {
  const pathUrl = window.location.href;
  const categoryPath =
    category?.id && PATHS.PRODUCT.INDEX + `?category=${category?.id}`;

  const _onAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddToCart?.();
  };

  const _onAddToWishList = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddToWishList?.();
  };

  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <ProductImageZoom images={images} />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{title || ""}</h1>
            <div className="ratings-container">
              <div className="ratings">
                <div
                  className="ratings-val"
                  style={{ width: `${transformNumberToPercent(rating)}%` }}
                />
              </div>
              <a
                className="ratings-text"
                href="#product-review-link"
                id="review-link"
              >
                ( {reviews?.length || 0} Reviews )
              </a>
            </div>
            <div className="product-price">
              ${formatCurrency(price, "en-US") || 0}
            </div>
            <div
              className="product-content"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>
            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <ProductCorlor colors={color} ref={colorRef} />
            </div>
          </div>
          <div className="details-filter-row details-row-size">
            <label htmlFor="qty">Qty:</label>
            <div className="product-details-quantity">
              <input
                type="number"
                id="qty"
                className="form-control"
                defaultValue={1}
                min={1}
                max={10}
                step={1}
                data-decimals={0}
                required
              />
            </div>
          </div>
          <div className="product-details-action">
            <a href="#" className="btn-product btn-cart" onClick={_onAddToCart}>
              <span>add to cart</span>
            </a>
            <div className="details-action-wrapper">
              <a
                href="#"
                className="btn-product btn-wishlist"
                title="Wishlist"
                onClick={_onAddToWishList}
              >
                <span>Add to Wishlist</span>
              </a>
            </div>
          </div>
          <div className="product-details-footer">
            <div className="product-cat">
              <span>Category:</span>{" "}
              <Link to={categoryPath}>{category?.name}</Link>
            </div>
            <div className="social-icons social-icons-sm" style={{ gap: 5 }}>
              <span className="social-label">Share:</span>
              <ShareLink path={pathUrl} title={title}>
                <i className="icon-facebook-f" />
              </ShareLink>
              <ShareLink path={pathUrl} type="twitter" title={title}>
                <i className="icon-twitter" />
              </ShareLink>
              <ShareLink path={pathUrl} type="instagram" title={title}>
                <i className="icon-instagram" />
              </ShareLink>
              <ShareLink path={pathUrl} type="pinterest" title={title}>
                <i className="icon-pinterest" />
              </ShareLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTop;
