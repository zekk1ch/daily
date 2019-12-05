export const preventDefault = (fn, ...args) => (e) => {
    e.preventDefault();
    return fn(...args);
};
