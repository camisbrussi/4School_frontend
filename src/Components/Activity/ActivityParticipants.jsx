import React, { useCallback, useEffect, useState } from 'react';
import Head from '../Helper/Head';
import { FaUserPlus, FaWindowClose, FaFileExport } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import Button from '../Forms/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from './Activities.module.css';
import stylesBtn from '../Forms/Button.module.css';
import { Confirm } from 'react-st-modal';
import {
  ACTIVITY_DELETE_SUBSCRIPTION,
  ACTIVITY_GET_PARTICIPANTS,
  ACTIVITY_SHOW,
} from '../../API/Api_Activity';
import { formata_data } from '../Helper/Functions';
import axios from 'axios';

import DataTable from 'react-data-table-component';
import Filter from '../Tables/Filter';

const ActivityParticipants = () => {
  const activity_id = new URL(window.location.href).searchParams.get(
    'activity'
  );
  const activity_name = new URL(window.location.href).searchParams.get('name');
  const [participants, setParticipants] = useState([]);
  const [event, setEvent] = useState();

  const { userLogged, token } = React.useContext(UserContext);

  useEffect(() => {
    async function getData() {
      const { url, options } = ACTIVITY_GET_PARTICIPANTS(activity_id, token);
      const response = await axios.get(url, options);
      setParticipants(response.data);
    }
    getData();
  }, [token, activity_id]);

  useEffect(() => {
    async function getData() {
      const { url, options } = ACTIVITY_SHOW(activity_id, token);
      const response = await axios.get(url, options);
      setEvent(response.data);
    }
    getData();
  }, [token, activity_id]);

  async function removerParticipante(id) {
    const result = await Confirm(
      'Deseja realmente remover esse participante ?',
      'Remover participante'
    );
    if (result) {
      const { url, options } = ACTIVITY_DELETE_SUBSCRIPTION(
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
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = formata_data(event.start);
    doc.text(`Evento: ${event.name}  Data: ${date}`, 14, 15);
    doc.save(`report_${event.name}.pdf`);
  }

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = participants.filter(
    (item) =>
      (item.person.name &&
        item.person.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.person.type.description &&
        item.person.type.description
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.person.email &&
        item.person.email.toLowerCase().includes(filterText.toLowerCase()))
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
    { name: 'Nome', selector: 'person.name', sortable: true },
    { name: 'Tipo', selector: 'person.type.description', sortable: true },
    { name: 'E-mail', selector: 'person.email', sortable: true },
  ];

  const createColumns = useCallback(() => {
    return [
      ...columns,
      {
        name: '',
        allowOverflow: true,
        maxWidth: '50px',
        cell: (participant) => {
          return (
            <>
              <a
                className="cursor-pointer"
                title="Remover"
                onClick={() => {
                  removerParticipante(participant.id);
                }}
              >
                <FaWindowClose size={16} style={{ color: 'red' }} />
              </a>
            </>
          );
        },
      },
    ];
  }, [columns]);

  return (
    <section className="animeLeft">
      <Head title="Participantes" />
      <h1 className="title title-2">Participantes de {activity_name}</h1>
      <div className={styles.buttons}>
      <Link
        className={stylesBtn.button}
        to={`activityaddparticipants?activity=${activity_id}&name=${activity_name}`}
      >
        <FaUserPlus size={16} /> Gerenciar 
      </Link>
      <Button className={stylesBtn.button} onClick={() => generateReport()}>
        <FaFileExport size={16} /> Relatório
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
