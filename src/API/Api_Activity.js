// export const API_URL = 'http://177.44.248.32:8082'
export const API_URL = 'http://localhost:3002';

const token = window.localStorage.getItem('token');
const userLogged = window.localStorage.getItem('user');
const idUserLogged = window.localStorage.getItem('id');

export function ACTIVITY_GET(userLogged) {
  return {
    url: API_URL + '/activities',
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}

export function ACTIVITY_POST(body, userLogged) {
  return {
    url: API_URL + '/activities',
    body: JSON.stringify(body),
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}

export function ACTIVITY_SHOW(id, userLogged) {
  return {
    url: API_URL + '/activities/' + id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}

export function ACTIVITY_PUT(id, body, userLogged) {
  return {
    url: API_URL + '/activities/' + id,
    body: JSON.stringify(body),
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}

export function ACTIVITY_DELETE(id, userLogged) {
  return {
    url: API_URL + '/activities/' + id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}

export function ACTIVITY_GET_PARTICIPANTS(id, userLogged) {
  return {
    url: API_URL + '/activities/participants/' + id,
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}

export function ACTIVITY_GET_TEACHERS(id, userLogged) {
  return {
    url: API_URL + '/activities/participants/teachers/' + id,
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}

export function ACTIVITY_POST_PARTICIPANT(activity_id, body, userLogged) {
  return {
    url: API_URL + '/activities/addparticipants/' + activity_id,
    body: JSON.stringify(body),
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}

export function ACTIVITY_DELETE_SUBSCRIPTION(id, userLogged) {
  return {
    url: API_URL + '/activities/subscription/' + id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}

export function PARTICIPANT_GET_ACTIVITIES(userLogged) {
  return {
    url: API_URL + '/activities/subscriptions/' + userLogged.id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}


export function PARTICIPANT_GET_ACTIVITIES_FILTER(body, userLogged) {
  return {
    url: API_URL + '/activities/filter/subscription' + userLogged.id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
      params: body,
    },
  };
}

export function VACANCIES_AVAILABLE(id, userLogged) {
  return {
    url: API_URL + '/activities/vacanciesavailable/' + id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}

export function CONFIRM_SUBSCRIPTION(id, body, userLogged) {
  return {
    url: API_URL + '/activities/confirmsubscription/' + id,
    body: JSON.stringify(body),
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: userLogged,
      },
    },
  };
}
