import styles from "./KpiInfo.module.css";

function KpiInfo({ label, valor, variacao, positivo }) {
  return (
    <div className={styles.kpiinfoCard}>
      <span className={styles.kpiinfoLabel}>{label}</span>
      <span className={styles.kpiinfoValor}>{valor}</span>
      <span
        className={`${styles.kpiinfoVariacao} ${
          positivo ? styles.positivo : styles.negativo
        }`}
      >
        {variacao}
      </span>
    </div>
  );
}

export default KpiInfo;