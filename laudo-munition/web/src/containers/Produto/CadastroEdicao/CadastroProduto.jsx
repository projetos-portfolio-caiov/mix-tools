import styles from "./FormularioProduto.module.css"
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

function validarNome(valor) {
    if (!valor.trim()) return "Nome é obrigatório.";
    return "";
}

function validarValor(valor) {
    if (!valor) return "Valor é obrigatório.";
    if (Number(valor) < 0) return "Valor do produto não pode ser negativo.";
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

function CadastroProduto() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("")
    const [valor, setValor] = useState("")
    const [descricao, setDescricao] = useState("")
    const [tocados, setTocados] = useState({});

    function marcarTocado(campo) {
        setTocados(prev => ({ ...prev, [campo]: true }));
    }

    const erros = {
        nome: validarNome(nome),
        valor: validarValor(valor),
    };

    function formularioValido() {
        return Object.values(erros).every(e => e === "");
    }

    function mostrarErro(campo) {
        return tocados[campo] ? erros[campo] : "";
    }

    function voltarListagem() {
        navigate("/produto/listagem")
    }

    function cadastrarProduto() {
        const todosTocados = Object.keys(erros).reduce((acc, k) => ({ ...acc, [k]: true }), {});
        setTocados(todosTocados);

        if (!formularioValido()) return;

        api.post(
            "/produtos",
            {
                "nome": nome,
                "descricao": descricao,
                "imagem": "teste.png",
                "preco": valor
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
        <FormularioCard title={"Cadastro de Produto"} sucesso={cadastrarProduto} cancelar={voltarListagem}>
            <div className={styles.elements}>
                <div className={styles.formLadoA}>
                    <LabelComErro label="Nome do produto:" erro={mostrarErro("nome")} />
                    <input
                        type="text"
                        placeholder="Insira aqui o nome do produto"
                        onChange={(e) => setNome(e.target.value)}
                        onBlur={() => marcarTocado("nome")}
                        value={nome}
                    />

                    <LabelComErro label="Valor do produto:" erro={mostrarErro("valor")} />
                    <input
                        type="number"
                        placeholder="Insira aqui o valor do produto"
                        onChange={(e) => setValor(e.target.value)}
                        onBlur={() => marcarTocado("valor")}
                        value={valor}
                    />

                    <p>Descrição do produto:</p>
                    <textarea
                        placeholder="Insira aqui a descrição do produto"
                        onChange={(e) => setDescricao(e.target.value)}
                        value={descricao}
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

export default CadastroProduto;