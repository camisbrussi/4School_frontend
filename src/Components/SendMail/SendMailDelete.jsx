import React, {useEffect, useState} from 'react';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import {SENDMAIL_DELETE, SENDMAIL_SHOW} from '../../API/Api_SendMail';
import useFetch from '../../Hooks/useFetch';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

const SendMailDelete = () => {

    const navigate = useNavigate();

    const {loading, error} = useFetch();

    const [sendMail, setSendMail] = useState({});

    var params = window.location.href.substr(1).split('/');
    let sendMailId = params[6];

    useEffect(() => {
        async function getData() {

            const {url, options} = SENDMAIL_SHOW(sendMailId);
            const response = await axios.get(url, options);
            setSendMail(response.data);
        }

        getData();
    }, [sendMailId]);


    async function confirm(event) {
        event.preventDefault();
        const {url, options} = SENDMAIL_DELETE(sendMail.id)
        const response = await axios.delete(url, options);

        if (response.statusText === 'OK') navigate("/conta/sendMail");
    }

    async function cancel(event) {
        event.preventDefault();
        navigate('/conta/sendmail');

    }

    return (
        <section className="animeLeft">

            <h1 className="title title-2">Inativar Responsável</h1>


            <label value={sendMail.name}>Deseja inativar o responsável {sendMail.description}?</label>

            {loading ? (
                <Button disabled>Processando...</Button>
            ) : (
                <Button onClick={confirm}>Confirmar</Button>
            )}
            <Error error={error && ''}/>

            {loading ? (
                <Button disabled>Cancelando...</Button>
            ) : (
                <Button onClick={cancel}>Cancelar</Button>
            )}
        </section>
    );
};

export default SendMailDelete;
