import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import { PATHS } from "@/constants/path";
import { Link } from "react-router-dom";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import ProductToolbox from "./ProductToolbox";
import useProductPage from "./useProductPage";

const Product = () => {
  const { productListProps, pagiProps, toolboxProps, filterProps } =
    useProductPage();

  return (
    <main className="main">
      {/* Page header */}
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Product</Breadcrumb.Item>
      </Breadcrumb>

      {/* Page content */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <ProductToolbox {...toolboxProps} />
              <ProductList {...productListProps} />
              <Pagination {...pagiProps} />
            </div>
            <ProductFilter {...filterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
