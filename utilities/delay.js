export const delay = (func, timeToAwait) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), timeToAwait);
  };
};
