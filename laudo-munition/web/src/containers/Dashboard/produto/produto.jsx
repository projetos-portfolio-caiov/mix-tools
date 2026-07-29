import styles from "../Dashboard.module.css";

import KPI from "../../../components/kpi/KPI";
import GraficoGanhosProdutos30d from "../../../components/dashsVisaoProdutos/GraficoGanhosProdutos30d";
import GraficoQtdProdutos30d from "../../../components/dashsVisaoProdutos/GraficoQtdProdutos30d";

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { api } from "../../../api";

import IconCarrinho from "../../../components/icons/IconCarrinho.svg";
import IconSeta from "../../../components/icons/IconSeta.svg";

function Produto() {
  const { periodoSelecionado, setPeriodoSelecionado } = useOutletContext();

  const [totalVendidos, setTotalVendidos] = useState(0);
  const [produtoTop, setProdutoTop] = useState(null);

  function mapearFiltro(periodo) {
    switch (periodo) {
      case 30:
        return "ultimoMes";
      case 90:
        return "ultimoTrimestre";
      case 180:
        return "ultimoSemestre";
      case 365:
        return "ultimoAno";
      default:
        return "ultimoMes";
    }
  }

  const filtro = mapearFiltro(periodoSelecionado);

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
    },
  };

  function carregarTotalVendidos() {
    api
      .get(`/dashboardProduto/buscarQtdVendidos/${filtro}`, config)
      .then((res) => {
        console.log("Total vendidos:", res.data);
        setTotalVendidos(res.data?.qtd_total ?? 0);
      })
      .catch((err) => console.error(err));
  }

  function carregarProdutoTop() {
    api
      .get(`/dashboardProduto/buscarTotalVendido/${filtro}`, config)
      .then((res) => {
        console.log("Produto top RAW:", res.data);

        let produto = res.data;

        if (Array.isArray(produto)) {
          produto = produto[0];
        }

        setProdutoTop(produto || null);
      })
      .catch((err) => console.error(err));
  }

  function carregarDados() {
    carregarTotalVendidos();
    carregarProdutoTop();
  }

  useEffect(() => {
    carregarDados();
  }, [periodoSelecionado]);

  return (
    <>
      <div className={styles.filtro}>
        <label>Selecione um período:</label>

        <select
          value={periodoSelecionado}
          onChange={(e) => setPeriodoSelecionado(Number(e.target.value))}
        >
          <option value={30}>Últimos 30 dias</option>
          <option value={90}>Últimos 90 dias</option>
          <option value={180}>Últimos 180 dias</option>
          <option value={365}>Últimos 365 dias</option>
        </select>
      </div>

      <div className={styles.kpisDiv}>
        <KPI
          icon={<img src={IconCarrinho} alt="Produtos vendidos" />}
          title="Total de produtos vendidos"
          value={totalVendidos}
          variation=""
        />

        <KPI
          icon={<img src={IconSeta} alt="Produto mais vendido" />}
          title="Produto com maior número de vendas"
          value={produtoTop?.nome_produto || produtoTop?.nome || "—"}
          variation=""
        />
      </div>

      <div className={styles.financeiroContainer}>
        <div className={styles.graficoBox}>
          <GraficoGanhosProdutos30d filtro={filtro} />
        </div>

        <div className={styles.graficoBox}>
          <GraficoQtdProdutos30d filtro={filtro} />
        </div>
      </div>
    </>
  );
}

export default Produto;