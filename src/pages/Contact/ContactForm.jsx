import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { MESSAGE, REGEX, REQUIRED_MESSAGE } from "@/constants/validate";
import cn from "@/utils/cn";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const FormContainer = styled.form`
  .form-error {
    line-height: initial;
  }

  .form-group {
    margin-bottom: initial;
  }
`;

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
      <FormContainer
        className="contact-form mb-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-sm-6">
            <Input
              placeholder="Name *"
              {...register("name", {
                required: REQUIRED_MESSAGE.name,
              })}
              error={errors?.name?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              placeholder="Email *"
              {...register("email", {
                required: REQUIRED_MESSAGE.email,
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
                required: REQUIRED_MESSAGE.phone,
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
                required: REQUIRED_MESSAGE.title,
              })}
              error={errors?.title?.message || ""}
            />
          </div>
        </div>
        <Input
          renderInput={({ inputProps }) => {
            return (
              <textarea
                className={cn("form-control", {
                  "input-error": !!errors?.description?.message,
                })}
                placeholder="Description *"
                row={4}
                col={30}
                {...inputProps}
                {...register("description", {
                  required: REQUIRED_MESSAGE.description,
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
      </FormContainer>
    </div>
  );
};

export default ContactForm;
