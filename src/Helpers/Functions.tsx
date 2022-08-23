export const updateValue = (x, max, direction) => {
  let value = x;
  value =
    direction === 'down' || direction === 'forward'
      ? value < max
        ? value + 1
        : max
      : value > 0
      ? value - 1
      : 0;

  return value;
};
