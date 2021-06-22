import React, {useCallback, useEffect, useState} from 'react';
import Head from '../Helper/Head';
import {FaEdit, FaUserTie} from 'react-icons/fa';
import {UserContext} from '../../Contexts/UserContext';
import {Link} from 'react-router-dom';
import styles from './Responsibles.module.css';
import stylesBtn from '../Forms/Button.module.css';
import {RESPONSIBLE_GET} from '../../API/Api_Responsible';
import axios from 'axios';
import {BsFillPersonLinesFill, BsPersonPlusFill} from 'react-icons/all';

import DataTable from 'react-data-table-component';
import Filter from '../Tables/Filter';
import {bloqueiaTela, formata_cpf, liberaTela} from '../Helper/Functions';

const Responsibles = () => {
    const [responsibles, setResponsibles] = useState([]);
    const {token} = React.useContext(UserContext);

    useEffect(() => {
        async function getData() {
            bloqueiaTela();

            const {url, options} = RESPONSIBLE_GET(token);
            const response = await axios.get(url, options);
            let responsaveis = response.data;

            for (let i = 0; i < responsaveis.length; i++) {
                responsaveis[i].person.cpf = formata_cpf(responsaveis[i].person.cpf);
            }

            setResponsibles(responsaveis);

            liberaTela();
        }

        if (Object.keys(token).length > 0) getData()
    }, [token]);

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = responsibles.filter(
        (item) =>
            (item.person.name &&
                item.person.name.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.person.cpf &&
                item.person.cpf.toLowerCase().includes(filterText.toLowerCase()))
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <Filter
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    const columns = [
        {name: 'Nome', selector: 'person.name', sortable: true},
        {name: 'CPF', selector: 'person.cpf', sortable: true},
    ];

    const createColumns = useCallback(() => {
        return [
            {
                name: '',
                allowOverflow: true,
                maxWidth: '5px',
                cell: (row) => {
                    return (
                        <FaUserTie size={16} style={{color: 'blue'}} title="Editar"/>
                    );
                },
            },
            ...columns,
            {
                name: '',
                allowOverflow: true,
                maxWidth: '100px',
                width: '100px',
                cell: (responsible) => {
                    return (
                        <>
                            <Link
                                to={`../students/createstudent?responsible=` + responsible.id}
                                title="Cadastrar estudante"
                                className="link"
                            >
                                <BsPersonPlusFill
                                    className="mx-5"
                                    size={16}
                                    style={{color: 'green'}}
                                />
                            </Link>
                            <Link
                                to={`../students?responsible=` + responsible.id}
                                title="Listar estudantes"
                            >
                                <BsFillPersonLinesFill size={16} className="link"/>
                            </Link>
                            <Link to={`edit/${responsible.id}`}>
                                <FaEdit
                                    className="mx-5 link"
                                    size={16}
                                    style={{color: 'black'}}
                                    title="Editar"
                                />
                            </Link>
                        </>
                    );
                },
            },
        ];
    }, [columns]);

    return (
        <section className="animeLeft">
            <header className={styles.header}>
                <Head title="Responsáveis"/>
                <h1 className="title title-2">Responsáveis</h1>
                <Link className={stylesBtn.button} to="createresponsible">
                    Cadastrar
                </Link>
            </header>
            <div className={styles.container100}>
                <p className={styles.list}>
                    <span>Menu:</span>
                    <span>
            <BsPersonPlusFill size={16} style={{color: 'green'}}/> Cadastrar
            Estudante
          </span>
                    <span>
            <BsFillPersonLinesFill size={16}/> Listar Estudantes
          </span>
                    <span>
            <FaEdit size={16} style={{color: 'black'}}/> Editar
          </span>
                </p>
            </div>

            <div className={styles.responsibles}>
                <DataTable
                    title="Responsáveis cadastrados"
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

export default Responsibles;
