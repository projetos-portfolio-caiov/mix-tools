import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import style from "./GraficoGanhosProdutos30d.module.css";
import { api } from "../../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraficoGanhosProdutos30d({ filtro }) {
  const [dados, setDados] = useState([]);

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
      .get(`/dashboardProduto/buscarGraficoProdutoCategoria/${filtro}`, config)
      .then((res) => {
        console.log("GANHOS RAW:", res.data);
        setDados(res.data);
      })
      .catch((err) => console.error(err));
  }, [filtro]);

  if (!dados || dados.length === 0) {
    return <p>Carregando gráfico...</p>;
  }

  // 🔹 labels (produtos únicos)
  const labels = [...new Set(dados.map((item) => item.produto))];

  // 🔹 categorias únicas
  const categorias = [...new Set(dados.map((item) => item.categoria))];

  // 🔥 GERADOR DE COR DINÂMICO (HSL)
  function gerarCor(index) {
    const hue = (index * 137) % 360; // distribuição uniforme
    return `hsl(${hue}, 70%, 50%)`;
  }

  // 🔹 datasets (uma linha por categoria)
  const datasets = categorias.map((categoria, index) => {
    const cor = gerarCor(index);

    return {
      label: categoria,
      data: labels.map((produto) => {
        const item = dados.find(
          (d) => d.produto === produto && d.categoria === categoria
        );
        return item ? Number(item.valor_total) : 0;
      }),
      borderColor: cor,
      backgroundColor: cor,
      tension: 0.4,
      pointRadius: 4,
    };
  });

  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `Maiores ganhos por produto nos últimos ${dias} dias`,
        align: "start",
        font: {
          size: 16,
          weight: "600",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={style.graficoLinhaFinanceiro}>
      <Line data={data} options={options} />
    </div>
  );
}

export default GraficoGanhosProdutos30d;