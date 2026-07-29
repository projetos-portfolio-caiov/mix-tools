import styles from "./mensagem.module.css";
import { Outlet } from "react-router-dom";
import NavegacaoSecoes3Opt from "../../components/navegacaoSecoesContainers/NavegacaoSecoes3Opt";
import { useState } from "react";

function Mensagem() {
    const [mensagens, setMensagens] = useState([])
    const [mensagemSelecionado, setMensagemSelecionada] = useState({})

    return (
        <main className={styles.mensagemContainer}>
            <div className={styles.conteudo}>
                <header className={styles.header}>
                    <h1>Mensagens</h1>

                    <NavegacaoSecoes3Opt
                        rota1="/mensagem/listagem"
                        rota2="/mensagem/cadastro"
                        rota3="/mensagem/envio"
                        nomeRota1="Listagem"
                        nomeRota2="Cadastro"
                        nomeRota3="Envio"
                    />
                </header>

                <div className={styles.mensagemContent}>
                    <Outlet context={{ mensagens, setMensagens, mensagemSelecionado, setMensagemSelecionada }}/>
                </div>
            </div>
        </main>
    );
}

export default Mensagem;