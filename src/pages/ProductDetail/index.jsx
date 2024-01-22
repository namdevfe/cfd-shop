import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constants/path";
import { Link } from "react-router-dom";
import ProductDetailTab from "./ProductDetailTab";
import ProductDetailTop from "./ProductDetailTop";
import useProductDetailPage from "./useProductDetailPage";

const ProductDetail = () => {
  const { productName, productDetailTopProps, productDetailTabProps } =
    useProductDetailPage();

  return (
    <main className="main">
      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCT.INDEX}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{productName || ""}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          {/* Product Detail Top */}
          <ProductDetailTop {...productDetailTopProps} />

          {/* Product Detail Tab */}
          <ProductDetailTab {...productDetailTabProps} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
