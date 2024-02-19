import cn from "@/utils/cn";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";

const ProductColorWrapper = styled.div`
  .product-nav-item {
    border-color: #cccccc;
  }
`;

const ProductCorlor = ({ colors, defaultColor, onChange }, ref) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  useImperativeHandle(ref, () => {
    return {
      value: selectedColor,
      reset: () => setSelectedColor(defaultColor),
    };
  });

  const _onColorChange = (e, color) => {
    e?.preventDefault();
    setSelectedColor(color);
    onChange?.(color);
  };

  // Set default color when product detail loaded
  useEffect(() => {
    setSelectedColor(defaultColor);
  }, [defaultColor]);

  return (
    <ProductColorWrapper className="product-nav product-nav-dots">
      {colors?.map((color, index) => {
        return (
          <div
            key={index}
            className={cn("product-nav-item", {
              active: selectedColor === color,
            })}
            style={{ background: `${color}` }}
            onClick={(e) => _onColorChange(e, color)}
          >
            <span className="sr-only">{color}</span>
          </div>
        );
      })}
    </ProductColorWrapper>
  );
};

export default forwardRef(ProductCorlor);
