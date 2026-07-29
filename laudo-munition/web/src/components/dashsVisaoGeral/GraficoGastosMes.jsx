import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import styles from "./GraficoPizzaFinanceiro.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraficoGastosMes({ dados }) {
  const [dadosFormatados, setDadosFormatados] = useState([]);

  useEffect(() => {
    if (!dados || dados.length === 0) {
      setDadosFormatados([]);
      return;
    }

    const total = dados.reduce(
      (acc, item) => acc + item.valor_total,
      0
    );

    if (total === 0) {
      setDadosFormatados([]);
      return;
    }

    const formatado = dados.map((item, index) => ({
      label: item.categoria,
      raw: item.valor_total,
      percent: ((item.valor_total / total) * 100).toFixed(1),
      color: gerarCor(index),
    }));

    setDadosFormatados(formatado);
  }, [dados]);

  function gerarCor(index) {
    const cores = [
      "#ffaaa3ff",
      "#ff5100ff",
      "#ff1744",
      "#870000ff",
      "#ff8a80",
      "#ff5252",
    ];
    return cores[index % cores.length];
  }

  const data = {
    labels: dadosFormatados.map((i) => i.label),
    datasets: [
      {
        data: dadosFormatados.map((i) => i.raw),
        backgroundColor: dadosFormatados.map((i) => i.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.graficoPizza}>
      <h3>Gastos no mês atual</h3>

      <div style={{ width: "250px", height: "250px" }}>
        <Doughnut data={data} options={options} />
      </div>

      <div className={styles.donutLegend}>
        {dadosFormatados.map((item) => (
          <div className={styles.legendItem} key={item.label}>
            <span
              className={styles.legendDot}
              style={{ backgroundColor: item.color }}
            />
            <span className={styles.legendLabel}>{item.label}</span>
            <span className={styles.legendValue}>
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}