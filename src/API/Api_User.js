// export const API_URL = 'http://177.44.248.32:8081'
export const API_URL = 'http://localhost:3001';

const token = window.localStorage.getItem('token');

export function TOKEN_POST(body) {
  return {
    url: API_URL + '/tokens',
    body: JSON.stringify(body),
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function USER_GET(userLogged, idUserLogged) {
  return {
    url: API_URL + '/users',
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
        idUserLogged: idUserLogged,
      },
    },
  };
}

export function USER_POST(body, userLogged, idUserLogged) {
  return {
    url: API_URL + '/users',
    body: JSON.stringify(body),
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
        idUserLogged: idUserLogged,
      },
    },
  };
}

export function USER_SHOW(id, userLogged, idUserLogged) {
  return {
    url: API_URL + '/users/' + id,
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
        idUserLogged: idUserLogged,
      },
    },
  };
}

export function USER_PUT(id, body, userLogged, idUserLogged) {
  return {
    url: API_URL + '/users/' + id,
    body: JSON.stringify(body),
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
        idUserLogged: idUserLogged,
      },
    },
  };
}

export function USER_DELETE(id, userLogged, idUserLogged) {
  return {
    url: API_URL + '/users/' + id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
        idUserLogged: idUserLogged,
      },
    },
  };
}

export function USER_LOGGED(token) {
  return {
    url: API_URL + '/tokens/validate',
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}
