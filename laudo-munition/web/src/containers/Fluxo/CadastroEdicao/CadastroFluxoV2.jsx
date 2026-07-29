    import styles from "./CadastroEdicaoFluxoV2.module.css"
    import FormularioCard from "../../../components/FormularioCard/FormularioCard";
    import InputPesquisa from "../../../components/inputDePesquisa/InputPesquisa"
    import { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { api } from "../../../api";
    import { FaEdit, FaTrash } from "react-icons/fa";
    import lupaIcon from '../../../components/icons/lupa.svg'


    function CadastroFluxoV2() {
        
        const [ bool, setBool ] = useState("none");
        const [ acao, setAcao ] = useState("Adicionar");
        const [ total, setTotal ] = useState(0);
        const [ idVenda, setIdVenda ] = useState(null);
        const [ valorMovimentacao, setValorMovimentacao ] = useState("0");
        const [ erroValor, setErroValor ] = useState("");
       

        const [ recalcular, setRecalcular ] = useState(false);

        const [canaisFiltrados, setCanaisFiltrados] = useState([]);
        const [clientesFiltrados, setClientesFiltrados] = useState([]);
        const [produtosFiltrados, setProdutosFiltrados] = useState([]);
        

        async function enviarCadastro() {
            const valor = Number(valorMovimentacao);
            if (Number.isNaN(valor) || (tipo === "entrada" && valor < 0)) {
                setErroValor("Valor da movimentação não pode ser negativo");
                return;
            }

            const cliente = clientes.find(
                c => c.id === clienteSelecionado
            );
            const canal = canais.find(
                c => c.id === canalSelecionado
            );

            const mov_payload = {
                "fkFuncionario": 1,
                "fkCanal": canal.id,
                "valor": valor
            }

            if(produtosSelecionados.length > 0 && tipo === "entrada") {
                api.post("/movimentacoes",
                    mov_payload,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
                        }
                    }
                )
                .then(res => {
                    const movimentacaoCriada = res.data;

                    produtosSelecionados.forEach(produto => {
                        adicionarVendas({
                            fkCliente: cliente.id,
                            fkProduto: produto.produto.id,
                            fkMovimentacao: movimentacaoCriada.id,
                            qtd: produto.qtd
                        });
                    });
                    voltarListagem();
                });
            } else {
                api.post("/movimentacoes",
                    mov_payload,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
                        }
                    }
                )
                .then(() => {
                    voltarListagem();
                });
            }

        }

        function adicionarVendas(venda) {
            api.post("/vendas", venda, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
                }
            });
        }

        function remover(id) {
            setTotal(0);
            setRecalcular(prev => !prev)
            setProdutosSelecionados(prev =>
                prev.filter(p => p.id !== id)
            )
        }

        function adicionarProduto() {
            let produtoSelecionado = produtos.find(
                p => p.id === Number(produtoCaixaSelecionado)
            );

            if (!produtoSelecionado) return;

            let payload = {
                produto: {
                    id: produtoSelecionado.id,
                    tipo: produtoSelecionado.nome,
                    descricao: produtoSelecionado.descricao,
                    preco: preco
                },
                qtd: qtd
            };

            if (idVenda == null) {
                setProdutosSelecionados([...produtosSelecionados, payload])
            } else {
                setProdutosSelecionados(prev =>
                    prev.map(p => {
                        if (p.id === idVenda) {
                            return { ...p, ...payload };
                        }
                        return p;
                    })
                );
            }
            setQtd(0);
            setPreco(0);
            setProdutoCaixaSelecionado([]);
        }

        const [ qtd, setQtd ] = useState(0);
        const [ preco, setPreco ] = useState(0);

        function filtrarProduto(value) {
            const produtosFiltrados = value.trim() === ""
                ? produtoOriginal
                : produtoOriginal.filter(venda =>
                    venda.produto.nome
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
            setProdutosSelecionados(produtosFiltrados);
        }

        function filtrarCliente(value) {
            const filtrados = value.trim() === ""
                ? clientes
                : clientes.filter(cliente =>
                    cliente.nome
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
            setClientesFiltrados(filtrados);
        }

        function filtrarProdutos(value) {
            const filtrados = value.trim() === ""
                ? produtos
                : produtos.filter(produto =>
                    `${produto.nome} (${produto.descricao})`
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
            setProdutosFiltrados(filtrados);
        }

        function filtrarCanal(value) {

            const filtrados = value.trim() === ""
                ? canais
                : canais.filter(canal =>
                    canal.categoria
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
                setCanaisFiltrados(filtrados);
        }

        const navigate = useNavigate()

        const [ produtos, setProdutos ] = useState([]);
        const [ clientes, setClientes ] = useState([]);
        const [ canais, setCanais ] = useState([]);

        const [ produtosSelecionados, setProdutosSelecionados ] = useState([]);
        const [clienteSelecionado, setClienteSelecionado] = useState([]);
        const [canalSelecionado, setCanalSelecionado] = useState([]);
        const [produtoCaixaSelecionado, setProdutoCaixaSelecionado] = useState([]);

        const [tipo, setTipo] = useState("entrada");

        function voltarListagem() {
            navigate("/fluxo/listagem")
        }

        function buscar(setVar, endpoint) {
            api.get(`/${endpoint}`, {
                headers: {
                Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
                }
            })
            .then((res) => {
                if(res.data.length > 0) {
                    let resultados = null

                    if(endpoint === "produtos") {
                        let cards = []

                        for(let i = 0; i < res.data.length; i++) {
                            let card = {
                            nome: res.data[i].tipo,
                            descricao: res.data[i].descricao,
                            preco: `R$${res.data[i].preco}`,
                            imagem: res.data[i].imagem,
                            id: res.data[i].id
                            }
                            cards.push(card)
                        }

                        resultados = cards
                    } else if(endpoint === "clientes") {
                        let clientes_validados = []
                        for(let i = 0; i < res.data.length; i++) {
                            let cliente_atual = res.data[i]
                            if (cliente_atual.nome == null) {
                                cliente_atual.nome = 'Não cadastrado'
                            }
                            
                            if (cliente_atual.descricao == null) {
                                cliente_atual.descricao = 'Não cadastrado'
                            }
                            
                            if (cliente_atual.telefone == null) {
                                cliente_atual.telefoneFormatado = 'Telefone não cadastrado'
                            } else {
                                cliente_atual.telefoneFormatado = `+${cliente_atual.telefone.slice(0,2)} ${cliente_atual.telefone.slice(2,4)} ${cliente_atual.telefone.slice(4)}`
                            }
                            
                            if (cliente_atual.email == null) {
                                cliente_atual.email = 'Email não cadastrado'
                            }
                            
                            if (cliente_atual.cep != "-") {
                                cliente_atual.enderecoCompleto = `${cliente_atual.endereco}, ${cliente_atual.numero} - ${cliente_atual.bairro}`
                            } else {
                                cliente_atual.enderecoCompleto = "Não cadastrado"
                            }
                            
                            if (cliente_atual.dtUltimaCompra == null) {  
                                cliente_atual.dtUltimaCompra = "Não cadastrada"
                            } else {
                                cliente_atual.dtUltimaCompra = new Date(cliente_atual.dtUltimaCompra).toLocaleString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                });
                            }
                            clientes_validados.push(cliente_atual);
                        }
                    resultados = clientes_validados
                } else {
                    resultados = res.data
                }
                    if(endpoint === "canais"){
                        setCanaisFiltrados(tipo == "entrada" ? resultados.filter(item => item.metodo == 1) : resultados.filter(item => item.metodo == 0))
                    }
                    if(endpoint === "clientes"){
                        setClientesFiltrados(resultados)
                    }
                    if(endpoint === "produtos"){
                        setProdutosFiltrados(resultados)
                    }
                    setVar(resultados)
                }
            })
        }

        useEffect(() => {
            buscar(setProdutos, "produtos");
            buscar(setClientes, "clientes");
            buscar(setCanais, "canais");
        }, [])

        useEffect(() => {
            setTotal(0);
            for(let i = 0; i < produtosSelecionados.length; i++) {
                let valorProduto = Number(produtosSelecionados[i].produto.preco);
                let qtdProduto = produtosSelecionados[i].qtd;
                setTotal(prev => prev + (valorProduto * qtdProduto));
            }
        }, [produtosSelecionados, recalcular])

        useEffect(() => {
            if (!canais.length) return;

            const filtrados =
                tipo === "entrada"
                ? canais.filter(item => item.metodo == 1)
                : canais.filter(item => item.metodo == 0);

            setCanaisFiltrados(filtrados);

        }, [tipo, canais]);

        useEffect(() => {
            if (clientes.length > 0) {
                setClienteSelecionado(clientes[0].id);  
            }

            if (canais.length > 0) {
                setCanalSelecionado(canais[0].id);
            }
        }, [clientes, canais]);

        return (
            <FormularioCard title={"Edição de Fluxo de Caixa"} sucesso={enviarCadastro} cancelar={voltarListagem}>
                <div className={styles.elements}>
                    <div className={styles.formLadoA}>
                        <div className={styles.filtrosEntrada}>
                            <select className={styles.select}
                                name="canal"
                                id="canal"
                                onChange={(e) => setTipo(e.target.value)}
                                value={tipo}>
                                <option value="" disabled selected>Selecione o tipo de canal</option>
                                <option value="entrada">Entrada</option>
                                <option value="saida">Saída</option>
                            </select>
                        </div>

                        <div className={styles.campos}>
                            <div>Selecione o canal:</div>
                            <div className={styles.canal}>
                                <div className={`${styles.boxInput} ${styles.pesquisaLista}`}>
                                    <img src={lupaIcon} alt="" className='iconeEmail' />
                                    <input
                                        type="text"
                                        placeholder={"Pesquise o canal"}
                                        className= {styles.inputPesquisa}
                                        onChange={(event) => filtrarCanal(event.target.value)}
                                        />
                                </div> 
                                <div className={styles.filtrosDiv}>
                                    <select
                                        onChange={(e) => setCanalSelecionado(Number(e.target.value))}
                                        value={canalSelecionado}
                                    >
                                        {
                                            canaisFiltrados.map((canal) => (
                                                <option value={canal.id}>{canal.categoria}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={styles.campos}>
                            <div>Selecione o cliente:</div>
                            <div className={styles.canal}>
                                <div className={`${styles.boxInput} ${styles.pesquisaLista}`}>
                                    <img src={lupaIcon} alt="" className='iconeEmail' />
                                    <input
                                        type="text"
                                        placeholder={"Pesquise o cliente"}
                                        className= {styles.inputPesquisa}
                                        onChange={(event) => filtrarCliente(event.target.value)}
                                        />
                                </div> 
                                <div className={styles.filtrosDiv}>
                                    <select
                                        onChange={(e) => setClienteSelecionado(Number(e.target.value))}
                                        value={clienteSelecionado}
                                    >
                                        {
                                            clientesFiltrados.map((cliente) => (
                                                <option value={cliente.id}>{cliente.nome}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>  
                        <div className={styles.campos}>
                            <div>Valor da movimentação: (Recomendado: R$ {total.toFixed(2)})</div>
                            <input
                                type="number"
                                placeholder="R$ 0.00"
                                min={tipo === "entrada" ? 0 : undefined}
                                step="0.01"
                                value={valorMovimentacao}
                                onChange={(event) => {
                                    const valor = event.target.value;
                                    setValorMovimentacao(valor);
                                    if (tipo === "entrada" && Number(valor) < 0) {
                                        setErroValor("Valor da movimentação não pode ser negativo");
                                    } else {
                                        setErroValor("");
                                    }
                                }}
                            />
                            {erroValor && <span className={styles.erroCampo}>{erroValor}</span>}
                        </div>
                    </div>

                    <div className={tipo === 'entrada' ? styles.formatoFormulario : styles.formatoFormularioDesativado}>

                        <div className={styles.formDivisor}></div>

                        <div className={styles.formLadoB}>

                            <p>Produtos selecionados:</p>

                            <InputPesquisa textoPlaceHolder={"Pesquise o produto desejado"} variant={"pesquisaLista"} procurar={filtrarProduto}/>

                            <div className={tipo === 'entrada' ? styles.listagemProdutosAtiva : styles.listagemProdutosDesativa}>
                                {
                                    produtosSelecionados.map((vendas) => (
                                        <div className={styles.cardProduto}>
                                            <div className={styles.cabecalhoProduto}>
                                                <div>Nome: {vendas.produto.tipo} ({vendas.produto.descricao})</div>
                                                <div>Quantidade: {vendas.qtd}</div>
                                                <div>Preço Unitário: R$ {(vendas.produto.preco).toFixed(2)}</div>    
                                            </div>
                                            <div className={`${styles.coluna} ${styles.acoes}`}>
                                                <button className={`${styles.botao} ${styles.editar}`}>
                                                    <FaEdit onClick={() => {
                                                        setBool("flex");
                                                        setAcao("Editar");
                                                        setQtd(vendas.qtd);
                                                        setPreco(vendas.produto.preco);
                                                        setProdutoCaixaSelecionado(vendas.produto.id);
                                                        setIdVenda(vendas.id)
                                                    }}/>
                                                </button>
                                                <button className={`${styles.botao} ${styles.excluir}`}>
                                                    <FaTrash onClick={() => remover(vendas.id)} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className={styles.modalAdicionar} style={{display: bool}}>
                                    <div className={styles.campos}>
                                        <div>Selecione o produto:</div>
                                        <div className={styles.canal}>
                                            <div className={`${styles.boxInput} ${styles.pesquisaLista}`}>
                                                <img src={lupaIcon} alt="" className='iconeEmail' />
                                                <input
                                                    type="text"
                                                    placeholder={"Pesquise o produto"}
                                                    className= {styles.inputPesquisa}
                                                    onChange={(event) => filtrarProdutos(event.target.value)}
                                                    />
                                            </div> 
                                            <div className={styles.filtrosDiv}>
                                                <select onChange={(e) => setProdutoCaixaSelecionado(e.target.value)}>
                                                    {
                                                        produtosFiltrados.map((produto) => (
                                                            <option value={produto.id}>{produto.nome} ({produto.descricao})</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.qtdAdicionar}>
                                        <div className={`${styles.boxInput} ${styles.pesquisaLista}`}>
                                            <input
                                                type="number"
                                                placeholder={"Quantidade"}
                                                className= {styles.inputPesquisa}
                                                value={qtd}
                                                onChange={(event) => {

                                                    const novaQtd = Number(event.target.value);

                                                    const produto = produtos.find(
                                                        p => p.id === Number(produtoCaixaSelecionado)
                                                    );

                                                    if (!produto) {
                                                        setPreco(0);
                                                        return;
                                                    }

                                                    setQtd(novaQtd);
                                                    setPreco(Number(produto.preco.replace("R$", "")));
                                                }}
                                            />
                                        </div>
                                        <div className={`${styles.boxInput} ${styles.pesquisaLista}`}>
                                            <input
                                                type="number"
                                                placeholder={"Preço"}
                                                className= {styles.inputPesquisa}
                                                value={preco}
                                                onChange={(event) => setPreco(event.target.value)}
                                                />
                                        </div>
                                    </div>
                                    <div className={styles.botaoAdicionar}>
                                        <button onClick={() => adicionarProduto()}>{acao}</button>
                                        <button onClick={() => setBool("none")} className={styles.btnCancelarEnvioMensagem}>Cancelar</button>
                                    </div>
                                </div>
                                <div className={styles.adicionar} onClick={() => {
                                    setBool("flex");
                                    setAcao("Adicionar");
                                    setQtd(0);
                                    setPreco(0);
                                    setProdutoCaixaSelecionado(produtos[0].id);
                                    setIdVenda(null);
                                }}>
                                    +
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FormularioCard>
        );
    }

    export default CadastroFluxoV2;