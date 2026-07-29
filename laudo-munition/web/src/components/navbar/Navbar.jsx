import { useState } from "react";
import styles from "./Navbar.module.css";

import homeIcon from "../icons/Iconhome.svg";
import clienteIcon from "../../components/icons/IconClienteSLC.svg";
import usuarioIcon from "../../components/icons/IconUsuario.svg";
import laudoIcon from "../../components/icons/IconLaudo.svg";
import dashIcon from "../icons/Icondash.svg";
import sairIcon from "../icons/Iconsair.svg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const btnPaginaInicial = () => {
    navigate("/home");
  };

  const btnDashboard = () => {
    navigate("/dashboard/geral");
  };

  const btnProduto = () => {
    navigate("/produto/listagem");
  };

  const btnCanal = () => {
    navigate("/canal/listagem");
  };

  const btnMensagem = () => {
    navigate("/mensagem/listagem");
  };

  const btnCliente = () => {
    navigate("/cliente/listagem");
  };

  const btnFluxo = () => {
    navigate("/fluxo/listagem");
  };

  const btnSair = () => {
    navigate("/");
  };

  const [active, setActive] = useState("home");

  function navegarPaginaInicial() {
    setActive("home");
    btnPaginaInicial();
  }

  function navegarDashboard() {
    btnDashboard();
    setActive("dash");
  }
  function navegarProduto() {
    btnProduto();
    setActive("produto");
  }

  function navegarCanal() {
    btnCanal();
    setActive("canal");
  }

  function navegarMensagem() {
    btnMensagem();
    setActive("mensagem");
  }

  function navegarCliente() {
    btnCliente();
    setActive("clientes");
  }

  function navegarFluxo() {
    btnFluxo();
    setActive("caixa");
  }

  return (
    <div className={styles.navbar}>

      {/* ÁREA SCROLLÁVEL */}
      <div className={styles.navbarScroll}>

        <div className={styles.navbarTop}>
          <div className={styles.navbarIcon}>
            <img src="/image.png" alt="Cupcake" />
          </div>

          <h3 className={styles.navbarUser}>
            Bem-vindo, {sessionStorage.NOME}!
          </h3>
        </div>

        <nav className={styles.navbarMenu}>
          <a
            className={`${styles.navbarItem} ${active === "home" ? styles.active : ""}`}
            onClick={navegarPaginaInicial}
          >
            <img src={homeIcon} className={styles.navbarIconOptions} />
            Página Principal
          </a>

          <a
            className={`${styles.navbarItem} ${active === "clientes" ? styles.active : ""}`}
            onClick={navegarCliente}
          >
            <img src={clienteIcon} className={styles.navbarIconOptions} />
            Clientes
          </a>

          <a
            className={`${styles.navbarItem} ${active === "caixa" ? styles.active : ""}`}
            onClick={navegarFluxo}
          >
            <img src={usuarioIcon} className={styles.navbarIconOptions} />
            Usuários
          </a>

          <a
            className={`${styles.navbarItem} ${active === "dash" ? styles.active : ""}`}
            onClick={navegarDashboard}
          >
            <img src={laudoIcon} className={styles.navbarIconOptions} />
            Laudos
          </a>
        </nav>
      </div>

      {/* BOTÃO SAIR FIXO */}
      <div className={styles.navbarSair}>
        <button
          className={styles.navbarSairBtn}
          onClick={btnSair}
        >
          <img
            src={sairIcon}
            className={styles.navbarSairIcon}
          />
          Sair
        </button>
      </div>

    </div>
  );
}

export default Navbar;