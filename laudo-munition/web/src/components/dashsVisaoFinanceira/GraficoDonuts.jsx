import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./GraficoDonuts.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function GraficoDonuts({ titulo, periodo, legendItems }) {
  const data = {
    labels: legendItems.map((item) => item.label),
    datasets: [
      {
        data: legendItems.map((item) => item.value),
        backgroundColor: legendItems.map((item) => item.color),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.parsed}%`,
        },
      },
    },
  };

  return (
    <div className={styles.donutCard}>
      <h4 className={styles.donutTitle}>
        {titulo} nos últimos {periodo} dias
      </h4>

      <div className={styles.donutWrapper}>
        <Doughnut data={data} options={options} />
      </div>

      <div className={styles.donutLegend}>
        {legendItems.map((item) => (
          <div className={styles.legendItem} key={item.label}>
            <span
              className={styles.legendDot}
              style={{ backgroundColor: item.color }}
            />
            <span className={styles.legendLabel}>{item.label}</span>
            <span className={styles.legendValue}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GraficoDonuts;