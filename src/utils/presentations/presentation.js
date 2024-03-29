import {toast} from "../alerts";

export function validatePayload(payload) {
  const today = new Date();
  if (payload.presentationTitle === '') {
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
        toast('Los campos en la asignación por correo electrónico son requeridos');
        return false;
      }
    }
  }

  if (
    !keys.hasRoles
    && !keys.hasRegionals
    && !keys.hasCenters
    && !keys.hasPrograms
    && !keys.hasEmails
    && !keys.hasGroups
    && !keys.hasDate
    && !keys.hasUsers
  ) {
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
    hasGroups: payload?.groups?.groups !== null && payload?.groups?.groups?.length > 0,
    hasDate: payload?.dates?.startDate && payload?.dates?.finishDate,
    hasUsers: payload?.users?.length > 0
  }
}

export function buildPayload(test, presentationId, payload) {
  const keys = hasKeys(payload);
  const data = {
    id: presentationId !== '_' ? presentationId : null,
    testId: test.id,
    title: payload.presentationTitle,
    tries: payload.tries,
    startDate: payload.startDate,
    finishDate: payload.finishDate,
    complementaryDays: payload.complementaryDays,
    abilityDays: payload.abilityDays,
    presentationType: 'survey',
    assignments: {},
    notify: payload.notify,
    anonymous: payload.anonymous,
    notifyUncompleted: payload.notifyUncompleted
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
  if (keys.hasGroups) {
    data.assignments['groups'] = payload.groups;
  }
  if (keys.hasDate) {
    data.assignments['dates'] = payload.dates;
  }
  if (keys.hasUsers) {
    data.assignments['users'] = payload.users;
  }
  return data;
}