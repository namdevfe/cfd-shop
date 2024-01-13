import PageLoading from "@/components/PageLoading";
import HotProductSection from "./HotProductSection";
import IntroSection from "./IntroSection";
import useHomePage from "./useHomePage";
import useDebounce from "@/hooks/useDebounce";
import DealSection from "./DealSection";
import BrandSection from "./BrandSection";
import FeaturedSection from "./FeaturedSection";

const Home = () => {
  const {
    introProps,
    hotProductProps,
    dealProps,
    brandProps,
    featuredProps,
    apiLoading,
  } = useHomePage();
  const loading = useDebounce(apiLoading, 300);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <main className="main">
      <IntroSection {...introProps} />
      <HotProductSection {...hotProductProps} />
      <div className="mb-7 mb-lg-11" />
      <DealSection {...dealProps} />
      <BrandSection {...brandProps} />
      <FeaturedSection {...featuredProps} />
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <div className="icon-boxes-container mt-2 mb-2 bg-transparent">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-rocket" />
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">Free Shipping</h3>
                  <p>Orders $50 or more</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-rotate-left" />
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">Free Returns</h3>
                  <p>Within 30 days</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-info-circle" />
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">Get 20% Off 1 Item</h3>
                  <p>when you sign up</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-life-ring" />
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">We Support</h3>
                  <p>24/7 amazing services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          className="cta cta-separator cta-border-image cta-half mb-0"
          style={{
            backgroundImage: "url(assets/images/demos/demo-3/bg-2.jpg)",
          }}
        >
          <div className="cta-border-wrapper bg-white">
            <div className="row">
              <div className="col-lg-6">
                <div className="cta-wrapper cta-text text-center">
                  <h3 className="cta-title">Shop Social</h3>
                  <p className="cta-desc">
                    Donec nec justo eget felis facilisis fermentum. Aliquam
                    porttitor mauris sit amet orci.{" "}
                  </p>
                  <div className="social-icons social-icons-colored justify-content-center">
                    <a
                      href="#"
                      className="social-icon social-facebook"
                      title="Facebook"
                      target="_blank"
                    >
                      <i className="icon-facebook-f" />
                    </a>
                    <a
                      href="#"
                      className="social-icon social-twitter"
                      title="Twitter"
                      target="_blank"
                    >
                      <i className="icon-twitter" />
                    </a>
                    <a
                      href="#"
                      className="social-icon social-instagram"
                      title="Instagram"
                      target="_blank"
                    >
                      <i className="icon-instagram" />
                    </a>
                    <a
                      href="#"
                      className="social-icon social-youtube"
                      title="Youtube"
                      target="_blank"
                    >
                      <i className="icon-youtube" />
                    </a>
                    <a
                      href="#"
                      className="social-icon social-pinterest"
                      title="Pinterest"
                      target="_blank"
                    >
                      <i className="icon-pinterest" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="cta-wrapper text-center">
                  <h3 className="cta-title">Get the Latest Deals</h3>
                  <p className="cta-desc">
                    and <br />
                    receive <span className="text-primary">$20 coupon</span> for
                    first shopping{" "}
                  </p>
                  <form action="#">
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your Email Address"
                        aria-label="Email Adress"
                        required
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary btn-rounded"
                          type="submit"
                        >
                          <i className="icon-long-arrow-right" />
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-error text-left">
                    Please fill in this field
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
