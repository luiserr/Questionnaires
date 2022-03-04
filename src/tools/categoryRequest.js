import {api, post} from "../utils/ajax";

export const getCategories = async (name = null) => {
  const response = await post(`${api}/tests/categories`, {name}, null, true);
  if (response.success) {
    return response.data;
  }
  return []
}

export const attachCategory = async (testId, categoryId, attach) => {
  const payload = {
    testId,
    categoryId,
    attach
  }
  const response = await post(`${api}/tests/category/attach`, payload, null, true);
  if (response.success) {
    return response.data;
  }
  return []
}
export const saveCategory = async (categoryId, name, description) => {
  const payload = {
    categoryId,
    name,
    description
  };
  const response = await post(`${api}/tests/category`, payload, null, true);
  if (response.success) {
    return response.data;
  }
  return []
}
export const deleteCategory = async (categoryId) => {
  const response = await post(`${api}/tests/category/${categoryId}`, {}, 'DELETE', true);
  if (response.success) {
    return response.data;
  }
  return []
}