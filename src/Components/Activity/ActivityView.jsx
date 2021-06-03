import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ACTIVITY_SHOW } from "../../API/Api_Activity";
import FormActivity from "./FormActivity";
import { UserContext } from '../../Contexts/UserContext';


const ActivityView = () => {
  const navigate = useNavigate();

  var params = window.location.href.substr(1).split("/");
  let id = params[5];

  const [dados, setDados] = useState({});
  const [podeVisualizar, setPodeVisualizar] = useState(false);

  const {token } = React.useContext(UserContext);
  

  useEffect(() => {
    async function getData() {
      const { url, options } = ACTIVITY_SHOW(id, token);
      const response = await axios.get(url, options);
      let name = response.data.name;
      let description = response.data.description;
      let start = response.data.start;
      let end = response.data.end;
      let generate_certificate = response.data.generate_certificate;
      let vacancies = response.data.vacancies;
      let isActive = response.data.status_id === 1;

      setDados({ name, description, start, end, generate_certificate, vacancies, isActive})
      setPodeVisualizar(true);
    }
    getData();
  }, [id, token]);

  async function comeBack(event) {
    event.preventDefault();
      navigate("/");
  }

  return podeVisualizar ?(
    <FormActivity 
      titulo="Dados da Atividades"
      handleSubmit={comeBack}
      dados={dados}
      disabled={true}
    />
  ) : null;
};

export default ActivityView;
