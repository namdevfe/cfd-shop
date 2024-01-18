import { useForm } from "react-hook-form";
import { MESSAGE, REGEX } from "@/constants/validate";
import Button from "../Button";
import { Input } from "../Input";
import { useAuthContext } from "@/context/AuthContext";
import ComponentLoading from "../ComponentLoading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "@/store/reducers/authReducer";
import useDebounce from "@/hooks/useDebounce";
import { render } from "react-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle submit
  const onSubmit = async (data) => {
    if (data && !loading.login) {
      try {
        const res = await dispatch(handleLogin(data)).unwrap();
      } catch (error) {
        console.log("🚀error---->", error);
      }
    }
  };

  const renderLoading = useDebounce(loading.login, 300);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderLoading && <ComponentLoading />}
      {/* Username || Email */}
      <Input
        label="Username or email address"
        required
        placeholder="Username or email address"
        {...register("email", {
          required: MESSAGE.required,
          pattern: {
            value: REGEX.email,
            message: MESSAGE.email,
          },
        })}
        error={errors?.email?.message || ""}
      />

      {/* Password */}
      <Input
        label="Password"
        required
        placeholder="Password"
        type="password"
        {...register("password", {
          required: MESSAGE.required,
        })}
        error={errors?.password?.message || ""}
      />

      <div className="form-footer" style={{ width: "100%" }}>
        <Button
          type="submit"
          variant="outline"
          style={{ width: "100%", marginRight: "initial" }}
        >
          <span>LOG IN</span>
          <i className="icon-long-arrow-right" />
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
