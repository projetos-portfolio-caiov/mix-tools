import styles from "./ListagemCheckBoxProd.module.css";

function ListagemCheckBoxProd() {
  return (
    <div className={styles.listaStyle}>

      <div className={styles.selecionarTodosAbaixo}>
        <input
          type="checkbox"
          className={styles.checkboxSelecionarTodosAbaixo}
        />

        <div className={styles.estruturaRegistroListagem}>
          <span className={styles.textoCampoFormulario}>
            Bolo de cenoura com cobertura de chocolate
          </span>

          <input type="number" name="" id="" min={0} placeholder="0"/>

        </div>
      </div>
    </div>
  );
}

export default ListagemCheckBoxProd;