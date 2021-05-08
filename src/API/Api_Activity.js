export const API_URL = 'http://177.44.248.32:8082'
//export const API_URL = 'http://localhost:3002'

const token = window.localStorage.getItem('token');
const userLogged = window.localStorage.getItem('user');
const idUserLogged = window.localStorage.getItem('id');


export function ACTIVITY_GET() {

    return {
        url: API_URL + '/activities',
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
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
                UserLogged: userLogged,
                idUserLogged: idUserLogged
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
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            },
        },
    };
}

export function ACTIVITY_PUT(id, body) {
    return {
        url: API_URL + '/activities/' + id,
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

export function ACTIVITY_DELETE(id) {
    return {
        url: API_URL + '/activities/' + id,
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

export function ACTIVITY_GET_PARTICIPANTS(id) {
    return {
        url: API_URL + '/activities/participants/'+id,
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            },
        },
    };
}

export function ACTIVITY_GET_TEACHERS(id) {
    return {
        url: API_URL + '/activities/participants/teachers/'+id,
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            },
        },
    };
}

export function ACTIVITY_POST_PARTICIPANT(activity_id, body) {
    return {
        url: API_URL + '/activities/addparticipants/' + activity_id,
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

export function ACTIVITY_DELETE_SUBSCRIPTION(id) {
    return {
        url: API_URL + '/activities/subscription/' + id,
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