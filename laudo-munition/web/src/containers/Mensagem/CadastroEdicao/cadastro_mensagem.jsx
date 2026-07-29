import styles from "./FormularioMensagem.module.css";
import FormularioCard from "../../../components/FormularioCard/FormularioCard";
import UploadImagemCard from "../../../components/uploadImagem/UploadImagemCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api";

const erroStyle = {
    color: "#e53535",
    fontSize: "11px",
    margin: 0,
};

function validarTipo(valor) {
    if (!valor.trim()) return "Título é obrigatório.";
    return "";
}

function validarData(valor) {
    if (!valor) return "Data é obrigatória.";
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

function CadastroMensagem() {

    const navigate = useNavigate();

    const [texto, setTexto] = useState("")
    const [tipo, setTipo] = useState("")
    const [dtEvento, setDtEvento] = useState("")
    const [tocados, setTocados] = useState({});

    function marcarTocado(campo) {
        setTocados(prev => ({ ...prev, [campo]: true }));
    }

    const erros = {
        tipo: validarTipo(tipo),
        dtEvento: validarData(dtEvento),
    };

    function formularioValido() {
        return Object.values(erros).every(e => e === "");
    }

    function mostrarErro(campo) {
        return tocados[campo] ? erros[campo] : "";
    }

    function voltarListagem() {
        navigate("/mensagem/listagem")
    }

    function cadastrarMensagem() {
        const todosTocados = Object.keys(erros).reduce((acc, k) => ({ ...acc, [k]: true }), {});
        setTocados(todosTocados);

        if (!formularioValido()) return;

        const dtFormatada = dtEvento ? `${dtEvento}T00:00:00` : null;

        api.post(
            "/mensagens",
            {
                "texto": texto,
                "imagem": "teste.png",
                "tipo": tipo,
                "dtEvento": dtFormatada
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

    return (
        <FormularioCard title={"Cadastro de Mensagem"} sucesso={cadastrarMensagem} cancelar={voltarListagem}>
            <div className={styles.elements}>
                <div className={styles.formLadoA}>

                    <LabelComErro label="Título da mensagem:" erro={mostrarErro("tipo")} />
                    <input
                        type="text"
                        placeholder="Insira aqui o título da mensagem"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        onBlur={() => marcarTocado("tipo")}
                    />

                    <LabelComErro label="Data:" erro={mostrarErro("dtEvento")} />
                    <input
                        type="date"
                        value={dtEvento}
                        onChange={(e) => setDtEvento(e.target.value)}
                        onBlur={() => marcarTocado("dtEvento")}
                    />

                    <p>Corpo da mensagem:</p>
                    <textarea
                        placeholder="Insira aqui o corpo da mensagem"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                    />

                </div>

                <div className={styles.formDivisor}></div>

                <div className={styles.formLadoB}>
                    <UploadImagemCard />
                </div>
            </div>
        </FormularioCard>
    );
}

export default CadastroMensagem;