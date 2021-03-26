export const API_URL = 'http://177.44.248.32:8084'
//export const API_URL = 'http://localhost:3004'


export function TEAM_GET(token) {

  return {
    url: API_URL + '/teams',
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function TEAM_POST(body, token) {
  return {
    url: API_URL + '/teams',
    body: JSON.stringify(body),
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function TEAM_SHOW(id, token) {
  return {
    url: API_URL + '/teams/' + id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function TEAM_PUT(id, body, token) {
  return {
    url: API_URL + '/teams/'+ id,
    body: JSON.stringify(body),
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function TEAM_DELETE(id, token) {
  return {
    url: API_URL + '/teams/'+ id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}
