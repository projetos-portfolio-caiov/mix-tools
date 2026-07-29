import styles from "./ClienteListagem.module.css";
import InputDePesquisa from "../../../components/inputDePesquisa/InputPesquisa";
import CardListagem from "../../../components/CardListagemNova/CardListagem";
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react";
import { api } from "../../../api";
import ConfirmarRemocaoCard from "../../../components/ConfirmarRemocaoCard/ConfirmarRemocaoCard";

function ClienteListagem() {
    const { clientes, setClientes, clienteSelecionado, setClienteSelecionado } = useOutletContext()
    const [mostrarModal, setMostrarModal] = useState(false)
    const [ clienteRemover, setClienteRemover ] = useState(null)

    const [ cursor, setCursor ] = useState(null);
    const [ temProxima, setTemProxima ] = useState(true);
    const [ loading, setLoading ] = useState(false);

    function abrirConfirmacao(id) {
        const cliente = clientes.find(
        p => p.id === Number(id)
        )

        setClienteRemover(cliente)
        setMostrarModal(true)
    }

    function filtrarNome(value) {
        if (value != "" && value != null) {
            api.get(`/clientes/filtrado/${value}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
                }
            }).then(res => {

                const clientesFiltrados = tratarResponse(res);

                setClientes(clientesFiltrados);

                setCursor(null);
                setTemProxima(false);
            });
        } else {
            setCursor(null);
            setTemProxima(true);
            buscarClientela(null, true);
        }
    }

    function removerClienteConfirmado() {
        api.delete(`/clientes/${clienteRemover.id}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
        }
        })
        .then(() => {
            setClientes(prev =>
                prev.filter(p => p.id !== clienteRemover.id)
            )
            setMostrarModal(false)
        })
    }

    function tratarResponse(res) {
        return res.data.map(cliente => ({
            ...cliente,
            nome: cliente.nome ?? 'Não cadastrado',
            descricao: cliente.descricao ?? 'Não cadastrado',
            telefoneFormatado: cliente.telefone
                ? `+${cliente.telefone.slice(0,2)} ${cliente.telefone.slice(2,4)} ${cliente.telefone.slice(4)}`
                : 'Telefone não cadastrado',
            email: cliente.email ?? 'Email não cadastrado',
            enderecoCompleto: cliente.cep !== "-"
                ? `${cliente.endereco}, ${cliente.numero} - ${cliente.bairro}`
                : "Não cadastrado",
            dtUltimaCompra: cliente.dtUltimaCompra
                ? new Date(cliente.dtUltimaCompra).toLocaleString("pt-BR")
                : "Não cadastrada"
        }));
    }


    function buscarClientela(novoCursor = null, reset = false) {
        if (loading) return;

        setLoading(true);

        let url = `/clientes/pagina/cursor?tamanho=15`;

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

            const validados = tratarResponse({ data: data.dados });

            if (reset) {
                setClientes(validados);
            } else {
                setClientes(prev => [...prev, ...validados]);
            }

            setCursor(data.proximoCursor);
            setTemProxima(data.temProxima);
        })
        .finally(() => setLoading(false));
    }

    useEffect(() =>{
        buscarClientela(null, true)
    }, [])

    return (
        <div className={styles.listagem}>
            <header className={styles.header}>
                <h1>Listagem de Clientes</h1>
            </header>
            <div className={styles.search}>
                <InputDePesquisa textoPlaceHolder="Pesquise pelo nome cliente" procurar={filtrarNome}/>
                <select name="slt_tipo_filtro" id="slt_tipo_filtro_search">
                    <option value="nome">Nome</option>
                    <option value="cpf">CPF</option>
                    <option value="rg">RG</option>
                </select>
                <div
                    className={styles.add}
                >
                    <span>+</span>
                </div>
            </div>

            <div className={styles.cards}>

                <div className={styles.cardCliente}>

                    <div className={styles.cabecalho}>
                        <span>Último Laudo</span>
                        <span>Cliente</span>
                        <span>Contato</span>
                        <span>Endereço</span>
                        <span>Ações</span>
                    </div>

                    {clientes.map(cliente => (
                        <CardListagem
                            key={cliente.id}
                            info1={cliente.dtUltimaCompra}
                            info2={cliente.nome}
                            info3={cliente.descricao}
                            info4={cliente.telefoneFormatado}
                            info5={cliente.email}
                            info6={cliente.enderecoCompleto}
                            setSelecionado={setClienteSelecionado}
                            remover={abrirConfirmacao}
                            id={cliente.id}
                            url="cliente"
                        />
                    ))}
                    <CardListagem
                        key={1}
                        info1={"12/07/2026 10:00:00"}
                        info2={"Fulano"}
                        info3={"CPF = x; RG = Y"}
                        info4={"+55 (11) 96900-3779"}
                        info5={""}
                        info6={"Rua irmão joão creff, 128"}
                        setSelecionado={setClienteSelecionado}
                        remover={abrirConfirmacao}
                        id={1}
                        url="cliente"
                    />
                </div>
            </div>
            {
                mostrarModal && (
                <ConfirmarRemocaoCard
                    titulo="Remover cliente"
                    mensagem={`Deseja realmente remover o cliente "${clienteRemover?.nome}"?`}
                    onConfirmar={removerClienteConfirmado}
                    onCancelar={() => setMostrarModal(false)}
                />
                )
            }
            {temProxima && (
                <button 
                    onClick={() => buscarClientela(cursor)}
                    disabled={loading}
                    className={styles.botaoCarregar}
                >
                    {loading ? "Carregando..." : "Carregar mais"}
                </button>
            )}
        </div>
    );
}

export default ClienteListagem;