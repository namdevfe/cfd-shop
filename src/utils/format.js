import { TIME_DISPLAY } from "@/constants/format-date";
import moment from "moment";

export const formatCurrency = (data, type = "vi-VN") => {
  if (!data) return 0;
  return data.toLocaleString(type);
};

export const transformNumberToPercent = (number) => {
  if (!number) return 0;
  return number * 100;
};

export const formatDate = (date, format = TIME_DISPLAY.DATE) => {
  if (!!!date) return "";
  return moment.utc(date).format(format);
};
