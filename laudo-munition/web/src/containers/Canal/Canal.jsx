import styles from "./Canal.module.css";
import { Outlet } from "react-router-dom";
import NavegacaoSecoes2Opt from "../../components/navegacaoSecoesContainers/NavegacaoSecoes2Opt";
import { useState } from "react";

function Canal() {
    const [canais, setCanais] = useState([])
    const [canalSelecionado, setCanalSelecionado] = useState({})
  return (
    <main className={styles.canalContainer}>
      <div className={styles.conteudo}>
        <header className={styles.header}>
          <h1>Canais</h1>

          <NavegacaoSecoes2Opt
            rota1="/canal/listagem"
            rota2="/canal/cadastro"
            nomeRota1="Listagem"
            nomeRota2="Cadastro"
          />
        </header>

        <div className={styles.canalContent}>
          <Outlet context={{ canais, setCanais, canalSelecionado, setCanalSelecionado }}/>
        </div>
      </div>
    </main>
  );
}

export default Canal;