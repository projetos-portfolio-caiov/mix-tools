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
import styles from "./GraficoAdesaodeClientela.module.css";
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

function GraficoAdesaodeClientela({ filtro, tipoPessoa, tipoCliente }) {
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
        `/dashboardClientes/buscarGraficoAdesao/${filtro}/${tipoPessoa}/${tipoCliente}`,
        config
      )
      .then((res) => {
        console.log("ADESAO RAW:", res.data);
        setDados(res.data || []);
      })
      .catch((err) => console.error(err));
  }, [filtro, tipoPessoa, tipoCliente]);

  if (!dados || dados.length === 0) {
    return <p>Carregando gráfico...</p>;
  }

  // 🔹 ordenar por ano + mês
  const ordenado = [...dados].sort((a, b) => {
    const dataA = `${a.ano}-${a.mes}`;
    const dataB = `${b.ano}-${b.mes}`;
    return dataA.localeCompare(dataB);
  });

  // 🔹 nomes dos meses
  const meses = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];

  // 🔹 labels (Jan, Fev...)
  const labels = ordenado.map(
    (item) => meses[Number(item.mes) - 1]
  );

  // 🔹 valores acumulados
  const valores = ordenado.map(
    (item) => Number(item.qtd_total_acumulada) || 0
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Clientes acumulados",
        data: valores,
        borderColor: "#001eff",
        backgroundColor: "#001eff",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
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
        text: "Adesão de clientela ao longo do tempo",
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
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={styles.graficoLinhaClientela}>
      <Line data={data} options={options} />
    </div>
  );
}

export default GraficoAdesaodeClientela;