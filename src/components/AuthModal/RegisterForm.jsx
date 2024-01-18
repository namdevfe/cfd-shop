import { PATHS } from "@/constants/path";
import { MESSAGE, REGEX } from "@/constants/validate";
import useDebounce from "@/hooks/useDebounce";
import { handleRegister } from "@/store/reducers/authReducer";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button";
import ComponentLoading from "../ComponentLoading";
import { Input } from "../Input";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const _onSubmit = async (data) => {
    if (data && !loading.register) {
      const payload = {
        firstName: data?.name || "",
        lastName: data?.lastName || "",
        email: data?.email,
        password: data?.password,
      };
      try {
        const res = await dispatch(handleRegister(payload)).unwrap();
        console.log("🚀res---->", res);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const renderLoading = useDebounce(loading.register, 300);

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      {renderLoading && <ComponentLoading />}
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
