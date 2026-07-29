import styles from "./Cliente.module.css";
import NavegacaoSecoes2Opt from "../../components/navegacaoSecoesContainers/NavegacaoSecoes2Opt";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Cliente() {
    const [clientes, setClientes] = useState([])
    const [clienteSelecionado, setClienteSelecionado] = useState({})

    return (
        <main className={styles.clienteContainer}>
            <div className={styles.conteudo}>
                <div className={styles.clienteContent}>
                    <Outlet context={{ clientes, setClientes, clienteSelecionado, setClienteSelecionado }}/>
                </div>
            </div>
        </main>
    );
}

export default Cliente;