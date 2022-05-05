import {toast} from "../alerts";

export function validatePayload(payload) {

  const keys = hasKeys(payload);

  if (
    !keys.hasRoles && 
    !keys.hasModalities && 
    !keys.hasCourseTypes && 
    !keys.hasRegionals && 
    !keys.hasCenters && 
    !keys.hasPrograms && 
    !keys.hasGroups && 
    !keys.hasDateAssigment && 
    !keys.hasDateAnswer 
  ) {
    toast('Debe seleccionar alguna de las opciones de filtro', false);
    return false;
  }
  return true
}

function hasKeys(payload) {
  return {
    hasRoles: payload?.roles?.length > 0,
    hasModalities: payload?.modalities?.length > 0,
    hasCourseTypes: payload?.courseTypes?.length > 0,
    hasRegionals: payload?.regionals?.length > 0,
    hasCenters: payload?.centers?.length > 0,
    hasPrograms: payload?.programs?.length > 0,
    hasGroups: payload?.groups?.length > 0,
    hasDateAssigment: payload?.startDateAssigmentInput 
    && payload?.finishDateAssigmentInput 
    && payload?.startDateAssigmentInput <= payload?.finishDateAssigmentInput
    ,
    hasDateAnswer: payload?.startDateAnswerInput 
    && payload?.finishDateAnswerInput 
    && payload?.startDateAnswerInput <= payload?.finishDateAnswerInput
  }
}