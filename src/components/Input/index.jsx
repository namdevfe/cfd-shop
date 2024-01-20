import React, { forwardRef } from "react";
import cn from "@/utils/cn";

export const InputM = (
  {
    label,
    required,
    error,
    htmlFor,
    name,
    renderInput = undefined,
    className,
    ...inputProps
  },
  ref
) => {
  return (
    <div className={`form-group ${className || ""}`}>
      {!!label && (
        <label htmlFor={name}>
          {label} {required ? "*" : ""}
        </label>
      )}
      {renderInput?.({ ...inputProps, ref: ref }) || (
        <input
          ref={ref}
          className={cn("form-control", {
            "input-error": !!error,
          })}
          name={name}
          required={required}
          id={name}
          {...inputProps}
        />
      )}
      <p className="form-error" style={{ minHeight: 23 }}>
        {error || ""}
      </p>
    </div>
  );
};

export const Input = forwardRef(InputM);
