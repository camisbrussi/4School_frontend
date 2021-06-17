import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import { UserContext } from '../../Contexts/UserContext';
import axios from "axios"
import {RESPONSIBLE_PUT, RESPONSIBLE_SHOW} from "../../API/Api_Responsible";
import FormPerson from "../Person/FormPerson";
import { Alert } from "react-st-modal";
import Error from "../Helper/Error";

const ResponsibleEdit = () => {
    const navigate = useNavigate();
    
    var params = window.location.href.substr(1).split("/");
    let id = params[6];

    const { userLogged, token } = React.useContext(UserContext);
    const [dados,setDados] = useState({});
    const [podeAtualziar, setPodeAtualizar] = useState(false);

    const [objErros, setObjErros] = useState({});

    useEffect(() => {
      modalError();
    }, [objErros]);

    useEffect(() => {
        async function getData() {
            const {url, options} = RESPONSIBLE_SHOW(id, token);
            const response = await axios.get(url, options);

            let name = response.data.person.name;
            let cpf = response.data.person.cpf;
            let email = response.data.person.email;
            let birth_date = response.data.person.birth_date;
            let phones = [];
            if (response.data.person.phones.length) {
                phones = [...response.data.person.phones];
            }

            let address = null;
            let cep = null;
            let number = null;
            let complement = null;
            let district = null;
            let idCity = null;
            if (response.data.person.address != null) {
                address = response.data.person.address.address;
                cep = response.data.person.address.cep;
                number = response.data.person.address.number;
                complement = response.data.person.address.complement;
                district = response.data.person.address.district;
                idCity = response.data.person.address.city_id;
            }

            setDados({name,cpf,email,birth_date,phones, address, number, complement, district, cep, idCity})
            setPodeAtualizar(true);
        }

        getData();
    }, [id, token]);

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

    async function handleSubmit(event, data) {
        event.preventDefault();
        const {url, body, options} = RESPONSIBLE_PUT(id, data,userLogged, token);
        const response = await axios.put(url, body, options);
        if (response.statusText === 'OK') {
            if (response.data.erros !== undefined && response.data.erros.length) {
              let erros = { msg: response.data.success, erros: [] };
              for (let i = 0; i < response.data.erros.length; i++) {
                erros.erros.push(response.data.erros[i]);
              }
              setObjErros(erros);
              modalError();
            } else {
              navigate('/conta/responsibles');
            }
          }
    }

    return podeAtualziar ? <FormPerson titulo="Editar Responsável" handleSubmit={handleSubmit} dados={dados} addPassword={true} /> : null;
};

export default ResponsibleEdit;