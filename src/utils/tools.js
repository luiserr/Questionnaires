export function $_get() {
  let params = {};
  const url = document.location.toString();
  if (url.indexOf('?') !== -1) {
    const query = url
      .replace(/^.*?\?/, '')
      .replace(/#.*$/, '')
      .split('&');
    for (let i = 0, l = query.length; i < l; i++) {
      let aux = query[i].split('=', 2);
      params[aux[0]] = aux[1];
    }
  }
  return params;
}

export function getDomain(split) {
  const locationSplit = document.location.href.split(split);
  const host = locationSplit[0];
  return host ? host : 'https://sena.pruebas.local.la/';
}

export function isEmptyObject(obj) {
  return obj // 👈 null and undefined check
  && Object.keys(obj).length === 0
  && Object.getPrototypeOf(obj) === Object.prototype
}

export function isArray(object) {
  return object.constructor === [].constructor;
}
