import React, {useState, useEffect} from 'react';
import CardPhone from './CardPhone';
import styles from './Person.module.css';
import Input from '../Forms/Input';
import InputMask from '../Forms/InputMask';
import Button from '../Forms/Button';
import Select from '../Forms/Select';
import useFetch from '../../Hooks/useFetch';
import {UserContext} from '../../Contexts/UserContext';
import {Alert} from 'react-st-modal';
import {CITY_GET} from '../../API/Api_Address';
import axios from 'axios';
import {bloqueiaTela, formataFone, liberaTela} from "../Helper/Functions";


function FormPerson({titulo, handleSubmit, dados, addPassword, addCheckAtivo}) {
    const {loading} = useFetch();

    const [name, setName] = useState(dados.name ?? '');
    const [cpf, setCpf] = useState(dados.cpf ?? '');
    const [email, setEmail] = useState(dados.email ?? '');
    const [birth_date, setBirthDate] = useState(date(dados.birth_date ?? ''));
    const [password, setPassword] = useState('');
    const [phones, setPhones] = useState(dados.phones ?? []);
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [district, setDistrict] = useState('');
    const [idCity, setIdCity] = useState(0);
    const [cities, setCities] = useState(dados.city ?? []);
    const [isActive, setIsActive] = useState(dados.isActive ?? false);

    const [mask, setMask] = useState("(99) 9 9999-9999");

    useEffect(() => {
        setCep(dados.cep ?? '');
        setAddress(dados.address ?? '');
        setNumber(dados.number ?? '');
        setComplement(dados.complement ?? '');
        setDistrict(dados.district ?? '');
        setIdCity(dados.idCity ?? 0);
    }, [dados]);

    const [objErros, setObjErros] = useState("");
    const {token} = React.useContext(UserContext);
    useEffect(() => {
        modalError();
    }, [objErros]);

    useEffect(() => {
        async function getData() {
            const {url, options} = CITY_GET(token);
            const response = await axios.get(url, options);
            setCities(response.data);
        }

        getData();
    }, [idCity, token]);

    useEffect(() => {
        var select = document.getElementById('city');
        cities.map((city) =>
            addOption(city.id, city.description, idCity === city.id));

        function addOption(id, description) {
            var option = new Option(description, id);
            select.add(option);
        }

        select.value = idCity;

    }, [cities, idCity]);

    function addPhone(e) {
        e.preventDefault();

        let number = document.getElementById('number').value.replace(/\D/g, '');
        let is_whatsapp = document.getElementById('is_whatsapp').checked;

        if (number.length < 10 || number.length > 11) {
            //- Numero invalido
            setObjErros('Número de telefone inválido');
            return;
        }

        setPhones([...phones, {number, is_whatsapp}]);
        document.getElementById('number').value = '';
        document.getElementById('is_whatsapp').checked = false;
    }

    function removerPhone(k) {
        if (!window.confirm('Realmente deseja remover este número de telefone?')) {
            return;
        }
        let newStatePhones = [...phones];
        newStatePhones.splice(k, 1);
        setPhones(newStatePhones);
    }

    function date(datetime) {
        if (datetime) return datetime.replace(/Z/, '');
        return null;
    }

    function limpa_formulário_cep() {
        setAddress('');
        setDistrict('');
    }

    async function searchCep(value) {
        bloqueiaTela();

        var cep = value.replace(/\D/g, '');
        if (cep !== '') {
            var validacep = /^[0-9]{8}$/;
            if (validacep.test(cep)) {

                setAddress('...');
                setDistrict('...');
                const conteudo = await axios.get('https://viacep.com.br/ws/' + cep + '/json/');

                if (conteudo) {

                    setAddress(conteudo.data.logradouro);
                    setDistrict(conteudo.data.bairro);
                    var c = document.getElementById('city'), i = 0;
                    for (; i < c.options.length; i++) {
                        if (c.options[i].text === conteudo.data.localidade) {
                            c.options[i].selected = true;
                            break;
                        }
                    }
                } else {
                    limpa_formulário_cep();
                    alert('CEP não encontrado.');
                }
            } else {

                limpa_formulário_cep();
                alert('Formato de CEP inválido.');
            }
        } else {
            limpa_formulário_cep();
        }

        liberaTela();
    }

    async function modalError() {
        if (objErros) {
            await Alert(objErros, 'Erro ao adicionar Número');
            setObjErros("");
        }
    }

    return (
        <section className="animeLeft">
            <h1 className="title title-2">{titulo}</h1>
            <form
                onSubmit={(e) => {
                    var select = document.getElementById('city');
                    var city_id = select.options[select.selectedIndex].value;
                    handleSubmit(e, {
                        name,
                        cpf,
                        email,
                        birth_date,
                        cep,
                        address,
                        number,
                        complement,
                        district,
                        city_id,
                        phones,
                        password,
                        isActive,
                    });
                }}
                className={styles.person}
            >
                <div className="container100">
                    <Input
                        label="Nome"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <InputMask
                        label="CPF"
                        type="text"
                        name="cpf"
                        value={cpf}
                        mask="999.999.999-99"
                        onChange={(e) => {
                            setCpf(e.target.value);
                        }}
                    />
                    <Input
                        label="E-mail"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Input
                        label="Data de nascimento"
                        type="date"
                        name="birth_date"
                        value={birth_date}
                        onChange={(e) => {
                            setBirthDate(e.target.value);
                        }}
                    />
                    <InputMask
                        label="CEP"
                        type="text"
                        name="cep"
                        value={cep}
                        mask="99999-999"
                        onChange={(e) => {
                            setCep(e.target.value);
                        }}
                        onBlur={() => {
                            searchCep(cep)
                        }}
                    />
                </div>

                <div className="container60">
                    <Input
                        label="Endereço"
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    />
                </div>
                <div className="container20">
                    <Input
                        label="Número"
                        type="text"
                        name="num"
                        value={number}
                        onChange={(e) => {
                            setNumber(e.target.value);
                        }}
                    />
                </div>
                <div className="container20">
                    <Input
                        label="Complemento"
                        type="text"
                        name="complement"
                        value={complement}
                        onChange={(e) => {
                            setComplement(e.target.value);
                        }}
                    />
                </div>
                <div className="container50">
                    <Input
                        label="Bairro"
                        type="text"
                        name="destrict"
                        value={district}
                        onChange={(e) => {
                            setDistrict(e.target.value);
                        }}
                    />
                </div>
                <div className="container50">
                    <Select
                        label="Cidade"
                        name="city"
                    />
                </div>

                {addPassword ? (
                    <div className="container100">
                        <Input
                            label="Senha"
                            type="password"
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        /></div>
                ) : (
                    ''
                )}
                <div className="container100">
                    {addCheckAtivo ? (
                        <div className={styles.checkbox}>
                            <Input
                                label="Registro Ativo"
                                type="checkbox"
                                name="isActive"
                                checked={isActive}
                                onChange={(e) => {
                                    setIsActive(e.target.checked);
                                }}
                            />
                        </div>
                    ) : (
                        ''
                    )}

                    <div style={{width: '100%', float: 'left'}}>
                        <label className="container100 pb-05rem">Número ( Para salvar o telefone é necessário clicar em Add fone)</label>
                        <div className="container15">
                            <label>
                                <input type="radio" className="d-inline-block" name="tipoFone" onClick={() => {setMask("(99) 9 9999-9999")}} defaultChecked={true}/> Celular<br/>
                            </label>
                            <label>
                                <input type="radio" className="d-inline-block" name="tipoFone" onClick={() => {setMask("(99) 9999-9999")}}/> Telefone
                            </label>
                        </div>

                        <div className="container25">
                            <InputMask
                                type="text"
                                name="number"
                                id="number"
                                mask={mask}
                            />
                        </div>
                        <div className="container25">
                            <div className={styles.checkbox}>
                                <label className="container100">&nbsp;</label>
                                <Input
                                    label="É WhatsApp?"
                                    type="checkbox"
                                    name="is_whatsapp"
                                    id="is_whatsapp"
                                />
                            </div>
                        </div>
                        <div className="container25">
                            <Button style={{margin:"0.2rem"}} onClick={addPhone}>Add fone</Button>
                        </div>
                    </div>

                    <div style={{width: '100%', float: 'left'}}>
                        {phones.map((v, k) => {
                            let fone = formataFone(v.number);
                            return (
                                <CardPhone
                                    key={k}
                                    indice={k}
                                    number={fone}
                                    is_whatsapp={v.is_whatsapp}
                                    removerPhone={removerPhone}
                                />
                            );
                        })}
                    </div>
                </div>

                {loading ? (
                    <Button disabled>Processando...</Button>
                ) : (
                    <Button>Salvar</Button>
                )}
            </form>
        </section>
    );
}

export default FormPerson;
