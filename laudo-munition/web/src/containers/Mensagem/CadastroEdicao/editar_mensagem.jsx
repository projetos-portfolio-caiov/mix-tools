import styles from "./FormularioMensagem.module.css";
import FormularioCard from "../../../components/FormularioCard/FormularioCard";
import UploadImagemCard from "../../../components/uploadImagem/UploadImagemCard";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../../../api";
import { useState, useEffect } from "react";

const erroStyle = {
    color: "#e53535",
    fontSize: "11px",
    margin: 0,
};

function validarTipo(valor) {
    if (!valor || !valor.trim()) return "Título é obrigatório.";
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

function EditarMensagem() {

    const navigate = useNavigate()
    const [id, setId] = useState("")

    const { mensagens, mensagemSelecionado } = useOutletContext();

    const [dtEvento, setDtEvento] = useState("")
    const [imagem, setImagem] = useState("");
    const [texto, setTexto] = useState("")
    const [tipo, setTipo] = useState("")
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

    function enviarAtualizacaoMensagem() {
        const todosTocados = Object.keys(erros).reduce((acc, k) => ({ ...acc, [k]: true }), {});
        setTocados(todosTocados);

        if (!formularioValido()) return;

        api.put(
            `/mensagens/${id}`,
            {
                "texto": texto,
                "tipo": tipo,
                "imagem": imagem,
                "dtEvento": dtEvento
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

    useEffect(() => {
        const mensagem = mensagens.find(c => c.id === mensagemSelecionado)
        console.log("mensagem")
        console.log(mensagem)

        if (mensagem) {
            const [dia, mes, ano] = mensagem.dtEvento.split("/")
            setDtEvento(`${ano}-${mes}-${dia}`)
            setTexto(mensagem.texto)
            setTipo(mensagem.tipo)
            setImagem(`https://s3-confeitaria-nocelli-raw.s3.us-east-1.amazonaws.com/img/msg/` + mensagem.imagem)
            setId(mensagem.id)
        }
    }, []);

    return (
        <FormularioCard title={"Edição de Mensagem"} sucesso={enviarAtualizacaoMensagem} cancelar={voltarListagem}>
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

                <img src={imagem} alt="Upload" className={styles.formLadoB} />
            </div>
        </FormularioCard>
    );
}

export default EditarMensagem;