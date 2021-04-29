//export const API_URL = 'http://177.44.248.32:8090'
export const API_URL = 'http://localhost:3010'

const token = window.localStorage.getItem('token');

export function ERROR_GET() {
  return {
    url: API_URL + '/errors',
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function INFO_GET() {
  return {
    url: API_URL + '/infos',
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function ERROR_SHOW(arquive) {
  return {
    url: API_URL + '/errors/show/' + arquive,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function INFO_SHOW(arquive) {
  return {
    url: API_URL + '/infos/show/' + arquive,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}
  export function INFO_FILTER(body) {
    return {
      url: API_URL + '/infos/filter',
      body: JSON.stringify(body),
      options: {
        headers: {
          'Content-Type': 'application/json',
        },     
      },
    };
  }

  export function ERROR_FILTER(body) {

    return {
      url: API_URL + '/errors/filter',
      body: JSON.stringify(body),
      options: {
        headers: {
          'Content-Type': 'application/json',
        },     
      },
    };
  }

