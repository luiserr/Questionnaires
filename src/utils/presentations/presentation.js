import {toast} from "../alerts";

export function validatePayload(payload) {
  const today = new Date();
  if (payload.title === '') {
    toast('Titulo requerido', false)
    return false;
  }
  if (payload.tries < 0 || isNaN(payload.tries)) {
    toast('Numero de intentos invalidos', false)
    return false;
  }
  if (payload.complementaryDays < 0 || isNaN(payload.complementaryDays)) {
    toast('La cantidad de dias para fichas títuladas es invalida', false)
    return false;
  }
  if (!payload.startDateInput || !payload.finishDateInput) {
    toast('Digite las fechas', false)
    return false;
  }
  if (payload.startDateInput < today) {
    toast('Fecha de inicio invalida', false);
    return false;
  }
  if (payload.finishDateInput < today) {
    toast('Fecha de fin invalida', false);
    return false;
  }
  if (payload.startDateInput > payload.finishDateInput) {
    toast('Fechas de asignación invalidas', false)
    return false;
  }
  //validar roles
  const hasRoles = payload?.roles?.length > 0;
  const hasRegionals = payload?.regionals?.regionals !== null && payload?.regionals?.regionals?.length > 0;
  const hasCenters = payload?.regionals?.centers !== null && payload?.regionals?.centers?.length > 0;
  const hasPrograms = payload?.programs?.programs !== null && payload?.programs?.programs?.length > 0;
  const hasEmails = payload?.emails.length > 0;

  const keys = hasKeys(payload);

  if (keys.hasEmails) {
    for (let i = 0; i < payload.emails.length; i++) {
      if (payload.emails[i].name === '' || payload.emails[i].email === '') {
        toast('Los campos en la asignacion por correo electronico son requeridos');
        return false;
      }
    }
  }

  if (!keys.hasRoles && !keys.hasRegionals && !keys.hasCenters && !keys.hasPrograms && !keys.hasEmails) {
    toast('Debe seleccionar al menos un metodo de asignación');
    return false;
  }
  return true
}

function hasKeys(payload) {
  return {
    hasRoles: payload?.roles?.length > 0,
    hasRegionals: payload?.regionals?.regionals !== null && payload?.regionals?.regionals?.length > 0,
    hasCenters: payload?.regionals?.centers !== null && payload?.regionals?.centers?.length > 0,
    hasPrograms: payload?.programs?.programs !== null && payload?.programs?.programs?.length > 0,
    hasEmails: payload?.emails?.length > 0,
  }
}

export function buildPayload(test, presentationId, payload) {
  const keys = hasKeys(payload);
  const data = {
    id: presentationId !== '_' ? presentationId : null,
    testId: test.id,
    title: payload.title,
    tries: payload.tries,
    startDate: payload.startDate,
    finishDate: payload.finishDate,
    complementaryDays: payload.complementaryDays,
    abilityDays: payload.abilityDays,
    presentationType: 'survey',
    assignments: {}
  }
  if (keys.hasRoles) {
    data.assignments['roles'] = payload.roles;
  }
  if (keys.hasRegionals || keys.hasCenters) {
    data.assignments['regionals'] = payload.regionals;
  }
  if (keys.hasPrograms) {
    data.assignments['programs'] = payload.programs;
  }
  if (keys.hasEmails) {
    data.assignments['emails'] = payload.emails;
  }
  return data;
}