import { getAll } from "../utils/request";

export const getCoHort = async () => {
  const result = await getAll("get-all-cohort");
  return result;
};

// Thêm sản phẩm
export const addProduct = async (options) => {
  const result = await add("products", options);
  return result;
};
