export const formata_data_hora = (datetime) => {
    var date = new Date(datetime);
    return date.toLocaleString("pt-BR");
}

export const formata_data_hora_para_datetime = (datahora) => {
    let data = datahora.split(" ")[0];
    let hora = datahora.split(" ")[1];

    let dia = data.split("/")[0];
    let mes = data.split("/")[1];
    let ano = data.split("/")[2];

    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2) + " " + hora;
}

export const formata_cpf = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export const status_usuario = (status_id) => {
    if (status_id === 1) return "Ativo";
    if (status_id === 2) return "Inativo";
    if (status_id === 3) return "Bloqueado";
}

export const status_atividade = (status_id) => {
    if (status_id === 1) return "Ativo";
    if (status_id === 2) return "Inativo";
}

export const status_turma = (status_id) => {
    if (status_id === 1) return "Ativo";
    if (status_id === 2) return "Inativo";
}