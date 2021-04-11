export const API_URL = 'http://177.44.248.32:8083'
// export const API_URL = 'http://localhost:3003'

export function STUDENT_GET(token, responsible_id) {
    let options = {
        url: API_URL + '/students',
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
    };

    if (responsible_id !== undefined)
        options.url += "/responsible/"+responsible_id;

    return options;
}

export function STUDENT_POST(body, token) {
    return {
        url: API_URL + '/students',
        body: JSON.stringify(body),
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
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

export function STUDENT_PUT(id, body, token) {
    return {
        url: API_URL + '/students/'+ id,
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

export function STUDENT_DELETE(id, token) {
    return {
        url: API_URL + '/students/'+ id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        },
    };
}