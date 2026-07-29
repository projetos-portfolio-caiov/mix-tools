import styles from "./KPI.module.css";

function KPI({ icon, title, value, variation }) {
  const variationClass = variation.includes('↘')
    ? styles.negativo
    : variation.includes('↗')
    ? styles.positivo
    : styles.nenhum;

  return (
    <div className={styles.kpiContainer}>
      <div className={styles.kpiIcon}>{icon}</div>

      <div className={styles.kpiInfo}>
        <p className={styles.kpiTitle}>{title}</p>
        <h2 className={styles.kpiValue}>{value}</h2>
        <p className={`${styles.kpiVariation} ${variationClass}`}>
          {variation}
        </p>
      </div>
    </div>
  );
}

export default KPI;