import Button from "@/components/Button";
import { MESSAGE } from "@/constants/validate";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const CheckoutCouponWrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;

  .checkout-discount {
    flex: 1;
  }

  input {
    margin: 0 !important;
  }
`;

const CheckoutCoupon = ({
  addedCoupon,
  handleAddCoupon,
  handleRemoveCoupon,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      discountCode: addedCoupon,
    },
  });

  useEffect(() => {
    reset({
      discountCode: addedCoupon,
    });
  }, [addedCoupon]);

  // Handle submit
  const _onSubmit = (data) => {
    if (data?.discountCode) {
      handleAddCoupon?.(data.discountCode);
    }
  };

  return (
    <CheckoutCouponWrapper>
      <div className="checkout-discount">
        <form action="#">
          <input
            type="text"
            className="form-control"
            id="checkout-discount-input"
            {...register("discountCode", {
              required: MESSAGE.required,
            })}
          />
          <label
            htmlFor="checkout-discount-input"
            className="text-truncate"
            style={{ opacity: addedCoupon ? 0 : 1 }}
          >
            Have a coupon? <span>Click here to enter your code</span>
          </label>
          <p className="form-error" style={{ minHeight: 23 }}>
            {errors?.discountCode?.message || ""}
          </p>
        </form>
      </div>
      {addedCoupon ? (
        <Button onClick={handleRemoveCoupon}>Remove Coupon</Button>
      ) : (
        <Button onClick={handleSubmit(_onSubmit)}>Add Coupon</Button>
      )}
    </CheckoutCouponWrapper>
  );
};

export default CheckoutCoupon;
