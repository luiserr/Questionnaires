import {api, get, post} from '../utils/ajax';
import {toast} from "../utils/alerts";

export const general = async (payload) => {
  const response = await post(`${api}/tests`, {
    ...payload,
    description: window.description,
  }, 'POST', true, true);
  return response?.success ? response.data : null;
};

const validate = (payload) => {
  if (payload.title === '') {
    toast('Título requerido', false);
    return false;
  }
  if (window.description === '' || window.description === '<p></p>') {
    toast('Descripción requerida', false);
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
      if (payload.wasEdit || window.description !== test.description) {
        result = await general(payload);
        if (result) {
          if (payload.id) {
            toast('Encuesta actualizada con éxito', true);
            setTimeout(() => {
              setStep(1);
              setTest(result);
            }, 3000);
          } else {
            toast('Encuesta creada en borrador', true);
            setTimeout(() => {
              navigation(`/admin/surveys/test/${result.id}`, {state: {step: 1, test: result}});
            }, 3000);
          }
        }
      } else {
        await setStep(1);
        await setTest(result);
      }
    }
  }
  if (step === 1) {
    setStep(2);
  }
  if (step === 2) {
    setStep(3);
  }
  if (step === 3) {
    return finish(test);
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
  const response = await post(`${api}/test/${testId}`, {}, 'DELETE', true, true);
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
  const response = await post(`${api}/tests/${testId}/section/${sectionId}/delete`, true, 'DELETE', true, true);
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
  const response = await post(`${api}/tests/${testId}/section`, payload, null, true, true);
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
  const response = await post(`${api}/tests/${testId}/section/${sectionId}/question`, payload, null, true, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function deleteQuestion(testId, sectionId, questionId) {
  const response = await post(`${api}/tests/${testId}/section/${sectionId}/question/${questionId}/delete`, {}, 'DELETE', true, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function finishTest(testId) {
  const response = await post(`${api}/tests/commit`, {testId}, null, true, true);
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
  const response = await post(`${api}/tests/newQuestion/bank`, payload, null, true, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function getDependencies(questionId, sectionId, testId) {
  const payload = {
    questionId,
    sectionId,
    testId
  };
  const response = await post(`${api}/tests/conditionals`, payload, null);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function addDependency(
  questionId,
  sectionId,
  testId,
  dependsOfSection,
  dependsOfQuestion,
  dependsOperator,
  answerId
) {
  const payload = {
    questionId,
    dependsOfSection,
    dependsOperator,
    dependsOfQuestion,
    answerId
  };
  const response = await post(`${api}/tests/${testId}/section/${sectionId}/conditional`, payload, null, true, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function deleteDependency(questionId, sectionId, testId,) {
  const payload = {
    questionId
  };
  const response = await post(`${api}/tests/${testId}/section/${sectionId}/conditional/delete`, payload, 'DELETE', true, true);
  if (response && response?.success) {
    return response.data;
  }
  return null;
}

export async function preview(testId) {
  const response = await get(`${api}/tests/${testId}/preview`, true);
  if (response && response?.success) {
    return response.data;
  }
  return [];
}
