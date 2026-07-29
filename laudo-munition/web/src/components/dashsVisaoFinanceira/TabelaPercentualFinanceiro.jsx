import styles from "./TabelaPercentualFinanceiro.module.css";

function TabelaPercentualFinanceiro({
  periodo,
  ganhosFixos,
  ganhosVariaveis,
  gastosFixos,
  gastosVariaveis,
}) {
  function somar(lista) {
    return lista.reduce(
      (acc, item) => acc + Number(item.valor_total || 0),
      0
    );
  }

  function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function calcularPorcentagem(valor, total) {
    if (!total || total === 0) return "0,0%";

    return `${((valor / total) * 100).toFixed(1).replace(".", ",")}%`;
  }

  const totalGanhosFixos = somar(ganhosFixos);
  const totalGanhosVariaveis = somar(ganhosVariaveis);
  const totalGastosFixos = somar(gastosFixos);
  const totalGastosVariaveis = somar(gastosVariaveis);

  const totalGanhos = totalGanhosFixos + totalGanhosVariaveis;
  const totalGastos = totalGastosFixos + totalGastosVariaveis;

  const fixos = [
    {
      tipo: "Ganho",
      porcentagem: calcularPorcentagem(totalGanhosFixos, totalGanhos),
      total: formatarMoeda(totalGanhosFixos),
      positivo: true,
    },
    {
      tipo: "Gasto",
      porcentagem: calcularPorcentagem(totalGastosFixos, totalGastos),
      total: formatarMoeda(totalGastosFixos),
      positivo: false,
    },
  ];

  const variaveis = [
    {
      tipo: "Ganho",
      porcentagem: calcularPorcentagem(totalGanhosVariaveis, totalGanhos),
      total: formatarMoeda(totalGanhosVariaveis),
      positivo: true,
    },
    {
      tipo: "Gasto",
      porcentagem: calcularPorcentagem(totalGastosVariaveis, totalGastos),
      total: formatarMoeda(totalGastosVariaveis),
      positivo: false,
    },
  ];

  return (
    <div className={styles.card}>
      <h3 className={styles.titulo}>
        Tabela de percentual de ganhos e gastos nos últimos {periodo} dias
      </h3>

      <div className={styles.wrapper}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th colSpan={3}>Fixos</th>
            </tr>
            <tr>
              <th>Tipo</th>
              <th>Porcentagem</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {fixos.map((row) => (
              <tr key={row.tipo}>
                <td>{row.tipo}</td>

                <td
                  className={
                    row.positivo
                      ? styles.valorPositivo
                      : styles.valorNegativo
                  }
                >
                  {row.porcentagem}
                </td>

                <td className={styles.valorTotal}>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.divisor} />

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th colSpan={3}>Variáveis</th>
            </tr>
            <tr>
              <th>Tipo</th>
              <th>Porcentagem</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {variaveis.map((row) => (
              <tr key={row.tipo}>
                <td>{row.tipo}</td>

                <td
                  className={
                    row.positivo
                      ? styles.valorPositivo
                      : styles.valorNegativo
                  }
                >
                  {row.porcentagem}
                </td>

                <td className={styles.valorTotal}>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TabelaPercentualFinanceiro;