export const API_URL = 'http://localhost:3001'


export function TOKEN_POST(body) {
  
  return {
    url: API_URL + '/tokens',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + '/tokens/validate',
    options: {
      method: 'GET',
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
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_POST(body, token) {
  return {
    url: API_URL + '/users',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_SHOW(id, token) {
  return {
    url: API_URL + '/users/' + id,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_PUT(id, body, token) {
  return {
    url: API_URL + '/users/'+ id,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}
export function USER_DELETE(id, token) {
  return {
    url: API_URL + '/users/'+ id,
    options: {
      method: 'DELETE',
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

export function ACTIVITY_POST(body, token) {
  return {
    url: API_URL + '/activities',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}
