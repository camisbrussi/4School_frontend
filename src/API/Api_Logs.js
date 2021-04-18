//export const API_URL = 'http://177.44.248.32:8090'
export const API_URL = 'http://localhost:3010'

const token = window.localStorage.getItem('token');

export function ERROR_GET() {
  return {
    url: API_URL + '/error',
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
    url: API_URL + '/info',
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}
