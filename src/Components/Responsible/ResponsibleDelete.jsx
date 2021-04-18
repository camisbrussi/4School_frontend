import React, {useEffect, useState} from 'react';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import {RESPONSIBLE_DELETE, RESPONSIBLE_SHOW} from '../../API/Api_Responsible';
import useFetch from '../../Hooks/useFetch';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

const ResponsibleDelete = () => {

    const navigate = useNavigate();

    const {loading, error} = useFetch();

    const [responsible, setResponsibles] = useState({});

    var params = window.location.href.substr(1).split('/');
    let responsibleId = params[6];

    useEffect(() => {
        async function getData() {

            const {url, options} = RESPONSIBLE_SHOW(responsibleId);
            const response = await axios.get(url, options);
            setResponsibles(response.data);
        }

        getData();
    }, [responsibleId]);


    async function confirm(event) {
        event.preventDefault();
        const {url, options} = RESPONSIBLE_DELETE(responsible.id)
        const response = await axios.delete(url, options);

        if (response.statusText === 'OK') navigate("/conta/responsibles");
    }

    async function cancel(event) {
        event.preventDefault();
        navigate('/conta/responsibles');

    }

    return (
        <section className="animeLeft">

            <h1 className="title title-2">Inativar Responsável</h1>


            <label value={responsible.name}>Deseja inativar o responsável {responsible.name}?</label>

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

export default ResponsibleDelete;
