import cn from "@/utils/cn";
import React, { useMemo } from "react";
import styled from "styled-components";

const PAGE_STEP = 1;

const Pagination = ({ page, limit = 0, total = 0, onPagiChange }) => {
  // Caculate totalPage
  const totalPage = useMemo(() => {
    if (!limit || !total) {
      return 1;
    }
    return Math.ceil(Number(total) / Number(limit)) || 1;
  }, [limit, total]);

  const pageList = useMemo(() => {
    let start = page - PAGE_STEP;
    let end = page + PAGE_STEP;

    if (start <= 0) {
      start = 1;
      end = start + PAGE_STEP * 2;
      if (end > totalPage) {
        end = totalPage;
      }
    }

    if (end >= totalPage) {
      end = totalPage;
      start = end - PAGE_STEP * 2;
      if (start < 1) {
        start = 1;
      }
    }

    const list = [];
    for (let index = start; index < end + 1; index++) {
      list.push(index);
    }

    return list;
  }, [page, totalPage]);

  // Handle Event
  const onNext = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPage) {
      onPagiChange(nextPage);
    }
  };

  const onPrev = () => {
    const prevPage = page - 1;
    if (prevPage > 0) {
      onPagiChange(prevPage);
    }
  };

  const onFirst = () => {
    onPagiChange(1);
  };

  const onLast = () => {
    onPagiChange(totalPage);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <PagiItem isDisabled={page === 1} onClick={onPrev}>
          <span>
            <i className="icon-long-arrow-left" />
          </span>
          Prev
        </PagiItem>
        <PagiItem isDisabled={pageList[0] === 1} onClick={onFirst}>
          First
        </PagiItem>
        {pageList.length > 0 &&
          pageList.map((pageNumber, index) => {
            return (
              <PagiItem
                key={index}
                isActive={pageNumber === page}
                onClick={() => onPagiChange(pageNumber)}
              >
                {pageNumber}
              </PagiItem>
            );
          })}
        <PagiItem isDisabled className="page-item-total">
          of {totalPage}
        </PagiItem>

        <PagiItem
          isDisabled={pageList[pageList.length - 1] === totalPage}
          onClick={onLast}
        >
          Last
        </PagiItem>
        <PagiItem
          isDisabled={pageList[pageList.length - 1] === page}
          onClick={onNext}
        >
          Next
          <span>
            <i className="icon-long-arrow-right" />
          </span>
        </PagiItem>
      </ul>
    </nav>
  );
};

const PagiItem = ({
  children,
  isDisabled = false,
  isActive = false,
  className,
  onClick,
  ...restProps
}) => {
  return (
    <PagiItemWrapper
      className={cn(`page-item ${className}`, {
        active: isActive,
        disabled: isDisabled,
      })}
      onClick={() => (isDisabled ? {} : onClick())}
      {...restProps}
    >
      <a className="page-link">{children}</a>
    </PagiItemWrapper>
  );
};

const PagiItemWrapper = styled.li`
  margin: 0 10px;
  cursor: pointer;
  .page-link {
    display: flex;
    gap: 10px;
    &:hover {
      color: #fcb941 !important;
    }
  }
  &.disabled {
    pointer-events: none;
  }
`;

export default Pagination;
