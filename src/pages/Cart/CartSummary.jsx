import Button from "@/components/Button";
import RadioGroup from "@/components/RadioGroup";
import { SHIPPING_OPTIONS } from "@/constants/general";
import { PATHS } from "@/constants/path";
import { formatCurrency } from "@/utils/format";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const CartSummary = ({ subTotal, total, typeShip, handleUpdateShipping }) => {
  const navigate = useNavigate();
  // Event handler
  const _onProceedToCheckout = (e) => {
    e?.preventDefault();
    if (!typeShip) {
      message.error("Please select shipping type");
    } else {
      navigate(PATHS.CHECKOUT);
    }
  };

  return (
    <aside className="col-lg-3">
      <div className="summary summary-cart">
        <h3 className="summary-title">Cart Total</h3>
        <table className="table table-summary">
          <tbody>
            {/* Subtotal */}
            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>${formatCurrency(subTotal, "en-US") || 0}</td>
            </tr>

            {/* Shipping type */}
            <tr className="summary-shipping">
              <td>Shipping:</td>
              <td>&nbsp;</td>
            </tr>
            <RadioGroup
              defaultValue={typeShip || ""}
              onChange={handleUpdateShipping}
            >
              {SHIPPING_OPTIONS.map((option, index) => {
                const { label, value, price } = option || {};
                return (
                  <tr key={value || index} className="summary-shipping-row">
                    <td>
                      <RadioGroup.Item value={value}>{label}</RadioGroup.Item>
                    </td>
                    <td>${formatCurrency(price, "en-US") || 0}</td>
                  </tr>
                );
              })}
            </RadioGroup>

            {/* Change address */}
            <tr className="summary-shipping-estimate">
              <td>
                Estimate for Your Country <br />
                <Link to={PATHS.DASHBOARD.MY_ADDRESS}>Change address</Link>
              </td>
              <td>&nbsp;</td>
            </tr>

            {/* Total */}
            <tr className="summary-total">
              <td>Total:</td>
              <td>${formatCurrency(total, "en-US") || 0}</td>
            </tr>
          </tbody>
        </table>

        {/* Proceed to checkout */}
        <Button
          variant="outline"
          className="btn-order btn-block"
          onClick={_onProceedToCheckout}
        >
          PROCEED TO CHECKOUT
        </Button>
      </div>

      {/* Continue shopping */}
      <Button
        link={PATHS.PRODUCT.INDEX}
        variant="outline-dark"
        className="btn-block mb-3"
      >
        <span>CONTINUE SHOPPING</span>
        <i className="icon-refresh" />
      </Button>
    </aside>
  );
};

export default CartSummary;
