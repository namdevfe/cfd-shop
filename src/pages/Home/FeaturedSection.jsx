import ProductCard from "@/components/ProductCard";
import cn from "@/utils/cn";
import owlCarousels from "@/utils/owlCarousel";
import React, { useEffect } from "react";

const FeaturedSection = ({
  categories,
  selectedCateSlug,
  featureProducts,
  handleSelectCate,
}) => {
  // Handle select category
  const _onSelectCate = (e, slug) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleSelectCate?.("");
    setTimeout(() => {
      handleSelectCate?.(slug);
    }, 200);
  };

  useEffect(() => {
    owlCarousels();
  }, [selectedCateSlug]);

  return (
    <div className="container top" style={{ height: 505 }}>
      <div className="heading heading-flex mb-3">
        <div className="heading-left">
          <h2 className="title">Featured Products</h2>
        </div>
        <div className="heading-right">
          <ul className="nav nav-pills nav-border-anim justify-content-center">
            {categories?.map((category, index) => {
              const { id, name, slug } = category || {};
              return (
                <li key={id || index} className="nav-item">
                  <div
                    style={{ cursor: "pointer" }}
                    className={cn("nav-link", {
                      active: selectedCateSlug === slug,
                    })}
                    onClick={(e) => _onSelectCate(e, slug)}
                  >
                    {name}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="tab-content tab-content-carousel just-action-icons-sm">
        <div
          // className="tab-pane p-0 fade show active"
          className={cn("tab-pane p-0 fade", {
            "show active": featureProducts?.length > 0,
          })}
        >
          {featureProducts?.length > 0 && (
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                                      "nav": true, 
                                                      "dots": false,
                                                      "margin": 20,
                                                      "loop": false,
                                                      "responsive": {
                                                          "0": {
                                                              "items":2
                                                          },
                                                          "480": {
                                                              "items":2
                                                          },
                                                          "992": {
                                                              "items":3
                                                          },
                                                          "1200": {
                                                              "items":4
                                                          }
                                                      }
                                                  }'
            >
              {featureProducts?.map((product, index) => (
                <ProductCard key={product?.id || index} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
