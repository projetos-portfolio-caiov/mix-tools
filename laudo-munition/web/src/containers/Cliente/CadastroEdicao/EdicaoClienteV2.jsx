import styles from "./CadastroEdicaoClienteV2.module.css"
import FormularioCard from "../../../components/FormularioCard/FormularioCard";
import BtnSelecao from "../../../components/botõesDeSeleção/BtnSelecao";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { api } from "../../../api";

const erroStyle = {
    color: "#e53535",
    fontSize: "11px",
    margin: 0,
};

// ===== VALIDAÇÕES =====

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
    if (limpo.length === 11) return "Telefone deve ter 11 dígitos.";
    return "";
}

function validarDtNasc(valor) {
    if (!valor) return "Data de nascimento é obrigatória.";
    return "";
}

function validarDocumento(valor, pf) {
    const limpo = valor.replace(/\D/g, "");

    if (!limpo) return "Documento é obrigatório.";

    if (pf === "pf") {
        if (limpo.length !== 11) return "CPF deve ter 11 dígitos.";
    }

    if (pf === "pj") {
        if (limpo.length !== 14) return "CNPJ deve ter 14 dígitos.";
    }

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

// ===== MÁSCARAS =====

function formatarCPF(valor) {
    const v = valor.replace(/\D/g, "").slice(0, 11);
    return v
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatarCNPJ(valor) {
    const v = valor.replace(/\D/g, "").slice(0, 14);
    return v
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
}

// ===== COMPONENTES ERRO =====

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

function ClienteEdicaoV2() {

    const navigate = useNavigate()

    const [pf, setPf] = useState("pf");
    const [tipo, setTipo] = useState("revenda")

    const { clientes, clienteSelecionado } = useOutletContext()
    const [clienteAnterior, setClienteAnterior] = useState("")
    const [enderecoAtual, setEnderecoAtual] = useState({})

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [dtNasc, setDtNasc] = useState("")
    const [documento, setDocumento] = useState("")
    const [cep, setCep] = useState("")
    const [endereco, setEndereco] = useState("")
    const [numero, setNumero] = useState("")
    const [descricao, setDescricao] = useState("")

    const [tocados, setTocados] = useState({})

    function marcarTocado(campo) {
        setTocados(prev => ({ ...prev, [campo]: true }))
    }

    function handleChangePf(valor) {
        setPf(valor)
        setDocumento("")
        setTocados(prev => ({ ...prev, documento: false }))
    }

    function handleDocumento(valor) {
        if (pf === "pf") {
            setDocumento(formatarCPF(valor))
        } else {
            setDocumento(formatarCNPJ(valor))
        }
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
    }

    function formularioValido() {
        return Object.values(erros).every(e => e === "")
    }

    function mostrarErro(campo) {
        return tocados[campo] ? erros[campo] : ""
    }

    async function editarEndereco() {
        return await api.put(
            `/enderecos/${clienteAnterior.enderecoId}`,
            {
                cep: enderecoAtual.cep,
                rua: enderecoAtual.logradouro,
                bairro: enderecoAtual.bairro,
                numero
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
                }
            }
        )
    }

    async function enviarEdicao() {

        const todosTocados = Object.keys(erros).reduce((acc, k) => ({ ...acc, [k]: true }), {});
        setTocados(todosTocados);

        if (!formularioValido()) return;

        try {

            if (clienteAnterior.cep !== cep || clienteAnterior.numero !== numero) {
                await editarEndereco()
            }

            await api.put(
                `/clientes/${clienteAnterior.id}`,
                {
                    nome,
                    descricao,
                    dtNasc,
                    telefone,
                    pf: pf === "pf" ? 1 : 2,
                    tipo: tipo === "revenda" ? 0 : tipo === "ifood" ? 1 : 2,
                    documento,
                    email,
                    endereco: clienteAnterior.enderecoId
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
                    }
                }
            )

            voltarListagem()

        } catch (erro) {
            console.error("Erro ao editar cliente:", erro)
        }
    }

    function voltarListagem() {
        navigate("/cliente/listagem")
    }

    function atualizarCEP(valor) {
        const cepLimpo = valor.replace(/\D/g, "")
        setCep(cepLimpo)
        //console.log(cepLimpo)

        if (cepLimpo.length === 8) {
            axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
                .then(res => {
                    if (res.data.logradouro) {
                        setEndereco(`${res.data.logradouro} (${res.data.bairro})`)
                    } else {
                        setEndereco("")
                    }
                    setEnderecoAtual(res.data)
                })
        }
    }

    function carregarEnderecoExistente(cliente) {
    setCep(cliente.cep ? cliente.cep.replace(/\D/g, "") : "")
    const enderecoFormatado = cliente.bairro
        ? `${cliente.endereco} (${cliente.bairro})`
        : cliente.endereco || ""
    setEndereco(enderecoFormatado)
    setEnderecoAtual({ logradouro: cliente.endereco, bairro: cliente.bairro, cep: cliente.cep })
}

    useEffect(() => {
        const cliente = clientes.find(c => c.id === clienteSelecionado)

        if (cliente) {
            setNome(cliente.nome)
            setEmail(cliente.email)
            setTelefone(cliente.telefone)
            setDtNasc(cliente.dtNasc)
            setDocumento(cliente.documento)
            carregarEnderecoExistente(cliente)
            setNumero(cliente.numero)
            setDescricao(cliente.descricao)
            setPf(cliente.pf == 1 ? "pf" : "pj")

            setTipo(
                cliente.tipo == 0
                    ? "revenda"
                    : cliente.tipo == 1
                        ? "ifood"
                        : "festaAniversario"
            )

            setClienteAnterior(cliente)
        }

    }, [clientes, clienteSelecionado])

    return (
        <FormularioCard title={"Edição de Cliente"} sucesso={enviarEdicao} cancelar={voltarListagem}>
            <div className={styles.elements}>

                <div className={styles.formLadoA}>

                    <p>Classificação de documento:</p>
                    <BtnSelecao options={[
                        { value: "pf", label: "Pessoa Física" },
                        { value: "pj", label: "Pessoa Jurídica" }
                    ]} value={pf} onChange={handleChangePf} grid={2} />

                    <p>Classificação de cliente:</p>
                    <BtnSelecao options={[
                        { value: "revenda", label: "Revenda" },
                        { value: "ifood", label: "IFood" },
                        { value: "festaAniversario", label: "Festa de aniversário" }
                    ]} value={tipo} onChange={setTipo} grid={3} />

                    <LabelComErro label="Nome do cliente:" erro={mostrarErro("nome")} />
                    <input type="text" value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        onBlur={() => marcarTocado("nome")}
                    />

                    <LabelComErro label="E-mail:" erro={mostrarErro("email")} />
                    <input type="text" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => marcarTocado("email")}
                    />

                    <LabelComErro label="Telefone:" erro={mostrarErro("telefone")} />
                    <input type="text" value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        onBlur={() => marcarTocado("telefone")}
                    />

                </div>

                <div className={styles.formDivisor}></div>

                <div className={styles.formLadoB}>

                    <LabelComErro label="Data de nascimento:" erro={mostrarErro("dtNasc")} />
                    <input type="date" value={dtNasc}
                        onChange={(e) => setDtNasc(e.target.value)}
                        onBlur={() => marcarTocado("dtNasc")}
                    />

                    <LabelComErro label="Documento:" erro={mostrarErro("documento")} />
                    <input
                        type="text"
                        placeholder={pf === "pf" ? "CPF (000.000.000-00)" : "CNPJ (00.000.000/0000-00)"}
                        onChange={(e) => handleDocumento(e.target.value)}
                        onBlur={() => marcarTocado("documento")}
                        value={documento}
                    />

                    <LabelComErro label="CEP:" erro={mostrarErro("cep")} />
                    <input type="text" value={cep}
                        onChange={(e) => atualizarCEP(e.target.value)}
                        onBlur={() => marcarTocado("cep")}
                    />

                    <div className={styles.logradouro}>
                        <div className={styles.blocoEndereco}>
                            <LabelComErro label="Endereço:" erro={mostrarErro("endereco")} />
                            <input type="text" value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                onBlur={() => marcarTocado("endereco")}
                            />
                        </div>

                        <div className={styles.blocoEndereco}>
                            <LabelComErro label="Número:" erro={mostrarErro("numero")} />
                            <input type="number" value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                onBlur={() => marcarTocado("numero")}
                            />
                        </div>
                    </div>

                    <p>Descrição do Cliente:</p>
                    <textarea value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
            </div>
        </FormularioCard>
    );
}

export default ClienteEdicaoV2;