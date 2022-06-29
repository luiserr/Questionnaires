import {api, get, post, local} from '../utils/ajax';

export const getSurveyAssigment = async (testId, presentationId) => {
  const response = await get(`${api}/tests/${testId}/presentation/${presentationId}/survey`, true);
  if (response.success) {
    return response.data;
  }
  return {}
};

export async function createReport(payload) {
  //const response = await post(`${api}/tests/report`, payload, null, true, true);
  const response = await post(`${api}/tests/cronreport`, payload, null, true, true);
  if (response && response?.success) {
    return response.data;
  }
  return false;
}

export const getReports = async () => {
  const response = await get(`${api}/tests/reports`, true);
  if (response.success) {
    return response.data;
  }
  return {}
};

export const searchReports = async (page, perPage) => {
  const response = await post(`${api}/tests/reports`, {page, perPage}, 'POST', true);
  if (response && response?.success) {
    return response.data;
  }
  return {}
};