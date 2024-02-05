import Button from "@/components/Button";
import { PATHS } from "@/constants/path";

const CheckoutSuccess = () => {
  return (
    <main className="main">
      <div className="content-success text-center">
        <div className="container">
          <h1 className="content-title">Your Order is Completed!</h1>
          <p>
            Your order has been completed. Your order details are shown for your
            personal accont.
          </p>
          <Button
            variant="outline"
            className="btn-minwidth-lg"
            link={PATHS.DASHBOARD.MY_ORDERS}
          >
            <span>VIEW MY ORDERS</span>
            <i className="icon-long-arrow-right" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
