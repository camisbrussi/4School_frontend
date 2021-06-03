 export const API_URL = 'http://177.44.248.32:8083'
//eexport const API_URL = 'http://localhost:3003'

export function RESPONSIBLE_GET(token) {
    return {
        url: API_URL + '/responsibles',
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function RESPONSIBLE_POST(body, userLogged, token) {
    return {
        url: API_URL + '/responsibles',
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

export function RESPONSIBLE_SHOW(id, token) {
    return {
        url: API_URL + '/responsibles/' + id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function RESPONSIBLE_PUT(id, body, userLogged, token) {
    return {
        url: API_URL + '/responsibles/'+ id,
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

export function RESPONSIBLE_DELETE(id, userLogged, token) {
    return {
        url: API_URL + '/responsibles/'+ id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                UserLogged: JSON.stringify(userLogged),
            },
        },
    };
}