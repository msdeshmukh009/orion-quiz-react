const makeNumberArray = (num: number) => {
  const result = [];
  for (let i = 1; i <= num; i++) {
    result.push(i);
  }
  return result;
};

export { makeNumberArray };
