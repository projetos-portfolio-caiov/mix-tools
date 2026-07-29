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
import style from "./GraficoQtdProdutos30d.module.css";
import { api } from "../../api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GraficoQtdProdutos30d({ filtro }) {
  const [dados, setDados] = useState([]);

  // 🔹 mapa para exibir dias corretamente
  const textoPeriodo = {
    ultimoMes: "30",
    ultimoTrimestre: "90",
    ultimoSemestre: "180",
    ultimoAno: "365",
  };

  const dias = textoPeriodo[filtro] || "30";

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
    },
  };

  useEffect(() => {
    if (!filtro) return;

    api
      .get(`/dashboardProduto/buscarGraficoQtdVendido/${filtro}`, config)
      .then((res) => {
        console.log("Grafico QTD produtos:", res.data);
        setDados(res.data);
      })
      .catch((err) => console.error(err));
  }, [filtro]);

  if (!dados || dados.length === 0) {
    return <p>Carregando gráfico...</p>;
  }

  const labels = dados.map((item) => item.nome);
  const quantities = dados.map((item) => item.qtd_total || 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Quantidade de vendas",
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
        text: `Quantidade de produtos vendidos nos ultimos ${dias} dias`, // ✅ agora correto
        align: "start",
        font: {
          size: 16,
          weight: "600",
        },
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
        suggestedMax: Math.max(...quantities) + 2,
      },
    },
  };

  return (
    <div className={style.graficoQtdp}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default GraficoQtdProdutos30d;