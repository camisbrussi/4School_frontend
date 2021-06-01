export const formata_data_hora = (datetime) => {
    var date = new Date(datetime);
    return date.toLocaleString("pt-BR");
}

export const formata_data = (date) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    date = new Date(date);
    return date.toLocaleString("pt-BR",options );
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