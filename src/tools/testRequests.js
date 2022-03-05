import {api, get, post} from '../utils/ajax';
import {toast} from "../utils/alerts";

export const general = async (payload) => {
  const response = await post(`${api}/tests`, payload, 'POST', true);
  return response?.success ? response.data : null;
};

const validate = (payload) => {
  if (payload.title === '') {
    toast('Título requerido', false);
    return false;
  }
  if (payload.description === '') {
    toast('Descripción requerido', false);
    return false;
  }
  return true;
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
    if (validate(payload)) {
      if (payload.wasEdit) {
        result = await general(payload);
      }
      if (result) {
        if (test.id) {
          await setTest(result);
          await setStep(1);
          return true;
        }
        await navigation(`/admin/surveys/test/${result.id}`, {state: {step: 1, test: result}});
        return true;
      }
    }
  }
  if (step === 1) {
    setStep(2);
  }
  if (step === 2) {
    return finish
  }
};

export const findTest = async (testId) => {
  const response = await get(`${api}/tests/${testId}`, true);
  if (response && response?.success) {
    return response.data;
  }
  return {};
};

export const searchTest = async (page, perPage) => {
  const response = await post(`${api}/tests/list`, {page, perPage}, 'POST', true);
  if (response && response?.success) {
    return response.data;
  }
  return {}
};

export const deleteTest = async (testId) => {
  const response = await post(`${api}/test/${testId}`, {}, 'DELETE', true);
  if (response && response?.success) {
    return response.data;
  }
  return {}
};

export async function getSections(test) {
  const response = await get(`${api}/tests/${test.id}/sections`, true);
  if (response && response?.success) {
    return response.data;
  }
  return [];
}


export async function findSection(testId, sectionId) {
  const response = await get(`${api}/tests/${testId}/section/${sectionId}`, true);
  if (response && response?.success) {
    return response.data;
  }
  return [];
}

export async function deleteSection(testId, sectionId) {
  const response = await post(`${api}/tests/${testId}/section/${sectionId}/delete`, true, 'DELETE', true);
  if (response && response?.success) {
    return response.data;
  }
  return [];
}


export async function saveSection(testId, id, title, description, numberQuestions) {
  const payload = {
    id,
    title,
    description,
    numberQuestions
  };
  const response = await post(`${api}/tests/${testId}/section`, payload, null, true);
  if (response && response?.success) {
    return response.data;
  }
  return false;
}

export async function getQuestions(testId, sectionId) {
  const response = await get(`${api}/tests/${testId}/section/${sectionId}/questions`, true);
  if (response && response?.success) {
    return response.data;
  }
  return [];
}

export async function findQuestion(testId, sectionId, questionId) {
  const response = await get(`${api}/tests/${testId}/section/${sectionId}/question/${questionId}`, true);
  if (response && response?.success) {
    return response.data;
  }
  return [];
}

export async function saveQuestion(testId, sectionId, payload) {
  const response = await post(`${api}/tests/${testId}/section/${sectionId}/question`, payload, null, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function deleteQuestion(testId, sectionId, questionId) {
  const response = await post(`${api}/tests/${testId}/section/${sectionId}/question/${questionId}/delete`, {}, 'DELETE', true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function finishTest(testId) {
  const response = await post(`${api}/tests/commit`, {testId}, null, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function getQuestionBank(title, type, page = 1, perPage = 10) {
  const payload = {
    title,
    type,
    page,
    perPage
  };
  const response = await post(`${api}/tests/question/bank`, payload, null, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function addQuestionBank(questionId, sectionId) {
  const payload = {
    questionId,
    sectionId
  };
  const response = await post(`${api}/tests/newQuestion/bank`, payload, null, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}