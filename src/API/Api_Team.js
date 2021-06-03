export const API_URL = 'http://177.44.248.32:8084'
//export const API_URL = 'http://localhost:3004'

export function TEAM_GET(token) {
    return {
        url: API_URL + '/teams',
        options: {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function TEAM_POST(body, userLogged, token) {
    return {
        url: API_URL + '/teams',
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

export function TEAM_SHOW(id, token) {
    return {
        url: API_URL + '/teams/' + id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        },
    };
}

export function TEAM_PUT(id, body, userLogged, token) {
    return {
        url: API_URL + '/teams/' + id,
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

export function TEAM_DELETE(id, userLogged, token) {
    return {
        url: API_URL + '/teams/' + id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                UserLogged: JSON.stringify(userLogged),
            },
        },
    };
}

export function TEAM_POST_STUDENTS(team_id, body, userLogged, token) {
    return {
        url: API_URL + '/teams/addstudents/' + team_id,
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

export function TEAM_GET_STUDENTS(team_id, token) {
    return {
        url: API_URL + '/teams/students/' + team_id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        },
    };
}

export function TEAMS_GET_TEACHER(userLogged, token) {
    return {
        url: API_URL + '/teams/teacher/' + userLogged.id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        },
    };
}

export function TEAM_FILTER(body, token) {
    return {
        url: API_URL + '/teams/filter/teams',
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            params: body
        },
    };
}

export function TEAM_FILTER_STUDENTS(id, body, token) {
    return {
        url: API_URL + '/teams/filterstudents/'+id,
        options: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            params: body
        },
    };
}