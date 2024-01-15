import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { MESSAGE, REGEX } from "@/constants/validate";
import Button from "../Button";
import { Link } from "react-router-dom";
import { PATHS } from "@/constants/path";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const _onSubmit = (data) => {
    console.log("🚀data---->", data);
  };

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Input
        label="Your email address"
        required
        placeholder="Email"
        {...register("email", {
          required: MESSAGE.required,
          pattern: {
            value: REGEX.email,
            message: MESSAGE.email,
          },
        })}
        error={errors?.email?.message || ""}
      />

      <Input
        type="password"
        label="Password"
        required
        placeholder="Password"
        {...register("password", {
          required: MESSAGE.required,
          minLength: {
            value: 6,
            message: MESSAGE.password,
          },
        })}
        error={errors?.password?.message || ""}
      />

      <div className="form-footer">
        <Button type="submit" variant="outline">
          <span>SIGN UP</span>
          <i className="icon-long-arrow-right" />
        </Button>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="register-policy"
            required
            {...register("isAgree", {
              required: MESSAGE.required,
            })}
          />
          <label className="custom-control-label" htmlFor="register-policy">
            I agree to the <Link to={PATHS.PRIVACY}>privacy policy</Link> *
          </label>
          {errors?.isAgree?.message && (
            <p className="form-error">{errors.isAgree.message || ""}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
