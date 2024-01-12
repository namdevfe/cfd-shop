import React from "react";

const Button = ({
  variant = "primary",
  className = "",
  children,
  ...restProps
}) => {
  let variantClass = "";
  switch (variant) {
    case "outline":
      variantClass = "btn btn-outline-primary-2";
      break;
  }
  return (
    <button className={`${variantClass} ${className}`} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
