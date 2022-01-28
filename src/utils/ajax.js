import {getDomain} from './tools';
import {toast, loading} from './alerts';

const domain = getDomain('tests');
const prefixGradeCenter = 'gradeCenter';
export const dev = 'https://sena.dev.tests.mx/api';
// export const local = 'https://sena.pruebas.la/api';
export const local = 'https://sena.pruebas.local.la/api';
//comentar para hacer pruebas en local
// export const api =  `${domain}api`;
export const api = dev;

const myHeaders = new Headers();

myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Request-Headers", "*");
myHeaders.append("Access-Control-Request-Method", "*");


export const get = async (url, replaceAPI = false, prefix = prefixGradeCenter) => {
  loading();
  const urlAPI = replaceAPI ? url : `${api}/${prefix}/${url}`;
  try {
    const response = await fetch(urlAPI);
    const data = await response.json();
    toast(data.message, data.success);
    return data ?? null;
  } catch (e) {
    toast('Error al realizar la consulta', false);
    console.log('Error al consultar', e);
    return null;
  }
};


/**
 *
 * @param url:string
 * @param payload: JSON
 * @param method: string
 * @param replaceAPI
 * @param prefix
 * @returns {Promise<*>}
 */
export const post = async (url, payload = {}, method = 'POST', replaceAPI = false, prefix = prefixGradeCenter) => {
  const body = JSON.stringify(payload);
  loading();
  const urlAPI = replaceAPI ? url : `${api}/${prefix}/${url}`;
  const options = {
    headers: myHeaders,
    method: method ? method : 'POST',
    body
  };
  try {
    const response = await fetch(urlAPI, options);
    const data = await response.json();
    toast(data.message, data.success);
    return await data;
  } catch (e) {
    toast('Error al realizar la consulta', false);
    console.log('Error al consultar', e);
    return null;
  }
};
