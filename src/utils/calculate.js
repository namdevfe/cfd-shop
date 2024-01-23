export const sumArrayNumber = (array, initialValue = 0) => {
  return (
    array?.reduce((curr, next) => Number(curr) + Number(next), initialValue) ||
    0
  );
};
