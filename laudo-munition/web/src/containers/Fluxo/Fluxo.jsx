import styles from "./Fluxo.module.css";
import { Outlet } from "react-router-dom";
import NavegacaoSecoes2Opt from "../../components/navegacaoSecoesContainers/NavegacaoSecoes2Opt";
import { useState } from "react";

function Fluxo() {
    const [movimentacoes, setMovimentacoes] = useState([])
    const [movimentacaoSelecionada, setMovimentacaoSelecionada] = useState({})

  return (
    <main className={styles.fluxoContainer}>
      <div className={styles.conteudo}>
        <header className={styles.header}>
          <h1>Fluxo de Caixa</h1>

          <NavegacaoSecoes2Opt
            rota1="/fluxo/listagem"
            rota2="/fluxo/cadastro"
            nomeRota1={"Listagem"}
            nomeRota2={"Cadastro"}
          />
        </header>

        <div className={styles.fluxoContent}>
          <Outlet context={{ movimentacoes, setMovimentacoes, movimentacaoSelecionada, setMovimentacaoSelecionada }}
          />
        </div>
      </div>
    </main>
  );
}

export default Fluxo;