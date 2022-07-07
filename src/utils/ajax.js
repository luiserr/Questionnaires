import {getDomain} from './tools';
import {loading, toast} from './alerts';

const domain = getDomain('tests');
const prefixGradeCenter = 'gradeCenter';
export const dev = 'https://sena.dev.tests.mx/api';
export const test = 'https://sena.pruebas.territorio.la/api';
export const staging = 'https://sena.tests.mx/api';
export const prod = 'https://sena.territorio.la/api';
// export const local = 'http://sena.localhost:8000/api';
// export const local = 'https://sena.pruebas.la/api';
export const local = 'https://sena.pruebas.local/api';
//comentar para hacer pruebas en local
// export const api =  `${domain}api`;
export const api = staging;

const myHeaders = new Headers();

myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Request-Headers", "*");
myHeaders.append("Access-Control-Request-Method", "*");


/**
 *
 * @param url
 * @param replaceAPI
 * @param showMessage
 * @returns {Promise<any|null>}
 */
export const get = async (url, replaceAPI = false, showMessage = false) => {
  loading();
  // const urlAPI = replaceAPI ? url : `${api}/${prefix}/${url}`;
  const urlAPI = replaceAPI ? url : `${api}/`;
  try {
    const response = await fetch(urlAPI);
    loading(false);
    const data = await response.json();
    if (showMessage) {
      toast(data.message, data.success);
    }
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
 * @param showMessage
 * @returns {Promise<*>}
 */
export const post = async (url, payload = {}, method = 'POST', replaceAPI = true, showMessage = false) => {
  const body = JSON.stringify(payload);
  loading();
  // const urlAPI = replaceAPI ? url : `${api}/${prefix}/${url}`;
  const urlAPI = replaceAPI ? url : `${api}/`;
  const options = {
    headers: myHeaders,
    method: method ? method : 'POST',
    body
  };
  try {
    const response = await fetch(urlAPI, options);
    const data = await response.json();
    loading(false);
    if (showMessage) {
      toast(data.message, data.success);
    }
    return await data;
  } catch (e) {
    toast('Error al realizar la consulta', false);
    console.log('Error al consultar', e);
    return null;
  }
};
