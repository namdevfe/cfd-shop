import Button from "@/components/Button";
import { MESSAGE, REGEX } from "@/constants/validate";
import { useForm } from "react-hook-form";

const GetDealSection = ({ handleSubscribeDeal }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    email: "",
  });

  // Handle submit
  const _onSubmit = (email) => {
    handleSubscribeDeal?.(email, reset);
  };

  return (
    <div className="container">
      <div
        className="cta cta-separator cta-border-image cta-half mb-0"
        style={{
          backgroundImage: "url(/assets/images/demos/demo-3/bg-2.jpg)",
        }}
      >
        <div className="cta-border-wrapper bg-white">
          <div className="row">
            {/* Socials */}
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

            {/* Form Get Deal */}
            <div className="col-lg-6">
              <div className="cta-wrapper text-center">
                <h3 className="cta-title">Get the Latest Deals</h3>
                <p className="cta-desc">
                  and <br />
                  receive <span className="text-primary">$20 coupon</span> for
                  first shopping{" "}
                </p>
                <form onSubmit={handleSubmit(_onSubmit)}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Email Address"
                      {...register("email", {
                        required: MESSAGE.required,
                        pattern: {
                          value: REGEX.email,
                          message: MESSAGE.email,
                        },
                      })}
                    />
                    <div className="input-group-append">
                      <Button className="btn-rounded" type="submit">
                        <i className="icon-long-arrow-right" />
                      </Button>
                    </div>
                  </div>
                </form>
                <p className="form-error text-left" style={{ minHeight: 23 }}>
                  {errors?.email?.message || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetDealSection;
