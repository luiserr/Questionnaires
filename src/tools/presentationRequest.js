import {api, get, local, post} from "../utils/ajax";

export async function getPresentation(token) {
  const response = await post(`${local}/tests/assignment`, {_token: token}, null, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function initPresentation(payload) {
  const response = await post(`${api}/tests/presentation`, payload, null, true, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function getQuestions(testId, presentationId) {
  const response = await get(
    `${api}/tests/${testId}/presentation/${presentationId}/questions?_token=${sessionStorage.getItem('_token')}`,
    true);
  if (response && response?.success) {
    return response.data;
  }
  return [];
}

export async function saveAnswer(testId, presentationId, tryId, questionId, sectionId, answers) {
  const payload = {
    sectionId,
    questionId,
    tryId,
    answers,
    _token: sessionStorage.getItem('_token')
  };
  const response = await post(`${api}/tests/${testId}/presentation/${presentationId}/answer`, payload, null, true, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function finishPresentation() {
  const response = await post(`${api}/tests/presentation/finish`, {_token: sessionStorage.getItem('_token')}, null, true, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function resetPresentation() {
  const response = await post(`${api}/tests/presentation/reset`, {_token: sessionStorage.getItem('_token')}, null, true, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}
