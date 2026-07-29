import styles from "./CadastroEdicaoCanal.module.css"
import FormularioCard from "../../../components/FormularioCard/FormularioCard";
import BtnSelecao from "../../../components/botõesDeSeleção/BtnSelecao";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api";

const erroStyle = {
    color: "#e53535",
    fontSize: "11px",
    margin: 0,
};

function validarNome(valor) {
    if (!valor.trim()) return "Selecione um canal.";
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

function CadastroCanal() {
    const navigate = useNavigate()

    const [categoria, setCategoria] = useState("saida");
    const [periodicidade, setPeriodicidade] = useState("fixa");
    const [descricao, setDescricao] = useState("")
    const [nome, setNome] = useState("")
    const [tocados, setTocados] = useState({});

    const opcoesCategoria = [
        { value: "saida", label: "Saída" },
        { value: "entrada", label: "Entrada" },
    ];

    const opcoesPeriodicidade = [
        { value: "fixa", label: "Fixa" },
        { value: "variavel", label: "Variável" },
    ];

    function marcarTocado(campo) {
        setTocados(prev => ({ ...prev, [campo]: true }));
    }

    const erros = {
        nome: validarNome(nome),
    };

    function formularioValido() {
        return Object.values(erros).every(e => e === "");
    }

    function mostrarErro(campo) {
        return tocados[campo] ? erros[campo] : "";
    }

    function enviarCadastroCanal() {
        const todosTocados = Object.keys(erros).reduce((acc, k) => ({ ...acc, [k]: true }), {});
        setTocados(todosTocados);

        if (!formularioValido()) return;

        let periodicidadePayload = 0;
        let metodoPayload = 0;

        if (periodicidade == "fixa") periodicidadePayload = 1;
        if (categoria == "entrada") metodoPayload = 1;

        api.post(
            "/canais",
            {
                "categoria": nome,
                "metodo": metodoPayload,
                "periodicidade": periodicidadePayload,
                "valor": 0.0,
                "descricao": descricao
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
                }
            }
        ).then((res) => {
            console.log(res)
            voltarListagem()
        })
    }

    function voltarListagem() {
        navigate("/canal/listagem")
    }

    return (
        <FormularioCard title={"Cadastro de Canal"} sucesso={enviarCadastroCanal} cancelar={voltarListagem}>
            <div className={styles.elements}>
                <div className={styles.formLadoA}>

                    <LabelComErro label="Nome do canal:" erro={mostrarErro("nome")} />
                    <input
                        type="text"
                        placeholder="Insira o nome do canal"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        onBlur={() => marcarTocado("nome")}
                    />

                    <p>Método do canal:</p>
                    <BtnSelecao
                        options={opcoesCategoria}
                        value={categoria}
                        onChange={setCategoria}
                    />

                    <p>Periodicidade do canal:</p>
                    <BtnSelecao
                        options={opcoesPeriodicidade}
                        value={periodicidade}
                        onChange={setPeriodicidade}
                    />

                    <p>Descrição do canal:</p>
                    <textarea
                        placeholder="Descreva o canal a ser cadastrado"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                </div>
            </div>
        </FormularioCard>
    );
}

export default CadastroCanal;