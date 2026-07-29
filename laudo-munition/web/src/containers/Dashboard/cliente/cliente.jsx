import { useState, useEffect } from "react";
import styles from "../Dashboard.module.css";

import KPI from "../../../components/kpi/KPI";
import GraficoAdesaodeClientela from "../../../components/dashsVisaoClientes/GraficoAdesaodeClientela";
import GraficoBairrosClientes from "../../../components/dashsVisaoClientes/GraficoBairrosClientes";
import RecorrenciaCard from "../../../components/kpi/RecorrenciaCard";
import { api } from "../../../api";

import IconClienteRosa from "../../../components/icons/IconClienteBranco.svg";
import IconCalendario from "../../../components/icons/IconCalendario.svg";

function Cliente() {
  const [tipoPessoa, setTipoPessoa] = useState(1);
  const [tipoCliente, setTipoCliente] = useState(0);

  const [qtdClientes, setQtdClientes] = useState(0);
  const [recorrentes, setRecorrentes] = useState([]);
  const [mesAniversario, setMesAniversario] = useState(null);

  const filtro = "porCliente";

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
    },
  };

  const recorrenteAtual = recorrentes?.[0];
  const recorrenteAnterior = recorrentes?.[1];

  const qtdAtual = recorrenteAtual?.qtd || 0;
  const qtdAnterior = recorrenteAnterior?.qtd || 0;

  const variacaoRecorrencia =
    qtdAnterior > 0
      ? (((qtdAtual - qtdAnterior) / qtdAnterior) * 100).toFixed(1)
      : 0;

  const positivoRecorrencia = Number(variacaoRecorrencia) >= 0;

  function carregarQtdClientes() {
    api
      .get(
        `/dashboardClientes/buscarQtdClientela/${filtro}/${tipoPessoa}/${tipoCliente}`,
        config
      )
      .then((res) => {
        console.log("Qtd clientes:", res.data);
        setQtdClientes(res.data.qtd || 0);
      })
      .catch((err) => console.error(err));
  }

  function carregarRecorrentes() {
    api
      .get(
        `/dashboardClientes/buscarQtdRecorrente/${filtro}/${tipoPessoa}/${tipoCliente}`,
        config
      )
      .then((res) => {
        console.log("Recorrentes:", res.data);
        setRecorrentes(res.data || []);
      })
      .catch((err) => console.error(err));
  }

  function carregarMesAniversario() {
    api
      .get(
        `/dashboardClientes/buscarMesAniversario/${filtro}/${tipoPessoa}/${tipoCliente}`,
        config
      )
      .then((res) => {
        console.log("Mes aniversário:", res.data);
        setMesAniversario(res.data?.[0] || null);
      })
      .catch((err) => console.error(err));
  }

  function carregarDados() {
    carregarQtdClientes();
    carregarRecorrentes();
    carregarMesAniversario();
  }

  useEffect(() => {
    carregarDados();
  }, [tipoPessoa, tipoCliente]);

  return (
    <>
      <div className={styles.filtro}>
        <label>Tipo de pessoa:</label>

        <select
          value={tipoPessoa}
          onChange={(e) => setTipoPessoa(Number(e.target.value))}
        >
          <option value={1}>Jurídica</option>
          <option value={2}>Física</option>
        </select>

        <label>Tipo do cliente:</label>

        <select
          value={tipoCliente}
          onChange={(e) => setTipoCliente(Number(e.target.value))}
        >
          <option value={0}>Loja Física</option>
          <option value={1}>Revenda</option>
          <option value={2}>Festa de Aniversário</option>
        </select>
      </div>

      <div className={styles.kpisDiv}>
        <KPI
          icon={<img src={IconClienteRosa} alt="Clientes" />}
          title="Número de clientes"
          value={qtdClientes}
          variation=""
        />

        <KPI
          icon={<img src={IconClienteRosa} alt="Clientes recorrentes" />}
          title="Clientes recorrentes"
          value={recorrentes?.[0]?.qtd || 0}
          variation=""
        />

        <KPI
          icon={<img src={IconCalendario} alt="Calendário" />}
          title="Mês com mais aniversariantes"
          value={mesAniversario?.dt || "—"}
          variation={mesAniversario ? `${mesAniversario.qtd} clientes` : ""}
        />
      </div>

      <div className={styles.financeiroContainer}>
        <div className={styles.graficoBox}>
          <GraficoAdesaodeClientela
            filtro={filtro}
            tipoPessoa={tipoPessoa}
            tipoCliente={tipoCliente}
          />
        </div>

        <div className={styles.graficoBox}>
          <GraficoBairrosClientes
            filtro={filtro}
            tipoPessoa={tipoPessoa}
            tipoCliente={tipoCliente}
          />
        </div>
      </div>

      <div className={styles.infosDiv}>
        <RecorrenciaCard
          title="Taxa de recorrência"
          subtitle="Comparativo mensal"
          taxaGeral={`${qtdAtual} cliente(s)`}
          categorias={[
            {
              variacao: `${positivoRecorrencia ? "+" : ""}${variacaoRecorrencia}%`,
              positivo: positivoRecorrencia,
              nome: recorrenteAtual
                ? `${recorrenteAtual.mes}/${recorrenteAtual.ano}`
                : "Sem dados",
              comparativo: recorrenteAnterior
                ? `${recorrenteAnterior.mes}/${recorrenteAnterior.ano}`
                : "—",
            },
          ]}
        />
      </div>
    </>
  );
}

export default Cliente;