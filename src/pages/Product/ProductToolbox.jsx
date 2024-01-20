import { Input } from "@/components/Input";
import Select from "@/components/Select";
import { SORT_OPTIONS } from "@/constants/general";
import React from "react";
import styled from "styled-components";

const ToolboxRightWrapper = styled.div`
  .form-group {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const ProductToolbox = ({ showNumb, totalNumb, activeSort, onSortChange }) => {
  const onSelectChange = (e) => {
    onSortChange?.(e.target.value);
  };

  return (
    <div className="toolbox">
      <div className="toolbox-left">
        <div className="toolbox-info">
          Showing{" "}
          <span>
            {showNumb || 0} of {totalNumb || 0}
          </span>{" "}
          Products
        </div>
      </div>
      <ToolboxRightWrapper>
        <Input
          label="Sort by:"
          className="toolbox-sort"
          renderInput={(inputProps) => {
            return (
              <Select
                options={[
                  SORT_OPTIONS.popularity,
                  SORT_OPTIONS.pricelow,
                  SORT_OPTIONS.pricehigh,
                  SORT_OPTIONS.newest,
                  SORT_OPTIONS.rating,
                ]}
                {...inputProps}
                value={activeSort}
                onChange={onSelectChange}
              />
            );
          }}
        />
      </ToolboxRightWrapper>
    </div>
  );
};

export default ProductToolbox;
