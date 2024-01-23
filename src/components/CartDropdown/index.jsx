import { PATHS } from "@/constants/path";
import { formatCurrency } from "@/utils/format";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductColor from "../ProductColor";
import Button from "../Button";
import { Modal } from "antd";

const DropdownContainer = styled.div`
  max-height: 30vh;
  overflow-y: scroll;
  padding-right: 10px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #fcb941;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #e5990d;
  }
`;

const ProductCartDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .product-variant {
    display: flex;
    align-items: center;
    gap: 6px;

    .product-nav-dots {
      margin: 0;
    }
  }
`;

const CartDropdown = ({ products, total, shipping, handleRemoveProduct }) => {
  const { confirm } = Modal;

  // Handle events
  const _onRemoveProduct = (e, removedIndex) => {
    e?.preventDefault();
    e?.stopPropagation();
    const removedProduct = products?.[removedIndex];
    confirm({
      title: "Do you want remove from cart?",
      content: (
        <>
          <p>{removedProduct?.name || ""}</p>
          <p>
            {removedProduct?.quantity || 0} x {removedProduct?.price || 0}
          </p>
        </>
      ),
      onOk() {
        if (removedIndex > -1) {
          handleRemoveProduct?.(removedIndex);
        }
      },
      onCancel() {
        console.log("🚀cancel");
      },
    });
  };

  return (
    <div className="dropdown cart-dropdown">
      <a
        href="#"
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
      >
        <i className="icon-shopping-cart" />
        <span className="cart-count">{products?.length || 0}</span>
      </a>
      <div className="dropdown-menu dropdown-menu-right" style={{ width: 400 }}>
        {products?.length > 0 ? (
          <>
            <DropdownContainer className="dropdown-cart-products">
              {products.map((product, index) => {
                const { id, name, quantity, price, images, slug, variant } =
                  product || {};

                // Path product detail
                const detailPath = PATHS.PRODUCT.INDEX + `/${slug}`;

                // Images path
                let imagePath = images?.[0];
                if (imagePath?.split("https")?.length > 2) {
                  imagePath = imagePath.split("https");
                  imagePath = `https${imagePath[2]}`;
                }

                return (
                  <div key={id || index} className="product">
                    <ProductCartDetailWrapper className="product-cart-details">
                      <h4 className="product-title">
                        <Link to={detailPath}>{name || ""}</Link>
                      </h4>
                      <div className="product-variant">
                        <span>Color:</span>
                        <ProductColor colors={[variant]} />
                      </div>
                      <span className="cart-product-info">
                        <span className="cart-product-qty">
                          {quantity || 0}
                        </span>{" "}
                        x ${formatCurrency(price, "en-US") || 0}
                      </span>
                    </ProductCartDetailWrapper>
                    <figure className="product-image-container">
                      <Link to={detailPath} className="product-image">
                        <img src={imagePath} alt={name} />
                      </Link>
                    </figure>
                    <a
                      href="#"
                      className="btn-remove"
                      title="Remove Product"
                      onClick={(e) => _onRemoveProduct(e, index)}
                    >
                      <i className="icon-close" />
                    </a>
                  </div>
                );
              })}
            </DropdownContainer>
            <div className="dropdown-cart-total">
              <span>Total</span>
              <span className="cart-total-price">
                ${formatCurrency(total, "en-US") || 0}
              </span>
            </div>
            <div className="dropdown-cart-action">
              <Button link={PATHS.SHOPPING_CART}>View Cart</Button>
              {shipping?.typeShip && (
                <Button link={PATHS.CHECKOUT} variant="outline">
                  <span>Checkout</span>
                  <i className="icon-long-arrow-right" />
                </Button>
              )}
            </div>
          </>
        ) : (
          <p>
            There is no any product in cart -{" "}
            <Link to={PATHS.PRODUCT.INDEX}>Go to shop</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
