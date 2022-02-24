import {api, get, post, local} from '../utils/ajax';

export const getTypeAssign = async () => {
  const response = await get(`${api}/assignQuestionnaires/TypeAssign`, true);
  if (response.success) {
    return response.data;
  }
  return {}
};

export const getRoles = async () => {
  const response = await get(`${api}/assignQuestionnaires/roles`, true);
  if (response.success) {
    return response.data;
  }
  return []
}

export const getRegionals = async () => {
  const response = await get(`${api}/assignQuestionnaires/regionals`, true);
  if (response.success) {
    return response.data;
  }
  return []
}

export const getAssets = async (entity) => {
  const response = await get(`${api}/assignQuestionnaires/${entity}`, true);
  if (response.success) {
    return response.data;
  }
  return []
}

export const getGroups = async (codes) => {
  const response = await post(`${api}/assignQuestionnaires/programs/groups`, {codes}, null, true);
  if (response.success) {
    return response.data;
  }
  return []
}

export async function saveAssign(testId, payload) {
  const response = await post(`${local}/tests/${testId}/presentation`, payload, null, true);
  if (response && response?.success) {
    return response.data;
  }
  return false;
}