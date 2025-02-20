const API_DOMAIN = "https://localhost:7024/";

// get
export const getAll = async (path) => {
  const res = await fetch(API_DOMAIN + path);
  const result = await res.json();
  return result;
};
// Thêm sản phẩm
export const add = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};
