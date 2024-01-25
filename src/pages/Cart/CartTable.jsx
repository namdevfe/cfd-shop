import ProductColor from "@/components/ProductColor";
import QuantityInput from "@/components/QuantityInput";
import { PATHS } from "@/constants/path";
import { formatCurrency } from "@/utils/format";
import { Empty, Modal } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductTitleWrapper = styled.div`
  .product-variant {
    display: flex;
    align-items: center;
    gap: 6px;

    .product-nav-dots {
      margin: 0;
    }
  }
`;

const CartTable = ({
  products,
  quantityRef,
  handleRemoveProduct,
  handleUpdateQuantity,
}) => {
  const { confirm } = Modal;

  // Events handler
  const _onRemoveProduct = (e, removedIndex) => {
    e?.preventDefault();
    e?.stopPropagation();

    // Confirm remove product
    confirm({
      title: "Do you want remove from cart?",
      content: (
        <>
          <p>{products?.[removedIndex]?.name}</p>
          <p>
            {products?.[removedIndex]?.quantity} x{" "}
            {products?.[removedIndex]?.price}
          </p>
        </>
      ),
      onOk() {
        if (removedIndex > -1) {
          handleRemoveProduct?.(removedIndex);
        }
      },
      onCancel() {
        console.log("🚀cancel---->");
      },
    });
  };

  return (
    <div className="col-lg-9">
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products.map((product, index) => {
              const {
                id,
                images,
                name,
                price,
                slug,
                quantity,
                totalProduct,
                variant,
              } = product || {};
              const detailPath = PATHS.PRODUCT.INDEX + `/${slug}`;

              // Image path
              let imagePath = images?.[0];
              if (imagePath?.split("https")?.length > 2) {
                imagePath = imagePath.split("https");
                imagePath = `https${imagePath[2]}`;
              }

              return (
                <tr key={id + index}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <Link to={detailPath}>
                          <img src={imagePath} alt={name} />
                        </Link>
                      </figure>
                      <ProductTitleWrapper>
                        <h3 className="product-title">
                          <Link to={detailPath}>{name || ""}</Link>
                        </h3>
                        <div className="product-variant">
                          <p>Color:</p>
                          <ProductColor colors={[variant]} />
                        </div>
                      </ProductTitleWrapper>
                    </div>
                  </td>
                  <td className="price-col">
                    ${formatCurrency(price, "en-US") || 0}
                  </td>
                  <td className="quantity-col">
                    <div className="cart-product-quantity">
                      <QuantityInput
                        ref={(thisRef) =>
                          (quantityRef.current[index] = thisRef)
                        }
                        defaultValue={quantity}
                        max={100}
                        onChange={(value) => handleUpdateQuantity(value, index)}
                      />
                    </div>
                  </td>
                  <td className="total-col">
                    ${formatCurrency(totalProduct, "en-US") || 0}
                  </td>
                  <td className="remove-col">
                    <button
                      className="btn-remove"
                      onClick={(e) => _onRemoveProduct(e, index)}
                    >
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <p>There is no any product</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
