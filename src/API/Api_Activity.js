export const API_URL = 'http://177.44.248.32:8082'
// export const API_URL = 'http://localhost:3002'


export function ACTIVITY_GET(token) {

  return {
    url: API_URL + '/activities',
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function ACTIVITY_POST(body, token) {
  return {
    url: API_URL + '/activities',
    body: JSON.stringify(body),
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function ACTIVITY_SHOW(id, token) {
  return {
    url: API_URL + '/activities/' + id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function ACTIVITY_PUT(id, body, token) {
  return {
    url: API_URL + '/activities/'+ id,
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

export function ACTIVITY_DELETE(id, token) {
  return {
    url: API_URL + '/activities/'+ id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}
