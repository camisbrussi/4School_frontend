// export const API_URL = 'http://177.44.248.32:8085'
 export const API_URL = 'http://localhost:3020'

const token = window.localStorage.getItem('token');
const userLogged = window.localStorage.getItem('user');
const idUserLogged = window.localStorage.getItem('id');


export function SENDMAIL_GET() {
    return {
        url: API_URL + '/sendmail',
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            },
        },
    };
}

export function PARTICIPANT_GET_ACTIVITIES_FILTER(body) {
    return {
      url: API_URL + '/sendmail' + idUserLogged,
      options: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          UserLogged: userLogged,
          idUserLogged: idUserLogged,
        },
        params: body,
      },
    };
  }

export function ACTIVITY_FILTER(body) {
    return {
        url: API_URL + '/sendmail',
        //body: JSON.stringify(body),
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            },
            params: body
        },
    };
  }

export function SENDMAIL_POST(body) {
    return {
        url: API_URL + '/sendmail',
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

export function SENDMAIL_SHOW(id) {
    return {
        url: API_URL + '/sendmail/' + id,
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

export function SENDMAIL_PUT(id, body) {
    return {
        url: API_URL + '/sendmail/' + id,
        body: JSON.stringify(body),
        options: {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            },
        },
    };
}

export function SENDMAIL_DELETE(id) {
    return {
        url: API_URL + '/sendmail/' + id,
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

export function SENDMAIL_POST_STUDENTS(sendmail_id, body) {
    return {
        url: API_URL + '/sendmail/addstudents/' + sendmail_id,
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

export function SENDMAIL_GET_STUDENTS(sendmail_id) {
    return {
        url: API_URL + '/sendmail/sendmail/' + sendmail_id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            }
        },
    };
}



export function SENDMAIL_POST_TEAMS(sendmail_id, body) {
    return {
        url: API_URL + '/sendmail/addteams/' + sendmail_id,
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

export function SENDMAIL_GET_TEAMS(sendmail_id) {
    return {
        url: API_URL + '/sendmail/teams/' + sendmail_id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            }
        },
    };
}





export function SENDMAIL_FILTER(body) {
    return {
        url: API_URL + '/sendmail/filter/sendmail',
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            },
            params: body
        },
    };
}

export function SENDMAIL_FILTER_TEAMS(id, body) {
    return {
        url: API_URL + '/sendmail/filterteams/'+id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            },
            params: body
        },
    };
}