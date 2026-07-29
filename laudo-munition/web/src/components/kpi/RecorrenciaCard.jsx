import styles from "./RecorrenciaCard.module.css";

function RecorrenciaCard({ title, subtitle, taxaGeral, categorias }) {
  const cat = categorias?.[0];

  return (
    <div className={styles.recorrenciaContainer}>
      <div className={styles.recorrenciaHeader}>
        <div className={styles.recorrenciaTituloGrupo}>
          <h3 className={styles.recorrenciaTitle}>{title}</h3>
          <p className={styles.recorrenciaSubtitle}>{subtitle}</p>
        </div>

        <div className={styles.recorrenciaTaxaGeral}>
          <span className={styles.recorrenciaTaxaLabel}>Taxa Geral</span>
          <span className={styles.recorrenciaTaxaValor}>{taxaGeral}</span>
        </div>
      </div>

      {cat && (
        <div className={styles.recorrenciaCentro}>
          <p
            className={`${styles.recorrenciaVariacaoGrande} ${
              cat.positivo ? styles.positivo : styles.negativo
            }`}
          >
            {cat.positivo ? "↗" : "↘"} {cat.variacao}
          </p>

          <div className={styles.recorrenciaComparacaoMeses}>
            <div className={styles.blocoMes}>
              <span>Mês atual</span>
              <strong>{cat.nome}</strong>
            </div>

            <div className={styles.vs}>vs</div>

            <div className={styles.blocoMes}>
              <span>Mês anterior</span>
              <strong>{cat.comparativo}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecorrenciaCard;