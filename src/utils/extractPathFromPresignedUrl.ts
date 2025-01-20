export const extractPathFromPresignedUrl = (urlArr: string[]) => {
  return urlArr.map((url) => {
    const urlObject = new URL(url);
    return urlObject.origin + urlObject.pathname;
  });
};
