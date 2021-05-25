import React, { useEffect, useState } from 'react';
import { FaEye, FaCheck, FaFileInvoice, FaWindowClose } from 'react-icons/fa';
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

const Feed = () => {
  const [activities, setActivities] = useState([]);
  const [startFilter, setStartFilter] = useState('');
  const [endFilter, setEndFilter] = useState('');

  const navigate = useNavigate();

  const [objErros, setObjErros] = useState({});

  useEffect(() => {
    modalError();
  }, [objErros]);

  useEffect(() => {
    async function getData() {
      const { url, options } = PARTICIPANT_GET_ACTIVITIES();
      const response = await axios.get(url, options);
      setActivities(response.data);
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
          {activities.map((a) => (
            <div key={String(a)} className={`${styles.list} ${styles.items}`}>
              <span>{a.activity.name}</span>
              <span>{date(a.activity.start)}</span>
              <span>{date(a.activity.end)}</span>
              <div className={styles.buttons}>
                <Link to={`activities/view/${a.activity.id}`}>
                  <FaEye size={16} style={{ color: 'black' }} />
                </Link>
                <button
                  onClick={() => {
                    verifyVacancies(
                      a.id,
                      a.activity.id,
                      a.number_tickets,
                      a.activity.start
                    );
                  }}
                >
                  {a.number_tickets > 0 ? (
                    <FaCheck size={16} style={{ color: 'green' }} />
                  ) : (
                    <FaCheck size={16} style={{ color: 'gray' }} />
                  )}
                </button>

                <button
                  onClick={() => {
                    modalCancelSubscription(
                      a.id,
                      a.activity.start,
                      a.number_tickets
                    );
                  }}
                >
                  {a.number_tickets > 0 ||
                  new Date(a.activitystart) > new Date() ? (
                    <FaWindowClose size={16} style={{ color: 'red' }} />
                  ) : (
                    <FaWindowClose size={16} style={{ color: 'gray' }} />
                  )}
                </button>

                <button to={`${a}`}>
                  {a.number_participation > 0 &&
                  a.activity.generate_certificate ? (
                    <FaFileInvoice size={16} style={{ color: 'blue' }} />
                  ) : (
                    <FaFileInvoice size={16} style={{ color: 'gray' }} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feed;
