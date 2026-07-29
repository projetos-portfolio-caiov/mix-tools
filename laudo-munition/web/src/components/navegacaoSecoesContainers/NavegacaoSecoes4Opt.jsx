import styles from "./NavegacaoSecoes.module.css";

function NavegacaoSecoes4Opt({ secaoAtiva, setSecaoAtiva }) {

  return (
    <div className={styles.tipoContainer}>

      <button 
        className={`${styles.tipoItem} ${secaoAtiva === "geral" ? styles.active : ""}`}
        onClick={() => setSecaoAtiva("geral")}
      >
        Geral
      </button>

      <button 
        className={`${styles.tipoItem} ${secaoAtiva === "financeiro" ? styles.active : ""}`}
        onClick={() => setSecaoAtiva("financeiro")}
      >
        Financeiro
      </button>

      <button 
        className={`${styles.tipoItem} ${secaoAtiva === "cliente" ? styles.active : ""}`}
        onClick={() => setSecaoAtiva("cliente")}
      >
        Clientes
      </button>

      <button 
        className={`${styles.tipoItem} ${secaoAtiva === "produto" ? styles.active : ""}`}
        onClick={() => setSecaoAtiva("produto")}
      >
        Produtos
      </button>

    </div>
  );
}

export default NavegacaoSecoes4Opt;