import { useForm } from "react-hook-form";
import { MESSAGE, REGEX } from "@/constants/validate";
import Button from "../Button";
import { Input } from "../Input";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
