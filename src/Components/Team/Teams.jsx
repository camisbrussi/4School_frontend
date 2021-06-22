import React, {useCallback, useEffect, useState} from 'react';
import Head from '../Helper/Head';
import {FaEdit, FaWindowClose, FaUsers, FaEnvelope} from 'react-icons/fa';
import {UserContext} from '../../Contexts/UserContext';
import {Link} from 'react-router-dom';
import {Confirm} from 'react-st-modal';
import styles from './Teams.module.css';
import stylesBtn from '../Forms/Button.module.css';
import {TEAM_GET, TEAM_DELETE} from '../../API/Api_Team';
import axios from 'axios';
import {IoIosPeople} from 'react-icons/all';

import DataTable from "react-data-table-component";
import Filter from "../Tables/Filter";
import {bloqueiaTela, liberaTela, status_turma} from "../Helper/Functions";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const {userLogged, token} = React.useContext(UserContext);

    useEffect(() => {
        async function getData() {
            bloqueiaTela();

            const {url, options} = TEAM_GET(token);
            const response = await axios.get(url, options);
            let turmas = response.data;

            for (let i = 0; i < turmas.length; i++) {
                turmas[i].status_description = status_turma(turmas[i].status_id);
            }

            setTeams(turmas);
            liberaTela();
        }

        if (Object.keys(token).length > 0) getData()
    }, [token]);

    async function modalConfirm(teamId, teamName) {
        const result = await Confirm(
            'Inativar o turma ' + teamName + '?',
            'Inativação de turmas'
        );
        if (result) {
            bloqueiaTela();
            const {url, options} = TEAM_DELETE(teamId, userLogged, token);
            await axios.delete(url, options);

            liberaTela();
            window.location.reload(false);
        }
    }

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = teams.filter(item => (
        (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.teacher.person.name && item.teacher.person.name.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.year && item.year.toString().toLowerCase().includes(filterText.toLowerCase())) ||
        (item.status_description && item.status_description.toLowerCase().includes(filterText.toLowerCase()))
    ));

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return <Filter onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText}/>;
    }, [filterText, resetPaginationToggle]);

    const columns = [
        {name: "Nome", selector: 'name', sortable: true},
        {name: "Professor", selector: 'teacher.person.name', sortable: true},
        {name: "Ano", selector: 'year', sortable: true},
    ];

    const createColumns = useCallback(() => {
        return [
            {
                name: '',
                allowOverflow: true,
                width: '50px',
                cell: (row) => {
                    return (
                        <>
                            {row.status_id === 2 ? (
                                <FaUsers size={16} style={{color: 'grey'}}/>
                            ) : (
                                <FaUsers size={16} style={{color: 'blue'}}/>
                            )}
                        </>
                    );
                },
            },
            ...columns,
            {
                name: '',
                allowOverflow: true,
                maxWidth: '150px',
                cell: team => {
                    return (
                        <>
                            <Link to={`/conta/sendMail/createsendMail?team=${team.id}`}>
                                <FaEnvelope
                                    className="mx-5"
                                    size={16}
                                    style={{color: 'black'}}
                                    title="Enviar e-mail"
                                />
                            </Link>
                            <Link to={`participants?team=` + team.id + '&name=' + team.name + '&year=' + team.year}
                                  title="Gerenciar alunos">
                                <IoIosPeople size={16} style={{color: 'green'}} className="mx-5 link"/>
                            </Link>
                            <Link to={`edit/${team.id}`}>
                                <FaEdit size={16} style={{color: 'black'}} title="Editar" className="link"/>
                            </Link>
                            <button onClick={() => {
                                modalConfirm(team.id, team.name);
                            }} className="cursor-pointer link" title="Remover">
                                <FaWindowClose size={16} style={{color: 'red'}}/>
                            </button>
                        </>
                    );
                },
            },
        ];
    }, [columns]);

    return (
        <section className="animeLeft">
            <header className={styles.header}>
                <Head title="Team"/>
                <h1 className="title title-2">Turmas</h1>
                <Link className={stylesBtn.button} to="createteam">
                    Cadastrar
                </Link></header>

            <div className={styles.container100}>
                <p className={styles.list}>
                    <span>Status:</span>
                    <span>
                        <FaUsers size={16} style={{color: 'gray'}}/> Inativa
                    </span>
                    <span>
                        <FaUsers size={16} style={{color: 'blue'}}/> Ativa
                    </span>
                </p>
            </div>
            <div className={styles.container100}>
                <p className={styles.list}>
                    <span>Menu:</span>

                    <span>
                        <FaEnvelope
                            size={16}
                            style={{color: 'black'}}
                        /> Enviar e-mail
                    </span>
                    <span>
                        <IoIosPeople size={16} style={{color: 'green'}}/> Gerenciar Alunos
                    </span>
                    <span>
                        <FaEdit size={16} style={{color: 'black'}}/> Excluir
                    </span>
                    <span>
                        <FaWindowClose size={16} style={{color: 'red'}}/> Excluir
                    </span>
                </p>
            </div>
            <div className={styles.teams}>
                <DataTable
                    title="Turmas cadastradas"
                    columns={createColumns()}
                    data={filteredItems}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                />
            </div>
        </section>
    );
};

export default Teams;
