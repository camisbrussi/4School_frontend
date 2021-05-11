export const API_URL = 'http://177.44.248.32:8084'
// export const API_URL = 'http://localhost:3004'

const token = window.localStorage.getItem('token');
const userLogged = window.localStorage.getItem('user');
const idUserLogged = window.localStorage.getItem('id');


export function TEAM_GET() {
    return {
        url: API_URL + '/teams',
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
                UserLogged: userLogged,
                idUserLogged: idUserLogged
            },
        },
    };
}

export function TEAM_POST(body) {
    return {
        url: API_URL + '/teams',
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

export function TEAM_SHOW(id) {
    return {
        url: API_URL + '/teams/' + id,
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

export function TEAM_PUT(id, body) {
    return {
        url: API_URL + '/teams/' + id,
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

export function TEAM_DELETE(id) {
    return {
        url: API_URL + '/teams/' + id,
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

export function TEAM_POST_STUDENTS(team_id, body) {
    return {
        url: API_URL + '/teams/addstudents/' + team_id,
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

export function TEAM_GET_STUDENTS(team_id) {
    return {
        url: API_URL + '/teams/students/' + team_id,
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

export function TEAM_FILTER(body) {
    return {
        url: API_URL + '/teams/filter/teams',
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

export function TEAM_FILTER_STUDENTS(id, body) {
    return {
        url: API_URL + '/teams/filterstudents/'+id,
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