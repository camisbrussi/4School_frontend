import React, {useCallback, useEffect, useState} from 'react';
import Head from '../Helper/Head';
import {FaUserPlus, FaWindowClose, FaFileExport, FaCheck, FaEdit} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {UserContext} from '../../Contexts/UserContext';
import Button from '../Forms/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from './Activities.module.css';
import stylesBtn from '../Forms/Button.module.css';
import {Alert, Confirm, CustomDialog} from 'react-st-modal';
import {
    ACTIVITY_DELETE_SUBSCRIPTION,
    ACTIVITY_GET_PARTICIPANTS,
    ACTIVITY_SHOW, CONFIRM_PARTICIPATION,
} from '../../API/Api_Activity';
import {formata_cpf, formata_data} from '../Helper/Functions';
import axios from 'axios';

import DataTable from 'react-data-table-component';
import Filter from '../Tables/Filter';

import ModalDialog from '../Activity/ModalConfirmParticipation';
import Error from "../Helper/Error";

const ActivityParticipants = () => {
    const activity_id = new URL(window.location.href).searchParams.get(
        'activity'
    );
    const [activity_name, setActivityName] = useState("");
    const [participants, setParticipants] = useState([]);
    const [event, setEvent] = useState();
    const [objErros, setObjErros] = useState({});

    const {userLogged, token} = React.useContext(UserContext);

    useEffect(() => {
        async function getData() {
            const {url, options} = ACTIVITY_GET_PARTICIPANTS(activity_id, token);
            const response = await axios.get(url, options);

            let participantes = response.data;
            for (let i = 0; i < participantes.length; i++) {
                participantes[i].person.cpfFormatado = formata_cpf(participantes[i].person.cpf);
            }
            setParticipants(participantes);
        }

        async function getEvent() {
            const {url, options} = ACTIVITY_SHOW(activity_id, token);
            const response = await axios.get(url, options);
            // console.log(response.data);
            setEvent(response.data);
            setActivityName(response.data.name);
        }

        getData();
        getEvent();
    }, [token, activity_id]);

    async function removerParticipante(id) {
        const result = await Confirm(
            'Deseja realmente remover esse participante ?',
            'Remover participante'
        );
        if (result) {
            const {url, options} = ACTIVITY_DELETE_SUBSCRIPTION(
                id,
                userLogged,
                token
            );

            const response = await axios.delete(url, options);
            if (response.statusText === 'OK') {
                for (let i = 0; i < participants.length; i++) {
                    if (participants[i].id === id) {
                        let participantes = [...participants];
                        participantes.splice(i, 1);
                        setParticipants(participantes);
                        break;
                    }
                }
            }
        }
    }

    function generateReport() {
        const doc = new jsPDF();
        const tableColumn = ['Nome', 'CPF', 'Descrição'];
        const tableRows = [];

        participants.map((participant) => {
            const reportData = [
                participant.person.name,
                participant.person.cpf,
                participant.person.type.description,
            ];
            tableRows.push(reportData);
        });
        doc.autoTable(tableColumn, tableRows, {startY: 20});
        const date = formata_data(event.start);
        doc.text(`Evento: ${event.name}  Data: ${date}`, 14, 15);
        doc.save(`report_${event.name}.pdf`);
    }

    async function modalConfirmarParicipacao(idInscricao, nroTickets) {
        const data = await CustomDialog(
            <ModalDialog tickets={nroTickets} />,
            {
                title: 'Confirme a quantidade de participantes!',
                showCloseIcon: true,
            }
        );

        if (data) {
            const { url, body, options } = CONFIRM_PARTICIPATION(idInscricao, {
                number_participation: data,
            }, userLogged, token);
            const response = await axios.put(url, body, options, userLogged);

            if (response.statusText === 'OK') {
                if (
                    response.data.erros !== undefined &&
                    response.data.erros.length
                ) {
                    let erros = { msg: response.data.success, erros: [] };
                    for (let i = 0; i < response.data.erros.length; i++) {
                        erros.erros.push(response.data.erros[i]);
                    }
                    setObjErros(erros);
                    modalError();
                } else {
                    window.location.reload(false);
                }
            }
        }
    }

    async function modalError() {
        if (Object.keys(objErros).length > 0) {
            await Alert(
                objErros.erros.map((val, key) => (
                    <li key={key}>
                        <Error error={val} />
                    </li>
                )),
                objErros.msg
            );
            setObjErros('');
        }
    }

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = participants.filter(
        (item) =>
            (item.person.name && item.person.name.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.person.cpf && item.person.cpf.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.person.cpfFormatado && item.person.cpfFormatado.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.person.type.description && item.person.type.description.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.person.email && item.person.email.toLowerCase().includes(filterText.toLowerCase()))
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
        {name: 'CPF', selector: 'person.cpfFormatado', sortable: true},
        {name: 'Tipo', selector: 'person.type.description', sortable: true},
        {name: 'E-mail', selector: 'person.email', sortable: true},
    ];

    const createColumns = useCallback(() => {
        return [
            ...columns,
            {
                name: '',
                allowOverflow: true,
                maxWidth: '50px',
                cell: (participant) => {
                    if (event === undefined) {
                        return ("");
                    }

                    let dataInicioEvento = new Date(event.start).setHours(0,0,0,0);
                    let dataFimEvento = new Date(event.end).setHours(0,0,0,0);
                    let dataAtual = new Date().setHours(0,0,0,0);

                    let permiteConfirmarParticipacao = dataAtual >= dataInicioEvento && dataAtual <= dataFimEvento;

                    return (
                        <>
                            {permiteConfirmarParticipacao ? (
                                <>
                                    {participant.number_participation > 0 ? (
                                        <button title="Editar participação" className="cursor-pointer"
                                                onClick={() => { modalConfirmarParicipacao(participant.id, participant.number_tickets) }}>
                                            <FaEdit size={16} style={{ color: 'blue' }} />
                                        </button>
                                    ) : (
                                        <button title="Confirmar participação" className="cursor-pointer"
                                                onClick={() => { modalConfirmarParicipacao(participant.id, participant.number_tickets) }}>
                                            <FaCheck size={16} style={{ color: 'green' }}/>
                                        </button>
                                    )}
                                </>
                            ) : ("")}

                            <button title="Remover" className="cursor-pointer"
                                    onClick={() => { removerParticipante(participant.id); }}>
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
            <Head title="Participantes"/>
            <h1 className="title title-2">Participantes de {activity_name}</h1>
            <div className={styles.buttons}>
                <Link
                    className={stylesBtn.button}
                    to={`activityaddparticipants?activity=${activity_id}&name=${activity_name}`}
                >
                    <FaUserPlus size={16}/> Adicionar Participantes
                </Link>
                <Button className={stylesBtn.button} onClick={() => generateReport()}>
                    <FaFileExport size={16}/> Relatório Participantes
                </Button>
            </div>
            <div className={styles.activities}>
                <DataTable
                    title="Participantes da atividade"
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

export default ActivityParticipants;
