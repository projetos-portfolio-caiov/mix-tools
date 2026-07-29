import styles from "./card.module.css";
import { useNavigate } from "react-router-dom";

function CardMensagem({  key, info1, info2, info3, info4, setElementSelecionado, remover, imagem, id, url }) {
    const navigate = useNavigate();
    
    function redirecionarEdicao(id) {
        setElementSelecionado(id)
        navigate(`/${url}/edicao`);
    }

    return (
        <div className={styles.card}>

            <div className={styles.cardImg}>
                {imagem ? (
                    <img src={imagem} alt="" />
                ) : (
                    <div className={styles.imgPlaceholder}>X</div>
                )}
            </div>

            <div className={styles.cardContent}>
                <div className={styles.cardInfo}>
                    <h3>{info1}</h3>

                    <p className={styles.data}>
                        {info2}
                    </p>

                    <p className={styles.descricao}>
                        {info3}
                    </p>
                </div>

                <div>
                    <div className={styles.cardActions}>
                        <button className={styles.btnEditar} onClick={() => redirecionarEdicao(id)} data-testid="btn-editar">✏️</button>
                        <button className={styles.btnExcluir} onClick={() => remover(id)} data-testid="btn-remover">🗑️</button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default CardMensagem;