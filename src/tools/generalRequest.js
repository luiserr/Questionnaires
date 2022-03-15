import {api, post} from "../utils/ajax";

export const getUser = async () => {
  const response = await post(`${api}/tests/user`, {}, null);
  if (response.success) {
    return response.data;
  }
  return []
}