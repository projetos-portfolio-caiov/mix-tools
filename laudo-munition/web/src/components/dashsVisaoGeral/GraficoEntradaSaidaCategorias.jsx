import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./GraficoEntradaSaidaCategorias.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function GraficoEntradaSaidaCategorias({ dados }) {

  // Proteção
  if (!dados || !dados.ganhos || !dados.gastos) {
    return <p>Carregando gráfico...</p>;
  }

  // Junta categorias
  const categorias = [
    ...new Set([
      ...dados.ganhos.map(item => item.categoria),
      ...dados.gastos.map(item => item.categoria)
    ])
  ];

  // Entradas (ganhos)
  const entradas = categorias.map(cat => {
    const item = dados.ganhos.find(g => g.categoria === cat);
    return item ? item.valor_total : 0;
  });

  // Saídas (gastos)
  const saidas = categorias.map(cat => {
    const item = dados.gastos.find(g => g.categoria === cat);
    return item ? item.valor_total : 0;
  });

  const data = {
    labels: categorias,
    datasets: [
      {
        label: "Entrada",
        data: entradas,
        backgroundColor: "#32CD32"
      },
      {
        label: "Saída",
        data: saidas,
        backgroundColor: "#ff6b6b"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom"
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 60,
          minRotation: 40
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.titulo}>
        Entradas e Saídas por Categoria
      </h3>

      <div className={styles.chartBox}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}