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

export const removeAccents = (str) => {
  // remove accents
  var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return str;
};
