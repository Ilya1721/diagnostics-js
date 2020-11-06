const { Buffer } = require("buffer");

export const getImgBuffer = (base64) => {
  const base64str = base64.replace(/data:image\/\w+;base64,/, "");
  return Buffer.from(base64str, "base64");
};
