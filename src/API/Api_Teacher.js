export const API_URL = 'http://177.44.248.32:8083'
//export const API_URL = 'http://localhost:3003'

export function TEACHER_GET(token) {
    return {
        url: API_URL + '/teachers',
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function TEACHER_POST(body, userLogged, token) {
    return {
        url: API_URL + '/teachers',
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

export function TEACHER_SHOW(id, token) {
    return {
        url: API_URL + '/teachers/' + id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function TEACHER_PUT(id, body, userLogged, token) {
    return {
        url: API_URL + '/teachers/'+ id,
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

export function TEACHER_DELETE(id, userLogged, token) {
    return {
        url: API_URL + '/teachers/'+ id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                UserLogged: JSON.stringify(userLogged),
            },
        },
    };
}

export function TEACHER_FILTER(body, token) {
    return {
        url: API_URL + '/teachers/filter/teachers',
        //body: JSON.stringify(body),
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            params: body
        },
    };
}