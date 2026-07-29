import styles from "./CardListagemCanal.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CardCanal({ info1, info2, info3, info4, setSelecionado, remover, id, url }) {
  
  const navigate = useNavigate()

  function navegarEdicao(id) {
    setSelecionado(id);
    let urlFinal = `/${url}/edicao/`
    navigate(urlFinal)
  }

  return (
    <div className={`${styles.conteudo} card-canal`}>

      <div className={styles.coluna}>
        {info1 === null ? "Não cadastrado" : info1}
      </div>

      <div className={styles.coluna}>
        {info2 === 1 ? "Entrada" : "Saída"}
      </div>

      <div className={styles.coluna}>
        {info3 === 1 ? "Programado" : "Variável"}
      </div>

      <div className={styles.coluna}>
        {info4 === null ? "Não cadastrado" : info4}
      </div>

      <div className={`${styles.coluna} ${styles.acoes}`}>

        <button id={id} className={`${styles.botao} ${styles.editar}`} onClick={() => navegarEdicao(id)}>
          <FaEdit />
        </button>

        <button id={id} className={`${styles.botao} ${styles.excluir}`} onClick={() => remover(id)}>
          <FaTrash />
        </button>

      </div>

    </div>
  );
}

export default CardCanal;
