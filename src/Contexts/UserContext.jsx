import React from 'react';
import {TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET, USER_SHOW} from '../API/Api_User';
import {useNavigate} from 'react-router-dom';

import axios from 'axios'

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const userLogout = React.useCallback(
        async function () {
            setData(null);
            setError(null);
            setLoading(false);
            setLogin(false);
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('id');
            navigate('/login');
        },
        [navigate],
    );

    async function getUser() {
        const token = window.localStorage.getItem('token');
        const {url, options} = USER_GET(token);
        const response = await axios.get(url, options);
        setData(response.data);
        setLogin(true);
    }


    async function userLogin(login, password, type) {
        try {
            setError(null);
            setLoading(true);

            const {url, body, options} = TOKEN_POST({login, password, type});
            const tokenRes = await axios.post(url, body, options);

            if (tokenRes.statusText !== 'OK') throw new Error(`Error: ${tokenRes.statusText}`);
            const {token} = await tokenRes.data;
            const {id} = await tokenRes.data.user;
            const userType = await tokenRes.data.user.type;
            setLogin(true);
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('user', login);
            window.localStorage.setItem('id', id);
            window.localStorage.setItem('type', userType);
            navigate('/');

        } catch (err) {
            console.log(err)
            setError(err.message);
            setLogin(false);
        } finally {
            setLoading(false);
        }
    }

    async function userShow(id) {
        try {
            const token = window.localStorage.getItem('token');
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


        console.log(data)
    }

    React.useEffect(() => {
        async function autoLogin() {
            const token = window.localStorage.getItem('token');
            if (token) {
                try {
                    setError(null);
                    setLoading(true);
                    const {url, options} = TOKEN_VALIDATE_POST(token);
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error('Token inválido');
                    await getUser(token);
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

    return (
        <UserContext.Provider
            value={{userLogin, userLogout, data, error, loading, login, userShow, getUser}}
        >
            {children}
        </UserContext.Provider>
    );
};
