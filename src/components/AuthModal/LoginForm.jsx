import { useForm } from "react-hook-form";
import { MESSAGE, REGEX } from "@/constants/validate";
import Button from "../Button";
import { Input } from "../Input";
import { useAuthContext } from "@/context/AuthContext";
import ComponentLoading from "../ComponentLoading";
import { useState } from "react";

const LoginForm = () => {
  const { handleLogin } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    if (data) {
      setLoading(true);
      handleLogin?.(data, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loading && <ComponentLoading />}
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
