export const API_URL = 'http://177.44.248.32:8082'
//export const API_URL = 'http://localhost:3002';

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

export function ACTIVITY_POST(body, userLogged, token) {
  return {
    url: API_URL + '/activities',
    body: JSON.stringify(body),
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: JSON.stringify(userLogged),
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

export function ACTIVITY_PUT(id, body, userLogged, token) {
  return {
    url: API_URL + '/activities/' + id,
    body: JSON.stringify(body),
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: JSON.stringify(userLogged),
      },
    },
  };
}

export function ACTIVITY_DELETE(id, userLogged, token) {
  return {
    url: API_URL + '/activities/' + id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: JSON.stringify(userLogged),
      },
    },
  };
}

export function ACTIVITY_GET_PARTICIPANTS(id, token) {
  return {
    url: API_URL + '/activities/participants/' + id,
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function ACTIVITY_GET_TEACHERS(id, token) {
  return {
    url: API_URL + '/activities/participants/teachers/' + id,
    options: {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function ACTIVITY_POST_PARTICIPANT(activity_id, body, userLogged, token) {
  return {
    url: API_URL + '/activities/addparticipants/' + activity_id,
    body: JSON.stringify(body),
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: JSON.stringify(userLogged),
      },
    },
  };
}

export function ACTIVITY_DELETE_SUBSCRIPTION(id, userLogged, token) {
  return {
    url: API_URL + '/activities/subscription/' + id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: JSON.stringify(userLogged),
      },
    },
  };
}

export function PARTICIPANT_GET_ACTIVITIES(userLogged, token) {
  console.log(userLogged);
  return {
    url: API_URL + '/activities/subscriptions/' + userLogged.id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}


export function PARTICIPANT_GET_ACTIVITIES_FILTER(body, userLogged, token) {
  return {
    url: API_URL + '/activities/filter/subscription' + userLogged.id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      params: body,
    },
  };
}

export function VACANCIES_AVAILABLE(id, token) {
  return {
    url: API_URL + '/activities/vacanciesavailable/' + id,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function CONFIRM_SUBSCRIPTION(id, body, userLogged, token) {
  return {
    url: API_URL + '/activities/confirmsubscription/' + id,
    body: JSON.stringify(body),
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        UserLogged: JSON.stringify(userLogged),
      },
    },
  };
}
