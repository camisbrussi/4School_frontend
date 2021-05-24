import React, {useCallback, useEffect, useState} from 'react';
import Head from '../Helper/Head';
import {FaClipboardList, FaEdit, FaWindowClose} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import styles from './Responsibles.module.css'
import stylesBtn from '../Forms/Button.module.css';
import {RESPONSIBLE_GET} from '../../API/Api_Responsible';
import axios from 'axios'
import {BsFillPersonLinesFill, BsPersonPlusFill} from "react-icons/all";

import DataTable from "react-data-table-component";
import Filter from "../Tables/Filter";
import {formata_cpf} from "../Helper/Functions";

const Responsibles = () => {
    const [responsibles, setResponsibles] = useState([]);

    useEffect(() => {
        async function getData() {
            const {url, options} = RESPONSIBLE_GET();
            const response = await axios.get(url, options);
            let responsaveis = response.data;

            for (let i = 0; i < responsaveis.length; i++) {
                responsaveis[i].person.cpf = formata_cpf(responsaveis[i].person.cpf);
            }

            setResponsibles(responsaveis);
        }

        getData();
    }, []);

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = responsibles.filter(item => (
        (item.person.name && item.person.name.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.person.cpf && item.person.cpf.toLowerCase().includes(filterText.toLowerCase()))
    ));

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return <Filter onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText, resetPaginationToggle]);

    const columns = [
        {name:"Nome", selector:'person.name', sortable:true},
        {name:"CPF", selector:'person.cpf', sortable:true}
    ];

    const createColumns = useCallback(() => {
        return [
            ...columns,
            {
                name: '',
                allowOverflow: true,
                maxWidth: '50px',
                cell: responsible => {
                    return (
                        <>
                            <Link to={`../students/createstudent?responsible=` + responsible.id} title="Cadastrar estudante">
                                <BsPersonPlusFill className="mx-5" size={16} style={{color: 'green'}}/>
                            </Link>
                            <Link to={`../students?responsible=` + responsible.id} title="Listar estudantes">
                                <BsFillPersonLinesFill size={16}/>
                            </Link>
                            <Link to={`edit/${responsible.id}`}>
                                <FaEdit className="mx-5" size={16} style={{color: 'blue'}} title="Editar"/>
                            </Link>
                        </>
                    );
                },
            },
        ];
    }, [columns]);

    return (
        <section className="animeLeft">
            <Head title="Responsáveis"/>
            <h1 className="title title-2">Responsáveis</h1>
            <Link className={stylesBtn.button} to="createresponsible">Cadastrar</Link>
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