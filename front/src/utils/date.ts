export const getCurDate = () => {
  return new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0];
};
