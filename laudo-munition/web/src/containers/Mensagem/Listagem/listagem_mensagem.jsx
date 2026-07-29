import styles from "./listagem_mensagem.module.css";
import CardMensagem from "../../../components/CardMensagem/card.jsx";
import InputPesquisa from "../../../components/inputDePesquisa/InputPesquisa.jsx";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { api } from "../../../api.js";
import ConfirmarRemocaoCard from "../../../components/ConfirmarRemocaoCard/ConfirmarRemocaoCard.jsx";

function ListagemMensagem() {
  const { mensagens, setMensagens, setMensagemSelecionada } = useOutletContext()
  const [mostrarModal, setMostrarModal] = useState(false)
  const [mensagemRemover, setMensagemRemover] = useState(null)

  const [cursor, setCursor] = useState(null);
  const [temProxima, setTemProxima] = useState(true);
  const [loading, setLoading] = useState(false);

    function abrirConfirmacao(id) {
        const mensagem = mensagens.find(
        p => p.id === Number(id)
        )

        setMensagemRemover(mensagem)
        setMostrarModal(true)
    }

    function filtrarTitulo(value) {
        if (value != "" && value != null) {
            api.get(`/mensagens/filtrado/${value}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
                }
            }).then(res => {
                if (res.data.length > 0) {
                    const validados = tratarReponse({ data: res.data });
                    setMensagens(validados);
                    setCursor(null);
                    setTemProxima(false);
                }
            });
        } else {
            setCursor(null);
            setTemProxima(true);
            buscarMensagens(null, true);
        }
    }

    function removerMensagemConfirmada() {
        api.delete(
            `/mensagens/${mensagemRemover.id}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
                }
            }
        ).then(() => {
            setMensagens(prev =>
                prev.filter(p => p.id !== mensagemRemover.id)
            )
            setMostrarModal(false)
        })
    }

    function tratarReponse(res) {
        return res.data.map(mensagem => ({
            ...mensagem,
            dtEvento: mensagem.dtEvento
                ? new Date(mensagem.dtEvento).toLocaleDateString("pt-BR")
                : "Não cadastrada"
        }));
    }

    function buscarMensagens(novoCursor = null, reset = false) {
        if (loading) return;

        setLoading(true);

        let url = `/mensagens/pagina/cursor?tamanho=8`;

        if (novoCursor) {
            url += `&cursor=${novoCursor}`;
        }

        api.get(url, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
            }
        })
        .then(res => {
            const data = res.data;

            const validados = tratarReponse({ data: data.dados });
            
            console.log(validados)

            if (reset) {
                setMensagens(validados);
            } else {
                setMensagens(prev => [...prev, ...validados]);
            }

            // Considera que tem próxima se vier cursor OU se vieram dados
            const proximoCursor = data.proximoCursor ?? null;
            const ainda = data.temProxima ?? (validados.length === 8);

            setCursor(proximoCursor);
            setTemProxima(ainda);
        })
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        buscarMensagens(null, true);
    }, []);

    return (
        <div className={styles.page}>
            <InputPesquisa textoPlaceHolder="Pesquise título da mensagem" procurar={filtrarTitulo}/>

            <div className={styles.cardList}>
                {
                    mensagens.map( mensagem => (
                        <CardMensagem
                            info1={mensagem.tipo}
                            info2={mensagem.dtEvento}
                            info3={mensagem.texto}
                            imagem={`https://s3-confeitaria-nocelli-raw.s3.us-east-1.amazonaws.com/img/msg/` + mensagem.imagem}
                            setElementSelecionado={setMensagemSelecionada}
                            remover={abrirConfirmacao}
                            id={mensagem.id}
                            url="mensagem"
                        />
                    ))
                }
            {mostrarModal && (
                <ConfirmarRemocaoCard
                    titulo="Remover mensagem"
                    mensagem={`Deseja realmente remover a mensagem "${mensagemRemover?.tipo}"?`}
                    onConfirmar={removerMensagemConfirmada}
                    onCancelar={() => setMostrarModal(false)}
                />
            )}
            </div>


            {temProxima && (
                <button
                    onClick={() => buscarMensagens(cursor)}
                    disabled={loading}
                    className={styles.botaoCarregar}
                >
                    {loading ? "Carregando..." : "Carregar mais"}
                </button>
            )}
        </div>
    );
}

export default ListagemMensagem;