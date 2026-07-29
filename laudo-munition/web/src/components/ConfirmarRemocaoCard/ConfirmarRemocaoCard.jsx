import styles from "./ConfirmarRemocaoCard.module.css";

function ConfirmarRemocaoCard({ titulo, mensagem, onConfirmar, onCancelar }) {

    return (
        <div className={styles.overlay}>

            <div className={styles.card}>

                <h2 className={styles.titulo}>
                    {titulo || "Confirmar remoção"}
                </h2>

                <p className={styles.mensagem}>
                    {mensagem || "Tem certeza que deseja remover este item? Esta ação não poderá ser desfeita."}
                </p>

                <div className={styles.botoes}>

                    <button
                        className={styles.botaoCancelar}
                        onClick={onCancelar}
                    >
                        Cancelar
                    </button>

                    <button
                        className={styles.botaoConfirmar}
                        onClick={onConfirmar}
                    >
                        Remover
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmarRemocaoCard;