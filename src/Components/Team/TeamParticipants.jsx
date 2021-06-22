import React, {useCallback, useEffect, useState} from 'react';
import Head from '../Helper/Head';
import {FaUserPlus, FaFileExport, FaEnvelope} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import {UserContext} from '../../Contexts/UserContext';
import Button from '../Forms/Button'
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from './Teams.module.css'
import stylesBtn from '../Forms/Button.module.css';
import {TEAM_GET_STUDENTS, TEAM_SHOW} from '../../API/Api_Team';
import {bloqueiaTela, formata_cpf, formata_data, formata_date_para_data, liberaTela} from "../Helper/Functions";
import axios from 'axios'

import DataTable from "react-data-table-component";
import Filter from "../Tables/Filter";

const TeamParticipants = () => {
    const team_id = new URL(window.location.href).searchParams.get("team");
    const team_name = new URL(window.location.href).searchParams.get("name");
    const team_year = new URL(window.location.href).searchParams.get("year");
    const [participants, setParticipants] = useState([]);
    const [team, setTeam] = useState();
    const {userLogged, token} = React.useContext(UserContext);

    useEffect(() => {
        async function getData() {
            bloqueiaTela();

            const {url, options} = TEAM_GET_STUDENTS(team_id, token);
            const response = await axios.get(url, options);
            let students = response.data;

            for (let i = 0; i < students.length; i++) {
                // students[i].person.birth_date = formata_data(students[i].person.birth_date);
                students[i].person.birth_date = formata_date_para_data(students[i].person.birth_date);
                students[i].person.cpf = formata_cpf(students[i].person.cpf);
            }
            setParticipants(students);

            liberaTela();
        }

        getData();
    }, [token, team_id]);

    useEffect(() => {
        async function getData() {
            bloqueiaTela();

            const {url, options} = TEAM_SHOW(team_id, token);
            const response = await axios.get(url, options);
            setTeam(response.data);

            liberaTela();
        }

        getData();
    }, [token, team_id]);

    async function sendEmail(id) {
    }

    function generateReport() {
        bloqueiaTela();

        const doc = new jsPDF();
        const tableColumn = ["Nome", "CPF", "Data Nascimento"];
        const tableRows = [];

        participants.map(participant => {
            const reportData = [
                participant.person.name,
                participant.person.cpf,
                participant.person.birth_date
            ];
            tableRows.push(reportData);
        });
        doc.autoTable(tableColumn, tableRows, {startY: 20});
        doc.text(`Turma: ${team.name}  Ano: ${team.year}`, 14, 15);
        doc.save(`report_${team.name}.pdf`);

        liberaTela();
    };

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = participants.filter(item => (
        (item.person.name && item.person.name.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.person.type.description && item.person.type.description.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.person.email && item.person.email.toLowerCase().includes(filterText.toLowerCase()))
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
        {name: "Nome", selector: 'person.name', sortable: true},
        {name: "CPF", selector: 'person.cpf', sortable: true},
        {name: "Data de nascimento", selector: 'person.birth_date', sortable: true},
    ];

    const createColumns = useCallback(() => {
        return [ ...columns ];
    }, [columns]);

    return (
        <section className="animeLeft">
            <Head title="Participantes"/>
            <h1 className="title title-2">Participantes de {team_name}</h1>
            <div className={styles.buttons}>
                {userLogged.type_id ? "" : (
                    <Link className={stylesBtn.button}
                          to={`addstudents?team=${team_id}&name=${team_name}&year=${team_year}`}>
                        <FaUserPlus size={16}/> Gerenciar
                    </Link>
                )}

                <Button className={stylesBtn.button} onClick={() => generateReport()}>
                    <FaFileExport size={16}/> Relatório
                </Button>
            </div>
            <div className={styles.teams}>

                <DataTable
                    title="Participantes da turma"
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

export default TeamParticipants;