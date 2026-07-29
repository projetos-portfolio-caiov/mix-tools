import styles from "./FormularioCard.module.css"

function FormularioCard({ title, children, sucesso, cancelar }) {

    return (
        <div className={styles.formularioCard}>

            <div className={styles.formCardContent}>

                <header className={styles.formCardHeader}>
                    {title}
                </header>

                <div className={styles.formElements}>
                    {children}
                </div>

                <footer className={styles.formCardFooter}>
                    <button onClick={sucesso}>Confirmar</button>
                    <button onClick={cancelar} className={styles.btnCancelarEnvioMensagem}>Cancelar</button>
                </footer>

            </div>

        </div>
    )
}

export default FormularioCard;