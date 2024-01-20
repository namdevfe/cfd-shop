import React from "react";

const Select = ({ options, error, ...restProps }) => {
  return (
    <div className="select-custom">
      <select className="form-control" {...restProps}>
        {options?.map((option, index) => (
          <option key={option?.value || index} value={option?.value}>
            {option?.label || ""}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
