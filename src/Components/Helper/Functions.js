export const formata_data_hora = (datetime) => {
    var date = new Date(datetime);
    return date.toLocaleString("pt-BR");
}

export const formata_data = (date) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    date = new Date(date);
    return date.toLocaleString("pt-BR",options );
}

export const formata_date_para_data = (date) => {
    let dia = date.split("-")[2];
    let mes = date.split("-")[1];
    let ano = date.split("-")[0];

    return ("0"+dia).slice(-2) + "/" + ("0"+mes).slice(-2) + "/" +  ano;
}

export const formata_data_para_date = (data) => {
    let dia = data.split("/")[0];
    let mes = data.split("/")[1];
    let ano = data.split("/")[2];

    return ano + "-" + ("0"+mes).slice(-2) + "-" +("0"+dia).slice(-2);
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

export const type_user = (type_id) => {
    if (type_id === 1) return "Professor";
    if (type_id === 2) return "Responsável";
    if (!type_id) return "Administrador";
}

export const bloqueiaTela = () => {
    document.getElementById("loading-div").style.display = "block";
}

export const liberaTela = () => {
    document.getElementById("loading-div").style.display = "none";
}

export const formataCelular = (fone) => {
    let ddd = fone.substr(0,2);
    let nonoDig = fone.substr(2,1);
    let p1 = fone.substr(3,4);
    let p2 = fone.substr(7,4);
    return "("+ddd+") "+nonoDig+" "+p1+"-"+p2;
}

export const formataTelefone = (fone) => {
    let ddd = fone.substr(0,2);
    let p1 = fone.substr(2,4);
    let p2 = fone.substr(6,4);
    return "("+ddd+") "+p1+"-"+p2;
}

export const formataFone = (fone) => {
    if (fone.length === 10)
        return formataTelefone(fone);

    return formataCelular(fone);
}