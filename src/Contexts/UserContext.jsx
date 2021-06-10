import React from 'react';
import {TOKEN_POST, USER_GET, USER_SHOW, USER_LOGGED} from '../API/Api_User';
import {useNavigate} from 'react-router-dom';

import axios from 'axios'

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null);
    const [userLogged, setUserLogged] = React.useState({});
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [token, setToken] = React.useState(null);
    const navigate = useNavigate();

    const userLogout = React.useCallback(
        async function () {
            setData(null);
            setError(null);
            setLoading(false);
            setLogin(false);
            window.localStorage.removeItem('token');
            navigate('/login');
        },
        [navigate],
    );

    async function userLogin(login, password, type) {
        try {
            setError(null);
            setLoading(true);

            if (type == 2) { //- Responsavel/Professor
                login = login.replace(/\D/g, '');
            }

            const {url, body, options} = TOKEN_POST({login, password, type});
            const tokenRes = await axios.post(url, body, options);

            if (tokenRes.statusText !== 'OK') throw new Error(`Error: ${tokenRes.statusText}`);
            const {token} = await tokenRes.data;

            setLogin(true);
            setToken(token);
            window.localStorage.setItem('token', token);
            navigate('/');

        } catch (err) {
            setError(err.message);
            setLogin(false);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        async function autoLogin() {
            const token = window.localStorage.getItem('token');
            if (token) {
                try {
                    setError(null);
                    setLoading(true);
                    setToken(token);
                    const {url, options} = USER_LOGGED(token);
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error('Token inválido');
                    await getUser();
                } catch (err) {
                    userLogout();
                } finally {
                    setLoading(false);
                }
            } else {
                setLogin(false);
            }
        }
        autoLogin();
    }, [userLogout]);


    async function getUser() {
        const token = window.localStorage.getItem('token');
        const {url, options} = USER_GET(token);
        const response = await axios.get(url, options);
        setData(response.data);
        setLogin(true);
    }

    async function getUserLogged() {
        const {url, options} = USER_LOGGED(token);
        const response = await axios.get(url, options);
        setUserLogged(response.data);
    }

    async function userShow(id) {
        try {
            setLoading(true);
            const {url, options} = USER_SHOW(id, token);
            const response = await fetch(url, options);
            const json = await response.json();
            setData(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <UserContext.Provider
            value={{userLogin, userLogout, data, error, loading, login, userShow, getUser, getUserLogged, userLogged, token}}
        >
            {children}
        </UserContext.Provider>
    );
};
