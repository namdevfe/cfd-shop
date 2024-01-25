import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";

// Remove arrows/spinners in input type number
const InputNumberStyle = styled.input`
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const QuantityInput = (
  {
    className,
    defaultValue,
    min = 1,
    max = 10,
    step = 1,
    onChange,
    ...inputProps
  },
  ref
) => {
  const [currentQuantity, setCurrentQuantity] = useState(defaultValue ?? 1);

  useImperativeHandle(ref, () => {
    return {
      value: currentQuantity,
      reset: () => {
        setCurrentQuantity(defaultValue ?? 1);
      },
    };
  });

  useEffect(() => {
    onChange?.(currentQuantity);
  }, [currentQuantity]);

  const _onDecrease = () => {
    const value = modifyValue(Number(currentQuantity) - Number(step));
    setCurrentQuantity(value);
  };

  const _onInputChange = (e) => {
    setCurrentQuantity(
      e.target.value !== "" ? modifyValue(Number(e.target.value)) : ""
    );
  };

  const _onInputBlur = () => {
    if (currentQuantity === "") {
      setCurrentQuantity(defaultValue);
    }
  };

  const _onIncrease = () => {
    const value = modifyValue(Number(currentQuantity) + Number(step));
    setCurrentQuantity(value);
  };

  const modifyValue = (value) => {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    } else {
      return value;
    }
  };

  return (
    <div className={className || ""}>
      <div className="input-group input-spinner">
        {/* Decrease Button */}
        <div className="input-group-prepend">
          <button
            style={{ minWidth: 26 }}
            className="btn btn-decrement btn-spinner"
            type="button"
            onClick={_onDecrease}
          >
            <i className="icon-minus" />
          </button>
        </div>
        <InputNumberStyle
          type="number"
          style={{ textAlign: "center" }}
          className="form-control"
          min={min}
          max={max}
          value={currentQuantity}
          onChange={_onInputChange}
          onBlur={_onInputBlur}
          {...inputProps}
        />

        {/* Increase Button */}
        <div className="input-group-append">
          <button
            style={{ minWidth: 26 }}
            className="btn btn-increment btn-spinner"
            type="button"
            onClick={_onIncrease}
          >
            <i className="icon-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(QuantityInput);
