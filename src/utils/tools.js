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

export function utf8Decode(utftext) {
  let string = "";
  let i = 0;
  let c, c1, c2, c3;
  c = c1 = c2 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }

  }

  return string;
}
