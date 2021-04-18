//export const API_URL = 'http://177.44.248.32:8083'
export const API_URL = 'http://localhost:3003'

const token = window.localStorage.getItem('token');
const userLogged = window.localStorage.getItem('user');
const idUserLogged = window.localStorage.getItem('id');

export function STUDENT_GET(responsible_id) {
    let options = {
        url: API_URL + '/students',
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            }
        }
    };

    if (responsible_id !== undefined)
        options.url += "/responsible/"+responsible_id;

    return options;
}

export function STUDENT_POST(body) {
    return {
        url: API_URL + '/students',
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

export function STUDENT_SHOW(id) {
    return {
        url: API_URL + '/students/' + id,
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

export function STUDENT_PUT(id, body) {
    return {
        url: API_URL + '/students/'+ id,
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

export function STUDENT_DELETE(id) {
    return {
        url: API_URL + '/students/'+ id,
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