export const withStopPropagation = (cb) => (e) => {
  e.stopPropagation();
  cb();
};
