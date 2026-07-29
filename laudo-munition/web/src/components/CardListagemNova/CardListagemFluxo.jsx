import styles from "./CardListagemFluxo.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CardClienteFluxo({ id, info1, info2, info3, info4, setSelecionado, url, remover }) {

    const navigate = useNavigate();

    function redirecionarEdicao(value) {
        console.log(value);
        setSelecionado(value);
        navigate(`/${url}/edicao`);
    }

    // Função auxiliar para montar o texto do produto
    function montarTextoProduto(compras) {
        let compra = null;

        for(let i = 0; i < compras.length; i++) {
            if(compras[i].id != null) {
                compra = compras[i];
                break;
            }
        }

        if (!compra || compra.id === "Não identificado") return "Sem Produto";
        
        const qtd = compra.qtd || 0;
        const nomeProduto = compra.produto?.nome || compra.produto?.tipo || "Produto removido";
        const descricao = compra.produto?.descricao ? ` (${compra.produto.descricao})` : "";
        
        return `${qtd}x - ${nomeProduto}${descricao}`;
    }

    return (    
        <div className={styles.conteudo}>

            <div className={styles.coluna}>
                {info2.dtHora}
            </div>

            <div className={styles.coluna}>
                <p>{info1.metodo === 1 ? "Entrada" : "Saída"}</p>
            </div>

            <div className={styles.coluna}>
                <p>{info1.categoria}</p>
            </div>

            <div className={styles.coluna}>
                <p>{`R$ ${(parseFloat(info2.valor).toFixed(2)).replace('.', ',')}`}</p>
            </div>

            {/* Renderização corrigida do produto */}
            <div className={styles.coluna}>
                <p>
                    {info3.length > 1
                        ? `${montarTextoProduto(info3)}, ...`
                        : montarTextoProduto(info3)
                    }
                </p>
            </div>

            <div className={styles.coluna}>
                <p>{info4.nome}</p>
            </div>
            
            <div className={`${styles.coluna} ${styles.acoes}`}>
                
                <button className={`${styles.botao} ${styles.editar}`}>
                    <FaEdit onClick={() => redirecionarEdicao(id)}/>
                </button>

                <button className={`${styles.botao} ${styles.excluir}`}>
                    <FaTrash onClick={() => remover(id)} />
                </button>
                
            </div>
        </div>
    );
}

export default CardClienteFluxo;