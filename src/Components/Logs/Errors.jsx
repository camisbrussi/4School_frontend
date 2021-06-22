import React, {useEffect, useState} from "react";
import {FaEye} from "react-icons/fa";
import useForm from "../../Hooks/useForm";
import {Link} from "react-router-dom";
import Button from "../Forms/Button";

import Input from "../Forms/Input";

import styles from "./Logs.module.css";

import {ERROR_GET, ERROR_FILTER} from "../../API/Api_Logs";
import axios from "axios";
import {bloqueiaTela, liberaTela} from "../Helper/Functions";

const Error = () => {
    const [errors, setErrors] = useState([]);
    const start = useForm();
    const end = useForm();

    useEffect(() => {
        async function getData() {
            bloqueiaTela();
            const {url, options} = ERROR_GET();
            const response = await axios.get(url, options);
            setErrors(response.data);
            liberaTela();
        }

        getData();
    }, []);

    function date(date) {
        date = date.split(".");
        date = new Date(date[0]);

        let options = {year: "numeric", month: "2-digit", day: "2-digit"};
        date.setHours(date.getHours() + 3);

        return date.toLocaleString("pt-BR", options);
    }

    async function filtraLogs() {
        bloqueiaTela();
        const {url, body, options} = ERROR_FILTER(
            {
                start: start.value,
                end: end.value
            },
        );
        const response = await axios.post(url, body, options);
        setErrors(response.data);
        liberaTela();
    }

    return (
        <section className="animeLeft">
            <h1 className="title title-2">Logs de Erro do Sistema</h1>
            <div className={styles.logs}>
                <h3 className="mb-5">Filtro</h3>
                <div className={styles.container40}>
                    <Input label="Inicio" type="date" name="start" {...start} />
                </div>
                <div className={styles.container40}>
                    <Input label="Fim" type="date" name="end" {...end} />
                </div>
                <div className={styles.container20}>
                    <label>&nbsp;</label>
                    <Button type="button" onClick={filtraLogs}>Filtrar</Button>
                </div>
                <div className={[styles.container100, "mt-30"].join(" ")}>
                    {errors.map((error) => (
                        <div key={String(error)} className={styles.list}>
                            <span>{date(error)}</span>
                            <div className={styles.buttons}>
                                <Link to={`${error}`}>
                                    <FaEye size={16} style={{color: "gray"}}/>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Error;
