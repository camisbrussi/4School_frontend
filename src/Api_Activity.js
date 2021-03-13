export const API_URL = 'http://localhost:3002'

export function ACTIVITY_GET(token) {
  return {
    url: API_URL + '/activities',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
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

export function ACTIVITY_PUT(id, body, token) {
  return {
    url: API_URL + '/activities/'+ id,
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

export function ACTIVITY_DELETE(id, token) {
  return {
    url: API_URL + '/activities/'+ id,
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}
