import styles from "./CardListagem.module.css";
import { FaWhatsapp, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CardCliente({ info1, info2, info3, info4, info5, info6, setSelecionado, remover, id, url }) {
    const navigate = useNavigate();

    function redirecionarEdicao(id) {
        setSelecionado(id)
        navigate(`/${url}/edicao`);
    }

    return (
        <div className={styles.conteudo}>
            <div className={styles.coluna}>{info1}</div>

            <div className={styles.coluna}>
                <strong>{info2}</strong>
                <p>{info3}</p>
            </div>

            <div className={styles.coluna}>
                <p>{info4}</p>
                <p>{info5}</p>
            </div>

            <div className={styles.coluna}>
                <p>{info6}</p>
            </div>

            <div className={`${styles.coluna} ${styles.acoes}`}>
                <button className={
                    `${styles.botao} ${styles.whatsapp}`}
                    onClick={() => window.open(`https://wa.me/${info4.replace(/\D/g, '')}`, '_blank')}
                >
                    <FaWhatsapp />
                </button>

                <button
                    className={`${styles.botao} ${styles.editar}`}
                    onClick={() => redirecionarEdicao(id)}
                >
                    <FaEdit />
                </button>

                <button
                    className={`${styles.botao} ${styles.excluir}`}
                    onClick={() => remover(id)}
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}


export default CardCliente;