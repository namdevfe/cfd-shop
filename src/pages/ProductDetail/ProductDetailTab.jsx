import cn from "@/utils/cn";
import { formatDate, transformNumberToPercent } from "@/utils/format";
import { Empty } from "antd";
import { useState } from "react";

const TABS = {
  desc: "Description",
  shipping: "Shipping & Returns",
  reviews: "Reviews",
};

const ProductDetailTab = ({ description, shippingReturn, reviews }) => {
  const [selectedTab, setSelectedTab] = useState(TABS.desc);

  const _onTabChange = (e, tab) => {
    e?.preventDefault();
    setSelectedTab(tab);
  };

  return (
    <div className="product-details-tab">
      {/* Tab List */}
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS.desc,
            })}
            href="#product-desc-tab"
            onClick={(e) => _onTabChange(e, TABS.desc)}
          >
            {TABS.desc}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS.shipping,
            })}
            href="#"
            onClick={(e) => _onTabChange(e, TABS.shipping)}
          >
            {TABS.shipping}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS.reviews,
            })}
            href="#"
            onClick={(e) => _onTabChange(e, TABS.reviews)}
          >
            {TABS.reviews} ({reviews?.length})
          </a>
        </li>
      </ul>

      {/* Tab Content*/}
      <div className="tab-content">
        {/* Tab Description */}
        {selectedTab === TABS.desc && (
          <div className="tab-pane fade show active">
            <div
              className="product-desc-content"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
        )}

        {/* Tab Shipping & Returns */}
        {selectedTab === TABS.shipping && (
          <div className="tab-pane fade show active">
            <div
              className="product-desc-content"
              dangerouslySetInnerHTML={{ __html: shippingReturn }}
            />
          </div>
        )}

        {/* Tab Reviews */}
        {selectedTab === TABS.reviews && (
          <div className="tab-pane fade show active">
            {reviews?.length > 0 ? (
              <div className="reviews">
                <h3>Reviews ({reviews.length})</h3>
                {reviews.map((review, index) => {
                  const { id, description, title, updatedAt, rate } =
                    review || {};
                  return (
                    <div key={id || index} className="review">
                      <div className="row no-gutters">
                        <div className="col-auto">
                          <h4>
                            <a href="#">#{id?.slice(-4)}</a>
                          </h4>
                          <div className="ratings-container">
                            <div className="ratings">
                              <div
                                className="ratings-val"
                                style={{
                                  width: `${transformNumberToPercent(rate)}%`,
                                }}
                              />
                            </div>
                          </div>
                          <span className="review-date">
                            {formatDate(updatedAt)}
                          </span>
                        </div>
                        <div className="col">
                          <h4>{title || "Don't review"}</h4>
                          <div className="review-content">
                            <p>{description || "No, there isn't"}</p>
                          </div>
                          <div className="review-action">
                            <a href="#">
                              <i className="icon-thumbs-up" />
                              Helpful (2){" "}
                            </a>
                            <a href="#">
                              <i className="icon-thumbs-down" />
                              Unhelpful (0){" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Empty description="There is no review" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailTab;
