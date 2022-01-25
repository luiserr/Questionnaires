import {api, get, local, post} from '../utils/ajax';

const general = async (payload) => {
  const response = await post(`${api}/tests`, payload, 'POST', true);
  return response.success ? response.data : null;
};

const question = (test) => {
  return true;
};

const finish = (test) => {
  return true;
};

export const handleSave = async (step, test, payload, setTest, setStep, navigation) => {
  let result = test;
  if (step === 0) {
    if (payload.wasEdit) {
      result = await general(payload);
    }
    if (result) {
      if (test.id) {
        await setTest(result);
        await setStep(1);
        return true;
      }
      await navigation(`/test/${result.id}`, {state: {step: 1, test: result}});
      return true;
    }
  }
  if (step === 1) {
    return question(test);
  }
  if (step === 2) {
    return finish
  }
};

export const findTest = async (testId) => {
  const response = await get(`${api}/tests/${testId}`, true);
  if (response.success) {
    return response.data;
  }
  return {};
};

export const searchTest = async () => {
  const response = await post(`${api}/tests/list`, {}, 'POST', true);
  if (response.success) {
    return response.data;
  }
  return {}
};

export async function getSections(test) {
  const response = await get(`${local}/tests/${test.id}/sections`, true);
  if (response.success) {
    return response.data;
  }
  return [];
}


export async function findSection(testId, sectionId) {
  const response = await get(`${local}/tests/${testId}/section/${sectionId}`, true);
  if (response.success) {
    return response.data;
  }
  return [];
}

export async function saveSection(testId, section, title, description, numberQuestions) {
  const payload = {
    id: section?.id || null,
    title,
    description,
    numberQuestions
  };

  const response = await post(`${api}/tests/${testId}/section`, payload, null, true);
  if (response.success) {
    return response.data;
  }
  return false;
}

export async function getQuestions(testId, sectionId) {
  const response = await get(`${local}/tests/${testId}/section/${sectionId}/questions`, true);
  if (response.success) {
    return response.data;
  }
  return [];
}

export async function saveQuestion(testId, sectionId, payload)
{
  return true;
}