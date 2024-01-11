import scrollTop from "@/utils/scrollTop";
import React from "react";

const ScrollToTop = () => {
  return (
    <button id="scroll-top" title="Back to Top" onClick={scrollTop}>
      <i className="icon-arrow-up" />
    </button>
  );
};

export default ScrollToTop;
