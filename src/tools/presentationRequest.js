import {get, local} from "../utils/ajax";

export async function getPresentation(testId, presentationId) {
  const response = await get(`${local}/tests/${testId}/presentation/${presentationId}`, true);
  if (response && response?.success) {
    return response.data;
  }
  return [];
}