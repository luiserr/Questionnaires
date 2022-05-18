import {toast} from "../alerts";

export function validatePayload(payload) {

  if(payload?.startDateAssigmentInput){
    if(!payload?.finishDateAssigmentInput) {
      toast('Debe ingresar la fecha fin del periodo de asignación', false);
      return false;
    }
  }

  if(payload?.finishDateAssigmentInput){
    if(!payload?.startDateAssigmentInput) {
      toast('Debe ingresar la fecha inicio del periodo de asignación', false);
      return false;
    }
  }

  if(payload?.startDateAssigmentInput > payload?.finishDateAssigmentInput) {
    toast('La fecha inicio del periodo de asignación no puede ser mayor a la fecha fin', false);
    return false;
  }

  if(payload?.startDateAnswerInput){
    if(!payload?.finishDateAnswerInput) {
      toast('Debe ingresar la fecha fin de respuestas', false);
      return false;
    }
  }

  if(payload?.finishDateAnswerInput){
    if(!payload?.startDateAnswerInput) {
      toast('Debe ingresar la fecha inicio de respuestas', false);
      return false;
    }
  }
  
  if(payload?.startDateAnswerInput > payload?.finishDateAnswerInput) {
    toast('La fecha inicio de respuestas no puede ser mayor a la fecha fin', false);
    return false;
  }

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
    toast('Debe seleccionar al menos una opción de filtro', false);
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