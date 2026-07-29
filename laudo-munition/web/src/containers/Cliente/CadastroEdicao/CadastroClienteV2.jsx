import styles from "./CadastroEdicaoClienteV2.module.css"
import FormularioCard from "../../../components/FormularioCard/FormularioCard";
import BtnSelecao from "../../../components/botõesDeSeleção/BtnSelecao";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api";

const erroStyle = {
    color: "#e53535",
    fontSize: "11px",
    margin: 0,
};

function validarNome(valor) {
    if (!valor.trim()) return "Nome é obrigatório.";
    if (valor.trim().length < 3) return "Nome deve ter ao menos 3 caracteres.";
    return "";
}

function validarEmail(valor) {
    if (!valor.trim()) return "E-mail é obrigatório.";
    const partes = valor.split("@");
    if (partes.length !== 2 || !partes[0] || !partes[1].includes(".")) return "E-mail inválido.";
    return "";
}

function validarTelefone(valor) {
    const limpo = valor.replace(/\D/g, "");
    if (!limpo) return "Telefone é obrigatório.";
    if (limpo.length < 10 || limpo.length > 11) return "Telefone deve ter 10 ou 11 dígitos.";
    return "";
}

function validarDtNasc(valor) {
    if (!valor) return "Data de nascimento é obrigatória.";
    return "";
}

function validarDocumento(valor, pf) {
    const limpo = valor.replace(/\D/g, "");
    if (!limpo) return "Documento é obrigatório.";
    if (pf === "pf" && limpo.length !== 11) return "CPF deve ter 11 dígitos.";
    if (pf === "pj" && limpo.length !== 14) return "CNPJ deve ter 14 dígitos.";
    return "";
}

function validarCep(valor) {
    const limpo = valor.replace(/\D/g, "");
    if (!limpo) return "CEP é obrigatório.";
    if (limpo.length !== 8) return "CEP deve ter 8 dígitos.";
    return "";
}

function validarEndereco(valor) {
    if (!valor.trim()) return "Endereço é obrigatório.";
    return "";
}

function validarNumero(valor) {
    if (!valor && valor !== 0) return "Número é obrigatório.";
    return "";
}

function CampoErro({ mensagem }) {
    if (!mensagem) return null;
    return <span style={erroStyle}>{mensagem}</span>;
}

function LabelComErro({ label, erro }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 4px 0" }}>
            <p style={{ margin: 0 }}>{label}</p>
            <CampoErro mensagem={erro} />
        </div>
    );
}

function ClienteCadastroV2() {

    const navigate = useNavigate();

    const [pf, setPf] = useState("pf");
    const [tipo, setTipo] = useState("revenda");
    const [enderecoAtual, setEnderecoAtual] = useState([]);

    const opcoesCliente = [
        { value: "pf", label: "Pessoa Física" },
        { value: "pj", label: "Pessoa Jurídica" },
    ];

    const opcoesTipo = [
        { value: "revenda", label: "Revenda" },
        { value: "ifood", label: "IFood" },
        { value: "festaAniversario", label: "Festa de aniversário" }
    ];

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dtNasc, setDtNasc] = useState("");
    const [documento, setDocumento] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [descricao, setDescricao] = useState("");

    const [tocados, setTocados] = useState({});

    function marcarTocado(campo) {
        setTocados(prev => ({ ...prev, [campo]: true }));
    }

    const erros = {
        nome: validarNome(nome),
        email: validarEmail(email),
        telefone: validarTelefone(telefone),
        dtNasc: validarDtNasc(dtNasc),
        documento: validarDocumento(documento, pf),
        cep: validarCep(cep),
        endereco: validarEndereco(endereco),
        numero: validarNumero(numero),
    };

    function formularioValido() {
        return Object.values(erros).every(e => e === "");
    }

    function mostrarErro(campo) {
        return tocados[campo] ? erros[campo] : "";
    }

    async function cadastrarEndereco() {
        const payload = {
            cep: enderecoAtual.cep,
            rua: enderecoAtual.logradouro,
            bairro: enderecoAtual.bairro,
            numero
        };

        const res = await api.post(
            `/enderecos`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
                }
            }
        );

        return res.data;
    }

    async function enviarCadastro() {
        const todosTocados = Object.keys(erros).reduce((acc, k) => ({ ...acc, [k]: true }), {});
        setTocados(todosTocados);

        if (!formularioValido()) return;

        const enderecoCadastrado = await cadastrarEndereco();

        api.post(
            `/clientes`,
            {
                "nome": nome,
                "descricao": descricao,
                "dtNasc": dtNasc,
                "telefone": telefone,
                "pf": pf === "pf" ? 1 : 2,
                "tipo": tipo === "revenda" ? 0 : tipo === "ifood" ? 1 : 2,
                "documento": documento,
                "email": email,
                "endereco": enderecoCadastrado.id
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
                }
            }
        ).then((res) => {
            console.log(res.data);
            voltarListagem();
        });
    }

    function voltarListagem() {
        navigate("/cliente/listagem");
    }

    function atualizarCEP(valor) {
        const cepLimpo = valor.replace(/\D/g, "");
        setCep(valor);

        if (cepLimpo.length === 8) {
            axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
                .then(res => {
                    if (res.data.logradouro != undefined) {
                        atualizarLogradouro(`${res.data.logradouro} (${res.data.bairro})`);
                    } else {
                        atualizarLogradouro("");
                    }
                    setEnderecoAtual(res.data);
                });
        }
    }

    function atualizarLogradouro(valor) {
        setEndereco(valor);
    }

    function handleChangePf(valor) {
        setPf(valor);
        setDocumento("");
        setTocados(prev => ({ ...prev, documento: false }));
    }

    return (
        <FormularioCard title={"Cadastro de Cliente"} sucesso={enviarCadastro} cancelar={voltarListagem}>
            <div className={styles.elements}>
                <div className={styles.formLadoA}>

                    <p>Classificação de documento:</p>
                    <BtnSelecao options={opcoesCliente} value={pf} onChange={handleChangePf} grid={2} />

                    <p>Classificação de cliente:</p>
                    <BtnSelecao options={opcoesTipo} value={tipo} onChange={setTipo} grid={3} />

                    <LabelComErro label="Nome do cliente:" erro={mostrarErro("nome")} />
                    <input
                        type="text"
                        placeholder="Nome do cliente"
                        onChange={(e) => setNome(e.target.value)}
                        onBlur={() => marcarTocado("nome")}
                        value={nome}
                    />

                    <LabelComErro label="E-mail:" erro={mostrarErro("email")} />
                    <input
                        type="text"
                        placeholder="E-mail do cliente"
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => marcarTocado("email")}
                        value={email}
                    />

                    <LabelComErro label="Telefone:" erro={mostrarErro("telefone")} />
                    <input
                        type="text"
                        placeholder="Telefone do cliente (DDD + 9 Digitos)"
                        onChange={(e) => setTelefone(e.target.value)}
                        onBlur={() => marcarTocado("telefone")}
                        value={telefone}
                    />

                </div>

                <div className={styles.formDivisor}></div>

                <div className={styles.formLadoB}>

                    <LabelComErro label="Data de nascimento:" erro={mostrarErro("dtNasc")} />
                    <input
                        type="date"
                        onChange={(e) => setDtNasc(e.target.value)}
                        onBlur={() => marcarTocado("dtNasc")}
                        value={dtNasc}
                    />

                    <LabelComErro label="Documento:" erro={mostrarErro("documento")} />
                    <input
                        type="text"
                        placeholder={pf === "pf" ? "CPF do cliente (11 dígitos)" : "CNPJ do cliente (14 dígitos)"}
                        onChange={(e) => setDocumento(e.target.value)}
                        onBlur={() => marcarTocado("documento")}
                        value={documento}
                    />

                    <LabelComErro label="CEP:" erro={mostrarErro("cep")} />
                    <input
                        type="text"
                        placeholder="CEP do endereço do cliente"
                        onChange={(e) => atualizarCEP(e.target.value)}
                        onBlur={() => marcarTocado("cep")}
                        value={cep}
                    />

                    <div className={styles.logradouro}>
                        <div className={styles.blocoEndereco}>
                            <LabelComErro label="Endereço:" erro={mostrarErro("endereco")} />
                            <input
                                type="text"
                                placeholder="Endereço do cliente"
                                onChange={(e) => atualizarLogradouro(e.target.value)}
                                onBlur={() => marcarTocado("endereco")}
                                value={endereco}
                            />
                        </div>

                        <div className={styles.blocoEndereco}>
                            <LabelComErro label="Número:" erro={mostrarErro("numero")} />
                            <input
                                type="number"
                                placeholder="Número"
                                onChange={(e) => setNumero(e.target.value)}
                                onBlur={() => marcarTocado("numero")}
                                value={numero}
                            />
                        </div>
                    </div>

                    <p>Descrição do Cliente:</p>
                    <textarea
                        placeholder="Referência do endereço do cliente a ser cadastrado"
                        onChange={(e) => setDescricao(e.target.value)}
                        value={descricao}
                    />
                </div>
            </div>
        </FormularioCard>
    );
}

export default ClienteCadastroV2;