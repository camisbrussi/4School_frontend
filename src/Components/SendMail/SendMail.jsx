import React, {useCallback, useEffect, useState} from "react";
import Head from "../Helper/Head";
import { Link } from "react-router-dom";

import styles from "./SendMail.module.css";
import stylesBtn from "../Forms/Button.module.css";
import { UserContext } from '../../Contexts/UserContext';
import { SENDMAIL_GET } from "../../API/Api_SendMail";
import axios from "axios";
import Filter from "../Tables/Filter";
import {FaCheck, FaEdit, FaTimes, FaUserAlt, FaWindowClose} from "react-icons/fa";
import {TiTimes} from "react-icons/all";
import DataTable from "react-data-table-component";

const SendMail = () => {
  const [messages, setMessages] = useState([]);
  const { userLogged, token } = React.useContext(UserContext);

  useEffect(() => {
    async function getData() {
      const { url, options } = SENDMAIL_GET(token);
      //console.log(url, options)
      const response = await axios.get(url, options);
      setMessages(response.data);
    }

    getData();
  }, []);

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = messages.filter(
        (item) =>
            (item.message && item.message.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.email && item.email.toLowerCase().includes(filterText.toLowerCase()))
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
        { name: 'Mensagem', selector: 'message', sortable: true },
        { name: 'Destinatário', selector: 'person.name', sortable: true }
    ];

    const createColumns = useCallback(() => {
        return [
            ...columns,
            {
                name: 'E-mail',
                allowOverflow: true,
                maxWidth: '30px',
                cell: (row) => {
                    return row.send_email ?
                        (<FaCheck size={16} style={{ color: 'green' }} title="Sim" />) :
                        (<FaTimes size={16} style={{ color: 'red' }} title="Não" />);
                },
            },
            {
                name: 'WhatsApp',
                allowOverflow: true,
                maxWidth: '30px',
                cell: (row) => {
                    return row.send_whatsapp ?
                        (<FaCheck size={16} style={{ color: 'green' }} title="Sim" />) :
                        (<FaTimes size={16} style={{ color: 'red' }} title="Não" />);
                },
            }
        ];
    }, [columns]);

  return (
    <section className="animeLeft">
        <header className={styles.header}>
            <Head title="Enviar mensagem" />
            <h1 className="title title-2">Mensagens</h1>
            <Link className={stylesBtn.button} to="createsendmail">
                Nova mensagem
            </Link>
        </header>


      <div className={styles.sendmail}>
          <DataTable
              title="Mensagens cadastradas"
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

export default SendMail;
