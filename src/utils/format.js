export const formatCurrency = (data, type = "vi-VN") => {
  if (!data) return 0;
  return data.toLocaleString(type);
};

export const transformNumberToPercent = (number) => {
  if (!number) return 0;
  return number * 100;
};
