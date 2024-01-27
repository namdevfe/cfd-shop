import Breadcrumb from "@/components/Breadcrumb";
import useCheckoutPage from "./useCheckoutPage";
import { Link } from "react-router-dom";
import { PATHS } from "@/constants/path";
import CheckoutCoupon from "./CheckoutCoupon";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  const { checkoutCouponProps, checkoutFormProps } = useCheckoutPage();

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Checkout</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCT.INDEX}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Checkout</Breadcrumb.Item>
      </Breadcrumb>

      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <CheckoutCoupon {...checkoutCouponProps} />
            <CheckoutForm {...checkoutFormProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
