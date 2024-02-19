export const MESSAGE = {
  required: "Please enter your information",
  email: "Email format must be abc@xyz.com",
  password: "Please enter your password of at least 6 characters",
  phone: "Please enter your phone number correct format",
};

export const REQUIRED_MESSAGE = {
  email: "Please enter your email",
  name: "Please enter your name",
  phone: "Please enter your phone number",
  title: "Please enter title",
  description: "Please enter description",
};

export const REGEX = {
  email: /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};
