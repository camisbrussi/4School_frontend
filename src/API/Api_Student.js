export const API_URL = 'http://177.44.248.32:8083'
//export const API_URL = 'http://localhost:3003'

export function STUDENT_GET(responsible_id, token) {
    let options = {
        url: API_URL + '/students',
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
    };

    if (responsible_id !== null)
        options.url += "/responsible/"+responsible_id;

    return options;
}

export function STUDENT_FILTER(body, token) {
    return {
        url: API_URL + '/students/filter/students',
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

export function STUDENT_POST(body, userLogged, token) {
    return {
        url: API_URL + '/students',
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

export function STUDENT_SHOW(id, token) {
    return {
        url: API_URL + '/students/' + id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function STUDENT_PUT(id, body, userLogged, token) {
    return {
        url: API_URL + '/students/'+ id,
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

export function STUDENT_DELETE(id, userLogged, token) {
    return {
        url: API_URL + '/students/'+ id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                UserLogged: JSON.stringify(userLogged),
            },
        },
    };
}