export const containsNumber = (str: string): boolean => {
  const regex = /\d+(\.\d+)?/;
  return regex.test(str);
};
