import { forwardRef, useImperativeHandle, useState } from "react";
import cn from "@/utils/cn";

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
    onChange?.();
  };

  return (
    <div className="product-nav product-nav-dots">
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
    </div>
  );
};

export default forwardRef(ProductCorlor);
