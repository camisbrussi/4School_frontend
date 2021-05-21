export const API_URL = 'http://177.44.248.32:8083'
//export const API_URL = 'http://localhost:3003'

const token = window.localStorage.getItem('token');
const userLogged = window.localStorage.getItem('user');
const idUserLogged = window.localStorage.getItem('id');

export function CITY_GET() {
  return {
      url: API_URL + '/address',
      options: {
          headers: {
              Authorization: 'Bearer ' + token,
              UserLogged: userLogged,
              idUserLogged: idUserLogged
          },
      },
  };
}

export function ADDRESS_POST(body) {
  return {
      url: API_URL + '/address',
      body: JSON.stringify(body),
      options: {
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
              UserLogged: userLogged,
              idUserLogged: idUserLogged
          },
      },
  };
}

export function ADDRESS_SHOW(id) {
  return {
      url: API_URL + '/address/' + id,
      options: {
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
              UserLogged: userLogged,
              idUserLogged: idUserLogged
          },
      },
  };
}





