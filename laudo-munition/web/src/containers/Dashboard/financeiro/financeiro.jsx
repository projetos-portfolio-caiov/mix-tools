import { useEffect, useState } from "react";
import styles from "../Dashboard.module.css";

import KPI from "../../../components/kpi/KPI";
import GraficoDonuts from "../../../components/dashsVisaoFinanceira/GraficoDonuts";
import KpiInfo from "../../../components/kpi/KpiInfo";
import TabelaPercentualFinanceiro from "../../../components/dashsVisaoFinanceira/TabelaPercentualFinanceiro";
import { useOutletContext } from "react-router-dom";
import { api } from "../../../api";

import IconSifrao from "../../../components/icons/IconSifrao.svg";
import IconCarrinho from "../../../components/icons/IconCarrinho.svg";
import IconSeta from "../../../components/icons/IconSeta.svg";

function Financeiro() {
  const { periodoSelecionado, setPeriodoSelecionado } = useOutletContext();

  const [graficoSetor, setGraficoSetor] = useState({
    ganhos: [],
    gastos: [],
  });

  const [canaisUtilizados, setCanaisUtilizados] = useState({
    categoriaMais: "",
    categoriaMenos: "",
  });

  const [kpisFinanceiro, setKpisFinanceiro] = useState({
    faturamento: 0,
    gastos: 0,
    lucro: 0,
  });

  const [qtdVendas, setQtdVendas] = useState(0);

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

  function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const filtro = mapearFiltro(periodoSelecionado);

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
    },
  };

  function carregarKpisFinanceiro() {
    api
      .get(`/dashboardFinanceira/buscarKpisFinanceiro/${filtro}`, config)
      .then((res) => {
        console.log("KPIs financeiro:", res.data);

        setKpisFinanceiro({
          faturamento: res.data.faturamento || 0,
          gastos: res.data.gastos || 0,
          lucro: res.data.lucro || 0,
        });
      })
      .catch((err) => console.error(err));
  }

  function carregarQtdVendas() {
    api
      .get(`/dashboardFinanceira/qtdVendas/${filtro}`, config)
      .then((res) => {
        console.log("Qtd vendas:", res.data);
        setQtdVendas(res.data.qtd || 0);
      })
      .catch((err) => console.error(err));
  }

  function carregarGraficoSetor() {
    api
      .get(`/dashboardFinanceira/graficoSetor/${filtro}`, config)
      .then((res) => {
        console.log("Gráfico setor:", res.data);
        setGraficoSetor(res.data);
      })
      .catch((err) => console.error(err));
  }

  function carregarCanaisUtilizados() {
    api
      .get(`/dashboardFinanceira/canaisUtilizados/${filtro}`, config)
      .then((res) => {
        console.log("Canais utilizados:", res.data);
        setCanaisUtilizados(res.data);
      })
      .catch((err) => console.error(err));
  }

  function carregarDados() {
    carregarKpisFinanceiro();
    carregarQtdVendas();
    carregarGraficoSetor();
    carregarCanaisUtilizados();
  }

  useEffect(() => {
    carregarDados();
  }, [periodoSelecionado]);

  // Ajustado conforme categorias que realmente vêm da API
  const categoriasFixasGanhos = ["Facebook", "YouTube"];
  const categoriasFixasGastos = ["Site", "Rádio", "Email Marketing"];

  function gerarCor(index, tipo) {
    const hueBase = tipo === "ganho" ? 120 : 0;
    const hue = (hueBase + index * 35) % 360;
    return `hsl(${hue}, 85%, 45%)`;
  }

  function montarLegenda(lista, tipo) {
    const agrupado = lista.reduce((acc, item) => {
      const categoria = item.categoria;
      const valor = Number(item.valor_total || 0);

      if (!acc[categoria]) {
        acc[categoria] = 0;
      }

      acc[categoria] += valor;
      return acc;
    }, {});

    const listaAgrupada = Object.entries(agrupado).map(
      ([categoria, valor_total]) => ({
        categoria,
        valor_total,
      })
    );

    const total = listaAgrupada.reduce(
      (acc, item) => acc + Number(item.valor_total || 0),
      0
    );

    return listaAgrupada.map((item, index) => ({
      label: item.categoria,
      color: gerarCor(index, tipo),
      value:
        total > 0
          ? Number(((Number(item.valor_total || 0) / total) * 100).toFixed(1))
          : 0,
    }));
  }

  const ganhosFixos = graficoSetor.ganhos.filter((item) =>
    categoriasFixasGanhos.includes(item.categoria)
  );

  const ganhosVariaveis = graficoSetor.ganhos.filter(
    (item) => !categoriasFixasGanhos.includes(item.categoria)
  );

  const gastosFixos = graficoSetor.gastos.filter((item) =>
    categoriasFixasGastos.includes(item.categoria)
  );

  const gastosVariaveis = graficoSetor.gastos.filter(
    (item) => !categoriasFixasGastos.includes(item.categoria)
  );

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
          icon={<img src={IconSifrao} alt="Faturamento" />}
          title={`Faturamento nos últimos ${periodoSelecionado} dias`}
          value={formatarMoeda(kpisFinanceiro.faturamento)}
          variation=""
        />

        <KPI
          icon={<img src={IconCarrinho} alt="Gastos" />}
          title={`Gastos nos últimos ${periodoSelecionado} dias`}
          value={formatarMoeda(kpisFinanceiro.gastos)}
          variation=""
        />

        <KPI
          icon={<img src={IconSeta} alt="Lucro" />}
          title={`Lucro nos últimos ${periodoSelecionado} dias`}
          value={formatarMoeda(kpisFinanceiro.lucro)}
          variation=""
        />

        <KPI
          icon={<img src={IconCarrinho} alt="Vendas" />}
          title={`Número de vendas nos últimos ${periodoSelecionado} dias`}
          value={`${qtdVendas} vendas`}
          variation=""
        />
      </div>

      <div className={styles.secaoGraficoFinanceiro}>
        <h2>Distribuição de Ganhos e Gastos</h2>

        <div className={styles.donutsRow}>
          <GraficoDonuts
            titulo="Ganhos Fixos"
            periodo={periodoSelecionado}
            legendItems={montarLegenda(ganhosFixos, "ganho")}
          />

          <GraficoDonuts
            titulo="Ganhos Variáveis"
            periodo={periodoSelecionado}
            legendItems={montarLegenda(ganhosVariaveis, "ganho")}
          />

          <GraficoDonuts
            titulo="Gastos Fixos"
            periodo={periodoSelecionado}
            legendItems={montarLegenda(gastosFixos, "gasto")}
          />

          <GraficoDonuts
            titulo="Gastos Variáveis"
            periodo={periodoSelecionado}
            legendItems={montarLegenda(gastosVariaveis, "gasto")}
          />
        </div>
      </div>

      <div className={styles.linhaKpiTabela}>
        <div className={styles.kpisInfoCol}>
          <KpiInfo
            label="Canal mais utilizado"
            valor={canaisUtilizados.categoriaMais || "—"}
            variacao=""
            positivo={true}
          />

          <KpiInfo
            label="Canal menos utilizado"
            valor={canaisUtilizados.categoriaMenos || "—"}
            variacao=""
            positivo={false}
          />
        </div>

        <TabelaPercentualFinanceiro
          periodo={periodoSelecionado}
          ganhosFixos={ganhosFixos}
          ganhosVariaveis={ganhosVariaveis}
          gastosFixos={gastosFixos}
          gastosVariaveis={gastosVariaveis}
        />
      </div>
    </>
  );
}

export default Financeiro;