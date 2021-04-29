export const API_URL = 'http://177.44.248.32:8083'
// export const API_URL = 'http://localhost:3003'

const token = window.localStorage.getItem('token');
const userLogged = window.localStorage.getItem('user');
const idUserLogged = window.localStorage.getItem('id');

export function RESPONSIBLE_GET() {
    return {
        url: API_URL + '/responsibles',
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            },
        },
    };
}

export function RESPONSIBLE_POST(body) {
    return {
        url: API_URL + '/responsibles',
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

export function RESPONSIBLE_SHOW(id) {
    return {
        url: API_URL + '/responsibles/' + id,
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

export function RESPONSIBLE_PUT(id, body) {
    return {
        url: API_URL + '/responsibles/'+ id,
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

export function RESPONSIBLE_DELETE(id) {
    return {
        url: API_URL + '/responsibles/'+ id,
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