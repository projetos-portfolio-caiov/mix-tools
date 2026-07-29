import styles from "./NavegacaoSecoes.module.css";
import { useNavigate, useLocation } from "react-router-dom";

function NavegacaoSecoes3Opt({rota1, rota2, rota3, nomeRota1, nomeRota2, nomeRota3}) {
  const navigate = useNavigate();
  const location = useLocation();

  function navegar(rota) {
    navigate(rota);
  }

  return (
    <div className={styles.tipoContainer}>

      <button 
        className={`${styles.tipoItem} ${location.pathname === rota1 ? styles.active : ""}`}
        onClick={() => navegar(rota1)}
      >
        {nomeRota1}
      </button>

      <button 
        className={`${styles.tipoItem} ${location.pathname === rota2 ? styles.active : ""}`}
        onClick={() => navegar(rota2)}
      >
        {nomeRota2}
      </button>

      <button 
        className={`${styles.tipoItem} ${location.pathname === rota3 ? styles.active : ""}`}
        onClick={() => navegar(rota3)}
      >
        {nomeRota3}
      </button>

    </div>
  );
}

export default NavegacaoSecoes3Opt;
