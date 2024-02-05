import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { MESSAGE, REGEX } from "@/constants/validate";
import React from "react";
import { useForm } from "react-hook-form";

const ContactForm = ({ handleSubmitContactForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit
  const onSubmit = (data) => {
    handleSubmitContactForm?.(data);
  };
  return (
    <div className="col-lg-6">
      <h2 className="title mb-1">Got Any Questions?</h2>
      <p className="mb-2">
        Use the form below to get in touch with the sales team
      </p>
      <form className="contact-form mb-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-sm-6">
            <Input
              placeholder="Name *"
              {...register("name", {
                required: MESSAGE.required,
              })}
              error={errors?.name?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              placeholder="Email *"
              {...register("email", {
                required: MESSAGE.required,
                pattern: {
                  value: REGEX.email,
                  message: MESSAGE.email,
                },
              })}
              error={errors?.email?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Input
              placeholder="Phone *"
              {...register("phone", {
                required: MESSAGE.required,
                pattern: {
                  value: REGEX.phone,
                  message: MESSAGE.phone,
                },
              })}
              error={errors?.phone?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              placeholder="Title *"
              {...register("title", {
                required: MESSAGE.required,
              })}
              error={errors?.title?.message || ""}
            />
          </div>
        </div>
        <Input
          renderInput={({ inputProps }) => {
            return (
              <textarea
                className="form-control"
                placeholder="Description *"
                row={4}
                col={30}
                {...inputProps}
                {...register("description", {
                  required: MESSAGE.required,
                })}
                style={{ resize: "none" }}
              />
            );
          }}
          error={errors?.description?.message || ""}
        />

        <Button type="submit" variant="outline" className="btn-minwidth-sm">
          <span>SUBMIT</span>
          <i className="icon-long-arrow-right" />
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
