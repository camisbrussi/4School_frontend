export const API_URL = 'http://localhost:3002'
const token = window.localStorage.getItem('token');

export function ACTIVITY_GET() {

  return {
    url: API_URL + '/activities',
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function ACTIVITY_POST(body) {
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

export function ACTIVITY_SHOW(id) {
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

export function ACTIVITY_PUT(id, body) {
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

export function ACTIVITY_DELETE(id) {
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
