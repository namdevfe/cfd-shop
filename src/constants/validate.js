export const MESSAGE = {
  required: "Please enter your information",
  email: "Please enter your email with format abc@xyz.com",
  password: "Please enter your password of at least 6 characters",
  phone: "Please enter your phone number correct format",
};

export const REGEX = {
  email: /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};
