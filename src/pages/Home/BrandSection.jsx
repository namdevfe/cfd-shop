import React, { useEffect } from "react";
import owlCarousels from "@/utils/owlCarousel";

const BrandSection = ({ brands }) => {
  useEffect(() => {
    owlCarousels();
  }, [brands]);

  return (
    <div className="container">
      <div
        className="owl-carousel mt-5 mb-5 owl-simple"
        data-toggle="owl"
        data-owl-options='{
                                                  "nav": false, 
                                                  "dots": false,
                                                  "margin": 30,
                                                  "loop": false,
                                                  "responsive": {
                                                      "0": {
                                                          "items":2
                                                      },
                                                      "420": {
                                                          "items":3
                                                      },
                                                      "600": {
                                                          "items":4
                                                      },
                                                      "900": {
                                                          "items":5
                                                      },
                                                      "1024": {
                                                          "items":6
                                                      }
                                                  }
                                              }'
      >
        {brands?.map((brand, index) => {
          return (
            <div key={new Date().getTime() + index} className="brand">
              <img src={brand} alt="Brand Name" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(BrandSection);
