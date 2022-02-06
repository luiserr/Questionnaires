import {api, get, local, post} from "../utils/ajax";

export async function getPresentation(testId, presentationId) {
  const response = await get(`${api}/tests/${testId}/presentation/${presentationId}`, true);
  if (response && response?.success) {
    return response.data;
  }
  return [];
}

export async function initPresentation(payload) {
  const response = await post(`${api}/tests/presentation`, payload, null, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function getQuestions(testId, presentationId) {
  const response = await get(`${api}/tests/${testId}/presentation/${presentationId}/questions`, true);
  if (response && response?.success) {
    return response.data;
  }
  return [];
}