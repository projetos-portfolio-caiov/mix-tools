import styles from "./FormularioProduto.module.css"
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

function EdicaoProduto() {
    const navigate = useNavigate()
    const [id, setId] = useState("")

    const { produtos, produtoSelecionado } = useOutletContext();
    
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState();
    const [imagem, setImagem] = useState("");
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

    function enviarAtualizacaoProduto() {
        const todosTocados = Object.keys(erros).reduce((acc, k) => ({ ...acc, [k]: true }), {});
        setTocados(todosTocados);

        if (!formularioValido()) return;

        api.put(
            `/produtos/${id}`,
            {
                "nome": nome,
                "descricao": descricao,
                "imagem": imagem,
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

    function voltarListagem() {
        navigate("/produto/listagem")
    }
    
    useEffect(() => {
        const produto = produtos.find(c => c.id === produtoSelecionado)
        console.log("produto")
        console.log(produto)

        if(produto) {
            setNome(produto.nome)
            setDescricao(produto.descricao)
            setValor(produto.preco = parseFloat(produto.preco.replace("R$", "").trim()).toFixed(2))
            setImagem("https://s3-confeitaria-nocelli-raw.s3.us-east-1.amazonaws.com/img/produto/" + produto.imagem)
            setId(produto.id)
        }   
    }, []);

    return (
        <FormularioCard title={"Edição de Produto"} sucesso={enviarAtualizacaoProduto} cancelar={voltarListagem}>
            <div className={styles.elements}>
                <div className={styles.formLadoA}>
                    <LabelComErro label="Nome do produto:" erro={mostrarErro("nome")} />
                    <input
                        type="text"
                        placeholder="Insira aqui o nome do produto"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        onBlur={() => marcarTocado("nome")}
                    />

                    <LabelComErro label="Valor do produto:" erro={mostrarErro("valor")} />
                    <input
                        type="number"
                        placeholder="Insira aqui o valor do produto"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        onBlur={() => marcarTocado("valor")}
                    />

                    <p>Descrição do produto:</p>
                    <textarea
                        placeholder="Insira aqui a descrição do produto"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>

                <div className={styles.formDivisor}></div>

                <img src={imagem} alt="Upload" className={styles.formLadoB} />
            </div>
        </FormularioCard>
    );
}

export default EdicaoProduto;