import React, {useLayoutEffect, useState} from 'react';
import styles from './Header.module.css';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../Assets/logo.svg';
import {UserContext} from '../Contexts/UserContext';
import Button from './Forms/Button';
import {type_user} from './Helper/Functions'
import Load from "./Helper/Load";

const Header = () => {
    const {userLogged, getUserLogged, userLogout} = React.useContext(UserContext);
    const [user, setUser] = useState(['logando...']);

    useLayoutEffect(() => {
        getUserLogged();
    }, []);

    useLayoutEffect(() => {
        setUser(userLogged);
    }, [userLogged]);

    return (
        <>
            <Load/>
            <header className={styles.header}>
                <nav className={`${styles.nav} container`}>
                    <Link className={styles.logo} to="/" aria-label="4|School - Home">
                        <Logo/>
                    </Link>
                    {user ?
                        (
                            <div className={styles.login}>
                                <p>{user.login ? user.login : user.name}</p>
                                <p>{type_user(user.type_id)}</p>
                            </div>
                        ) : ""}
                    <Button onClick={userLogout}>Sair</Button>
                </nav>
            </header>
        </>
    );
};

export default Header;
