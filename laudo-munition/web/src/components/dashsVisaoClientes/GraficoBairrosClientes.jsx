import { useEffect, useState } from "react";
import styles from "./GraficoBairrosClientes.module.css";
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
import { api } from "../../api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GraficoBairrosClientes({ filtro, tipoPessoa, tipoCliente }) {
  const [dados, setDados] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
    },
  };

  useEffect(() => {
    if (!filtro) return;

    api
      .get(
        `/dashboardClientes/buscarGraficoBairros/${filtro}/${tipoPessoa}/${tipoCliente}`,
        config
      )
      .then((res) => {
        console.log("BAIRROS RAW:", res.data);
        setDados(res.data || []);
      })
      .catch((err) => console.error(err));
  }, [filtro, tipoPessoa, tipoCliente]);

  if (!dados || dados.length === 0) {
    return <p>Carregando gráfico...</p>;
  }

  const labels = dados.map((item) => item.bairro);
  const quantities = dados.map((item) => Number(item.qtd) || 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Quantidade de clientes",
        data: quantities,
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
        text: "Bairros com maior número de clientes",
        color: "#1e1e1e",
        align: "start",
        font: {
          size: 16,
          weight: "600",
        },
        padding: { top: 8, bottom: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.x} clientes`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#333",
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: "#666",
          font: { size: 12 },
          stepSize: 1,
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        beginAtZero: true,
        suggestedMax: Math.max(...quantities) + 2,
      },
    },
  };

  return (
    <div className={styles.graficoQtdp}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default GraficoBairrosClientes;