import styles from "./Produto.module.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavegacaoSecoes2Opt from "../../components/navegacaoSecoesContainers/NavegacaoSecoes2Opt";

function Produto() {
    const [produtos, setProdutos] = useState([])
    const [produtoSelecionado, setProdutoSelecionado] = useState({})

  return (
    <main className={styles.produtoContainer}>
      <div className={styles.conteudo}>
        <header className={styles.header}>
          <h1>Produtos</h1>

          <NavegacaoSecoes2Opt
            rota1="/produto/listagem"
            rota2="/produto/cadastro"
            nomeRota1="Listagem"
            nomeRota2="Cadastro"
          />
        </header>

        <div className={styles.produtoContent}>
          <Outlet context={{ produtos, setProdutos, produtoSelecionado, setProdutoSelecionado }}/>
        </div>
      </div>
    </main>
  );
}

export default Produto;