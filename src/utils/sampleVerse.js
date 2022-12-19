const getSampleVerse = async () => {
  // @ts-ignore
  return import("src/utils/sample-verse.json").then((data) => data.default);
};

export default getSampleVerse;
