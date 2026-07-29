import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./GraficoQtdProdutosMes.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GraficoQtdProdutosMes({ dados }) {
  const [labels, setLabels] = useState([]);
  const [valores, setValores] = useState([]);

  useEffect(() => {
  if (!dados || dados.length === 0) {
    setLabels([]);
    setValores([]);
    return;
  }

  console.log("DADOS PRODUTOS:", dados);

  const nomes = dados.map(item =>
    item.nome_produto || "Sem nome"
  );

  const quantidades = dados.map(item =>
    Number(item.qtd_produtos) || 0
  );

  setLabels(nomes);
  setValores(quantidades);
}, [dados]);

  const data = {
    labels,
    datasets: [
      {
        label: "Quantidade de vendas",
        data: valores,
        backgroundColor: "rgba(54, 121, 255, 0.85)",
        borderColor: "rgba(54, 121, 255, 1)",
        borderWidth: 1.5,
        borderRadius: 6,
        barThickness: 22,
        maxBarThickness: 28,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Quantidade de produtos vendidos no mês atual",
        align: "start",
        font: {
          size: 16,
          weight: "600",
        },
        padding: { top: 8, bottom: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.x} vendas`,
        },
      },
    },
    scales: {
      y: {
        grid: { display: false },
      },
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.container}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default GraficoQtdProdutosMes;