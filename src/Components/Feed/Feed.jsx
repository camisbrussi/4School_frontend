import React, {useCallback, useEffect, useState} from 'react';
import {
  FaEye,
  FaCheck,
  FaFileInvoice,
  FaWindowClose,
  FaCalendarCheck,
  FaEnvelope,
  FaClipboardList, FaEdit
} from 'react-icons/fa';
import Error from '../Helper/Error';
import Input from '../Forms/Input';
import { Link } from 'react-router-dom';
import Button from '../Forms/Button';
import { Alert, Confirm } from 'react-st-modal';
import { useNavigate } from 'react-router-dom';

import {
  PARTICIPANT_GET_ACTIVITIES,
  PARTICIPANT_GET_ACTIVITIES_FILTER,
  VACANCIES_AVAILABLE,
  CONFIRM_SUBSCRIPTION,
} from '../../API/Api_Activity';
import axios from 'axios';

import { CustomDialog } from 'react-st-modal';
import ModalDialog from '../Activity/ModalConfirm';

import styles from './Feed.module.css';
import {formata_data_hora, formata_data_hora_para_datetime} from "../Helper/Functions";
import Filter from "../Tables/Filter";
import DataTable from "react-data-table-component";

const Feed = () => {
  const [activities, setActivities] = useState([]);
  const [startFilter, setStartFilter] = useState(new Date);
  const [endFilter, setEndFilter] = useState(new Date().getDate + 30 ); //30dias
  const [objErros, setObjErros] = useState({});

  useEffect(() => {
    modalError();
  }, [objErros]);

  useEffect(() => {
    async function getData() {
      const { url, options } = PARTICIPANT_GET_ACTIVITIES();
      const response = await axios.get(url, options);
      let atividades = response.data;

      for (let i = 0; i < atividades.length; i++) {
        atividades[i].activity.start = formata_data_hora(atividades[i].activity.start);
        atividades[i].activity.end = formata_data_hora(atividades[i].activity.end);
      }

      setActivities(atividades);
    }
    getData();
  }, []);

  async function filterActivity() {
    let getParamentes = PARTICIPANT_GET_ACTIVITIES_FILTER({
      start: startFilter,
      end: endFilter,
    });
    let { url, options } = getParamentes;
    const response = await axios.get(url, options);
    let dados = {};
    dados = response.data;

    for (let i = 0; i < dados.length; i++) {
      dados[i].activity.start = formata_data_hora(dados[i].activity.start);
      dados[i].activity.end = formata_data_hora(dados[i].activity.end);
    }

    setActivities(dados);
  }

  function date(datetime) {
    var date = new Date(datetime);
    return date.toLocaleString('pt-BR');
  }

  async function verifyVacancies(id, id_activity, tickets, dateStart) {
    if (new Date(dateStart) > new Date() && tickets == 0) {
      if (tickets == 0) {
        const { url, options } = VACANCIES_AVAILABLE(id_activity);
        const response = await axios.get(url, options);

        modalConfirm(id, response.data, tickets);
      }

      async function modalConfirm(id, vacanciesAvailable, tickets) {
        const data = await CustomDialog(
          <ModalDialog
            vacanciesAvailable={vacanciesAvailable}
            tickets={tickets}
          />,
          {
            title: 'Quantos lugares deseja reservar?',
            showCloseIcon: true,
          }
        );
        if (data) {
          const { url, body, options } = CONFIRM_SUBSCRIPTION(id, {
            number_tickets: data,
          });
          const response = await axios.put(url, body, options);

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
    } else if (new Date(dateStart) < new Date()) {
      await Alert(
        'Prazo para confirmação já está excedido',
        'Confirmar participação'
      );
    }
    else if (new Date(dateStart) > new Date() && tickets > 0) {
      await Alert(
        'Para alterar sua inscrição é necessário cancelar e se inscrever novamente',
        'Confirmar participação'
      );
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

  async function modalCancelSubscription(SubscriptionId, dateStart, tickets) {
    if (new Date(dateStart) > new Date() && tickets > 0) {
      const result = await Confirm(
        'Deseja Cancelar sua Inscrição?',
        'Cancelamento de Inscrição'
      );
      console.log(result);
      if (result) {
        const { url, body, options } = CONFIRM_SUBSCRIPTION(SubscriptionId, {
          number_tickets: 0,
        });
        await axios.put(url, body, options);
        window.location.reload(false);
      }
    } else if (new Date(dateStart) < new Date() && tickets > 0) {
      await Alert(
        'Prazo do cancelamento já está excedido',
        'Cancelamento de Inscrição'
      );
    } else if (tickets == 0) {
      await Alert(
        'Você não está confirmado nessa atividde',
        'Cancelamento de Inscrição'
      );
    }
  }

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = activities.filter(item => (
      (item.activity.name && item.activity.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.activity.start && item.activity.start.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.activity.end && item.activity.end.toLowerCase().includes(filterText.toLowerCase()))
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
    {name:"Atividade", selector:'activity.name', sortable:true},
    {name:"Início", selector:'activity.start', sortable:true},
    {name:"Fim", selector:'activity.end', sortable:true},
  ];

  const createColumns = useCallback(() => {
    return [
      ...columns,
      {
        name: '',
        allowOverflow: true,
        maxWidth: '40px',
        width: '150px',
        cell: row => {
          return (
              <>
                <Link to={`activities/view/${row.activity.id}`}>
                  <FaEye size={16} style={{ color: 'black' }} />
                </Link>
                <button onClick={() => {verifyVacancies(row.id, row.activity.id, row.number_tickets, formata_data_hora_para_datetime(row.activity.start))}}>
                  {row.number_tickets > 0 ? (
                      <FaCheck size={16} style={{ color: 'green' }} />
                  ) : (
                      <FaCheck size={16} style={{ color: 'gray' }} />
                  )}
                </button>
                <button onClick={() => {modalCancelSubscription(row.id, formata_data_hora_para_datetime(row.activity.start), row.number_tickets)}}>
                  {row.number_tickets > 0 || new Date(formata_data_hora_para_datetime(row.activity.start)) > new Date() ? (
                      <FaWindowClose size={16} style={{ color: 'red' }} />
                  ) : (
                      <FaWindowClose size={16} style={{ color: 'gray' }} />
                  )}
                </button>
                <button to={`${row}`}>
                  {row.number_participation > 0 && row.activity.generate_certificate ? (
                      <FaFileInvoice size={16} style={{ color: 'blue' }} />
                  ) : (
                      <FaFileInvoice size={16} style={{ color: 'gray' }} />
                  )}
                </button>
              </>
          );
        },
      },
    ];
  }, [columns]);

  return (
    <section className="animeLeft">
      <h1 className="title title-2">Atividades</h1>
      <div className={styles.activities}>
        <h3 className="mb-5">Filtro</h3>
        <div className={styles.container40}>
          <Input
            label="Inicio"
            type="date"
            name="start"
            onChange={(e) => {
              setStartFilter(e.target.value);
            }}
          />
        </div>
        <div className={styles.container40}>
          <Input
            label="Fim"
            type="date"
            name="end"
            onChange={(e) => {
              setEndFilter(e.target.value);
            }}
          />
        </div>
        <div className={styles.container20}>
          <label>&nbsp;</label>
          <Button type="button" onClick={() => filterActivity()}>
            Filtrar
          </Button>
        </div>
        <div className={styles.container100}>
          <p className={styles.list}>
            <span>
              <FaEye size={16} style={{ color: 'black' }} /> Visualizar
            </span>
            <span>
              <FaCheck size={16} style={{ color: 'gray' }} /> Confirmar Presença
            </span>
            <span>
              <FaCheck size={16} style={{ color: 'green' }} /> Presença
              Confirmada
            </span>
            <span>
              <FaWindowClose size={16} style={{ color: 'red' }} /> Excluir
              Inscrição
            </span>
            <span>
              <FaFileInvoice size={16} style={{ color: 'blue' }} /> Certificado
              Disponível
            </span>
          </p>
        </div>
        <div className={[styles.container100, 'mt-30'].join(' ')}>
            <DataTable
                title="Suas atividades"
                columns={createColumns()}
                data={filteredItems}
                pagination
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
            />
        </div>
      </div>
    </section>
  );
};

export default Feed;
