import styles from "./CadastroEdicaoCanal.module.css"
import FormularioCard from "../../../components/FormularioCard/FormularioCard";
import BtnSelecao from "../../../components/botõesDeSeleção/BtnSelecao";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
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

function EdicaoCanal() {
    const navigate = useNavigate();
    const [id, setId] = useState("")

    const { canais, canalSelecionado } = useOutletContext();

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

    function enviarAtualizacaoCanal() {
        const todosTocados = Object.keys(erros).reduce((acc, k) => ({ ...acc, [k]: true }), {});
        setTocados(todosTocados);

        if (!formularioValido()) return;

        let periodicidadePayload = 0;
        let metodoPayload = 0;

        if (periodicidade == "fixa") periodicidadePayload = 1;
        if (categoria == "entrada") metodoPayload = 1;

        api.put(
            `/canais/${id}`,
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

    useEffect(() => {
        const canal = canais.find(c => c.id === canalSelecionado)
        console.log("canal")
        console.log(canal)

        if (canal) {
            setCategoria(canal.metodo === 1 ? "entrada" : "saida")
            setDescricao(canal.descricao)
            setNome(canal.categoria)
            setPeriodicidade(canal.metodo === 1 ? "fixa" : "variavel")
            setId(canal.id)
        }
    }, []);

    return (
        <FormularioCard title={"Edição de Canal"} sucesso={enviarAtualizacaoCanal} cancelar={voltarListagem}>
            <div className={styles.elements}>
                <div className={styles.formLadoA}>

                    <LabelComErro label="Nome do canal:" erro={mostrarErro("nome")} />
                    <input
                        type="text"
                        placeholder="Edite o nome do canal"
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
                        placeholder="Edite a descrição do canal"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                </div>
            </div>
        </FormularioCard>
    );
}

export default EdicaoCanal;