export const CDN_HOST = "https://static.qurancdn.com";
export const CDN_ASSETS_VERSION = "1";

//  Generate versioned URL of static asset

export const makeCDNUrl = (path) => {
  return `${CDN_HOST}/${path}?v=${CDN_ASSETS_VERSION}`;
};
