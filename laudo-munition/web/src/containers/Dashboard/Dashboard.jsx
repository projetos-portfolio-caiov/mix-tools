import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Outlet } from "react-router-dom";
import NavegacaoSecoes4Opt from "../../components/navegacaoSecoesContainers/NavegacaoSecoes4Opt";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

function Dashboard() {
  const [ secaoAtiva, setSecaoAtiva ] = useState("geral");
  const [ periodoSelecionado, setPeriodoSelecionado ] = useState(30);
  const [ filtro, setFiltro ] = useState("geral");

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/dashboard/${secaoAtiva}`);
  }, [secaoAtiva]);

  return (
    <div className={styles.dashboardGeralContainer}>
      <div className={styles.dashboardGeralContent}>
        
        {/* Cabeçalho */}
        <div className={styles.cabecalho}>
          <h1>Dashboard</h1>
          <p>Visão geral do desempenho da sua confeitaria</p>

          <NavegacaoSecoes4Opt
            secaoAtiva={secaoAtiva}
            setSecaoAtiva={setSecaoAtiva}
          />
        </div>

        {/* Conteúdo */}
        <Outlet context={{ secaoAtiva, setSecaoAtiva, periodoSelecionado, setPeriodoSelecionado }}/>

      </div>
    </div>
  );
}

export default Dashboard;