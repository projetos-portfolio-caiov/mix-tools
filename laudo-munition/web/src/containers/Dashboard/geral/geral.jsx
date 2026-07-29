import styles from "../Dashboard.module.css";
import KPI from "../../../components/kpi/KPI";
import GraficoEntradaSaidaCategorias from "../../../components/dashsVisaoGeral/GraficoEntradaSaidaCategorias";
import GraficoDonutGanhos from "../../../components/dashsVisaoGeral/GraficoGanhosMes";
import GraficoDonutGastos from "../../../components/dashsVisaoGeral/GraficoGastosMes";
import GraficoQtdProdutosMes from "../../../components/dashsVisaoGeral/GraficoQtdProdutosMes";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { api } from "../../../api";

import IconSifrao from "../../../components/icons/IconSifrao.svg";
import IconCarrinho from "../../../components/icons/IconCarrinho.svg";
import IconSeta from "../../../components/icons/IconSeta.svg";
import IconCalendario from "../../../components/icons/IconCalendario.svg";
import IconClienteRosa from "../../../components/icons/IconClienteBranco.svg";

function Geral() {
  const { secaoAtiva, setSecaoAtiva, filtroA } = useOutletContext();
  const dash = "/dashboardGeral";

  const [kpisFinanceiras, setKpisFinanceiras] = useState({});
  const [kpiData, setKpiData] = useState({});
  const [kpiCliente, setKpiCliente] = useState({});
  const [graficoFinanceiro, setGraficoFinanceiro] = useState({
    ganhos: [],
    gastos: [],
  });

  const [graficoProdutos, setGraficoProdutos] = useState([]);

  function carregarKpis() {
    api
      .get(`${dash}/financeiro`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setKpisFinanceiras(res.data);
      });
  }

  function carregarKpiData() {
    api
      .get(`${dash}/dataFormatada`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setKpiData(res.data);
      });
  }

  function carregarKpiCliente() {
    api
      .get(`${dash}/qtdClientes`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setKpiCliente(res.data);
      });
  }

  function carregarGraficoFinanceiro() {
    api
      .get(`${dash}/graficoFinanceiroUnificado`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setGraficoFinanceiro(res.data);
      });
  }

  function carregarGraficoProdutos() {
    api
      .get(`${dash}/graficoProdutos`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log("Produtos:", res.data);
        setGraficoProdutos(res.data);
      });
  }

function formatarVariacaoPercentual(valor, textoBase = "vs mês anterior") {
  const numero = Number(valor || 0);

  const percentual = numero * 100;

  const seta = percentual < 0 ? "↘" : "↗";
  const sinal = percentual > 0 ? "+" : "";

  return `${seta} ${sinal}${percentual.toFixed(1).replace(".", ",")}% ${textoBase}`;
}

function formatarMoedaSimples(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

  function capturarBases() {
    carregarKpis();
    carregarKpiData();
    carregarKpiCliente();
    carregarGraficoFinanceiro();
    carregarGraficoProdutos();
  }

  useEffect(() => {
    capturarBases();
  }, []);

  return (
    <>
      <div className={styles.kpisDiv}>
        <KPI
          icon={<img src={IconSifrao} alt="Ícone sifrão" />}
          title="Faturamento no mês atual"
          value={formatarMoedaSimples(kpisFinanceiras.faturamentoAtual)}
          variation={formatarVariacaoPercentual(
            kpisFinanceiras.porcentagemFaturamentoAtual
          )}
        />

        <KPI
          icon={<img src={IconCarrinho} alt="Ícone carrinho" />}
          title="Gastos no mês atual"
          value={formatarMoedaSimples(kpisFinanceiras.gastoAtual)}
          variation={formatarVariacaoPercentual(
            kpisFinanceiras.porcentagemGastoAtual
          )}
        />

        <KPI
          icon={<img src={IconSeta} alt="Ícone seta" />}
          title="Lucro no mês atual"
          value={formatarMoedaSimples(kpisFinanceiras.lucroAtual)}
          variation={formatarVariacaoPercentual(
            kpisFinanceiras.porcentagemLucroAtual
          )}
        />
        <KPI
          icon={<img src={IconCalendario} alt="Ícone calendário" />}
          title="Dia com maior número de vendas"
          value="Quinta-feira"
          variation={kpiData.data_formatada || ""}
        />

        <KPI
          icon={<img src={IconClienteRosa} alt="Ícone cliente" />}
          title="Número de novos clientes"
          value={kpiCliente.qtd_clientes || "0"}
          variation={`${kpiCliente.porcentagem < 0 ? "↘" : "↗"}${(
                      Math.abs(kpiCliente.porcentagem) * 100
                      ).toFixed(1)}%`}
        />
      </div>

      <div className={styles.secaoGraficoFinanceiro}>
        <h2>Visão Financeira</h2>

        <div className={styles.linhaFinanceira}>
          <GraficoEntradaSaidaCategorias dados={graficoFinanceiro} />
          <GraficoDonutGanhos dados={graficoFinanceiro.ganhos} />
          <GraficoDonutGastos dados={graficoFinanceiro.gastos} />
        </div>
      </div>

      <GraficoQtdProdutosMes dados={graficoProdutos} />
    </>
  );
}

export default Geral;