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
    ...inputProps
  },
  ref
) => {
  return (
    <div className="form-group">
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
