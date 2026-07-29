import styles from "./NavegacaoSecoes.module.css";
import { useNavigate, useLocation } from "react-router-dom";

function NavegacaoSecoes2Opt({ rota1, rota2, nomeRota1, nomeRota2 }) {
  const navigate = useNavigate();
  const location = useLocation();

  function navegar(rota) {
    navigate(rota);
  }

  return (
    <div className={styles.tipoContainer}>
      <button
        className={`${styles.tipoItem} ${
          location.pathname === rota1 ? styles.active : ""
        }`}
        onClick={() => navegar(rota1)}
      >
        {nomeRota1}
      </button>

      <button
        className={`${styles.tipoItem} ${
          location.pathname === rota2 ? styles.active : ""
        }`}
        onClick={() => navegar(rota2)}
      >
        {nomeRota2}
      </button>
    </div>
  );
}

export default NavegacaoSecoes2Opt;