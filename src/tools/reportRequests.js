import {api, get, post, local} from '../utils/ajax';

export const getSurveyAssigment = async (testId, presentationId) => {
  const response = await get(`${api}/tests/${testId}/presentation/${presentationId}/survey`, true);
  if (response.success) {
    return response.data;
  }
  return {}
};

export async function createReport(payload) {
  const response = await post(`${api}/tests/report`, payload, null, true, true);
  if (response && response?.success) {
    return response.data;
  }
  return false;
}