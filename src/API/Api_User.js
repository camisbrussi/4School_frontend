export const API_URL = 'http://177.44.248.32:8080'
//export const API_URL = 'http://localhost:3001'


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


export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + '/tokens/validate',
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}


export function USER_GET(token) {
  return {
    url: API_URL + '/users',
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_POST(body, token) {
  return {
    url: API_URL + '/users',
    body: JSON.stringify(body),
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_SHOW(id, token) {
  return {
    url: API_URL + '/users/'+id,
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_PUT(id, body, token) {
  return {
    url: API_URL + '/users/' +id,
    body: JSON.stringify(body),
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}
export function USER_DELETE(id, token) {
  return {
    url: API_URL + '/users/'+ id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}


//FAZER ROTA
export function PASSWORD_LOST(body) {
  return {
    url: API_URL + 'password/lost',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

//FAZER ROTA
export function PASSWORD_RESET(body) {
  return {
    url: API_URL + '/password/reset',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}