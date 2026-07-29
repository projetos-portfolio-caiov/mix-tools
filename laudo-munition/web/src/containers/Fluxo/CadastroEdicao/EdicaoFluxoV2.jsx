import styles from "./CadastroEdicaoFluxoV2.module.css";
import FormularioCard from "../../../components/FormularioCard/FormularioCard";
import InputPesquisa from "../../../components/inputDePesquisa/InputPesquisa";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../../../api";
import { FaEdit, FaTrash } from "react-icons/fa";
import lupaIcon from "../../../components/icons/lupa.svg";

function EdicaoFluxoV2() {

    const navigate = useNavigate();

    const { movimentacoes, movimentacaoSelecionada } = useOutletContext();

    // =========================
    // STATES
    // =========================

    const [bool, setBool] = useState("none");

    const [acao, setAcao] = useState("Adicionar");

    const [total, setTotal] = useState(0);

    const [valorMovimentacao, setValorMovimentacao] = useState(0);

    const [erroValor, setErroValor] = useState("");

    const [produtos, setProdutos] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [canais, setCanais] = useState([]);

    const [canaisFiltrados, setCanaisFiltrados] = useState([]);

    const [clientesFiltrados, setClientesFiltrados] = useState([]);

    const [produtosFiltrados, setProdutosFiltrados] = useState([]);

    const [produtosSelecionados, setProdutosSelecionados] = useState([]);

    const [produtosVisualizados, setProdutosVisualizados] = useState([]);

    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    const [canalSelecionado, setCanalSelecionado] = useState(null);

    const [movimentacaoAtual, setMovimentacaoAtual] = useState(null);

    const [produtoCaixaSelecionado, setProdutoCaixaSelecionado] = useState(null);

    const [produtoOriginal, setProdutoOriginal] = useState([]);

    const [tipo, setTipo] = useState("saida");

    const [qtd, setQtd] = useState(1);

    const [preco, setPreco] = useState(0);

    const [idVenda, setIdVenda] = useState(null);

    // =========================
    // HELPERS
    // =========================

    function gerarLocalId() {

        return crypto.randomUUID();
    }

    function voltarListagem() {

        navigate("/fluxo/listagem");
    }

    // =========================
    // API
    // =========================

    async function removerVendas(id) {

        return api.delete(`/vendas/${id}`, {
            headers: {
                Authorization:
                    `Bearer ${sessionStorage.getItem("TOKEN")}`
            }
        });
    }

    async function adicionarVendas(venda) {

        return api.post("/vendas", venda, {
            headers: {
                Authorization:
                    `Bearer ${sessionStorage.getItem("TOKEN")}`
            }
        });
    }

    async function editarVenda(id, venda) {

        return api.put(

            `/vendas/${id}`,

            venda,

            {
                headers: {
                    Authorization:
                        `Bearer ${sessionStorage.getItem("TOKEN")}`
                }
            }
        );
    }

    async function limparVenda(id) {

        return api.put(

            `/vendas/${id}/limpar`,

            {},

            {
                headers: {
                    Authorization:
                        `Bearer ${sessionStorage.getItem("TOKEN")}`
                }
            }
        );
    }

    // =========================
    // BUSCAS
    // =========================

    function buscar(setVar, endpoint) {

        api.get(`/${endpoint}`, {
            headers: {
                Authorization:
                    `Bearer ${sessionStorage.getItem("TOKEN")}`
            }
        })
        .then((res) => {

            if (!res.data?.length) return;

            let resultados = null;

            // =========================
            // PRODUTOS
            // =========================

            if (endpoint === "produtos") {

                resultados = res.data.map(produto => ({
                    nome: produto.tipo,
                    descricao: produto.descricao,
                    preco: Number(produto.preco),
                    imagem: produto.imagem,
                    id: produto.id
                }));
            }

            // =========================
            // CLIENTES
            // =========================

            else if (endpoint === "clientes") {

                resultados = res.data;
            }

            else {

                resultados = res.data;
            }

            if (endpoint === "canais") {

                setCanaisFiltrados(
                    tipo === "entrada"
                        ? resultados.filter(item => item.metodo === 1)
                        : resultados.filter(item => item.metodo === 0)
                );
            }

            if (endpoint === "clientes") {

                setClientesFiltrados(resultados);
            }

            if (endpoint === "produtos") {

                setProdutosFiltrados(resultados);
            }

            setVar(resultados);
        });
    }

    // =========================
    // FILTROS
    // =========================

    function filtrarProduto(value) {

        const filtrados = value.trim() === ""

            ? produtosSelecionados

            : produtosSelecionados.filter(venda =>
                venda.produto.tipo
                    .toLowerCase()
                    .includes(value.toLowerCase())
            );

        setProdutosVisualizados(filtrados);
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

    // =========================
    // CARRINHO
    // =========================

    function adicionarProduto() {

        const produtoSelecionado = produtos.find(
            p => p.id === Number(produtoCaixaSelecionado)
        );

        if (!produtoSelecionado) {

            alert("Selecione um produto");

            return;
        }

        if (
            qtd === "" ||
            isNaN(Number(qtd)) ||
            Number(qtd) <= 0
        ) {

            alert("Quantidade inválida");

            return;
        }

        if (
            preco === "" ||
            isNaN(Number(preco)) ||
            Number(preco) < 0
        ) {

            alert("Preço inválido");

            return;
        }

        const vendaOriginal = produtosSelecionados.find(
            item => item.localId === idVenda
        );

        const payload = {

            localId: idVenda ?? gerarLocalId(),

            id: vendaOriginal?.id ?? null,

            produto: {

                id: produtoSelecionado.id,

                tipo: produtoSelecionado.nome,

                descricao: produtoSelecionado.descricao,

                preco: Number(preco)
            },

            qtd: Number(qtd)
        };

        // =========================
        // ADICIONAR
        // =========================

        if (idVenda == null) {

            const novaLista = [
                ...produtosSelecionados,
                payload
            ];

            setProdutosSelecionados(novaLista);

            setProdutosVisualizados(novaLista);
        }

        // =========================
        // EDITAR
        // =========================

        else {

            const novaLista = produtosSelecionados.map(item => {

                if (item.localId === idVenda) {

                    return payload;
                }

                return item;
            });

            setProdutosSelecionados(novaLista);

            setProdutosVisualizados(novaLista);
        }

        // =========================
        // RESET MODAL
        // =========================

        setQtd(1);

        setPreco(0);

        setProdutoCaixaSelecionado(null);

        setIdVenda(null);

        setBool("none");
    }

    function remover(localId) {

        const novaLista = produtosSelecionados.filter(
            item => item.localId !== localId
        );

        setProdutosSelecionados(novaLista);

        setProdutosVisualizados(novaLista);
    }

    // =========================
    // SALVAR
    // =========================

    async function enviarEdicao() {

        try {

            if (Number(valorMovimentacao) < 0) {

                setErroValor(
                    "Valor da movimentação não pode ser negativo"
                );

                return;
            }

            const cliente = clientes.find(
                c => c.id === clienteSelecionado
            );

            const canal = canais.find(
                c => c.id === canalSelecionado
            );

            // =========================
            // UPDATE MOVIMENTAÇÃO
            // =========================

            await api.put(

                `/movimentacoes/${movimentacaoAtual.id}`,

                {
                    fkFuncionario: 1,
                    fkCanal: canal.id,
                    valor: Number(valorMovimentacao)
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${sessionStorage.getItem("TOKEN")}`
                    }
                }
            );

            // =========================
            // IDS ATUAIS
            // =========================

            const idsAtuais = produtosSelecionados
                .filter(item => item.id)
                .map(item => item.id);

            // =========================
            // REMOVIDOS
            // =========================

            const removidos = produtoOriginal.filter(

                original => !idsAtuais.includes(original.id)
            );

            // =========================
            // DELETE
            // =========================

            if (
                produtosSelecionados.length === 0 &&
                produtoOriginal.length > 0
            ) {

                const ultimaVenda = produtoOriginal[0];

                await limparVenda(ultimaVenda.id);

            } else {

                await Promise.all(

                    removidos.map(item =>
                        removerVendas(item.id)
                    )
                );
            }

            // =========================
            // PROCESSAR PRODUTOS
            // =========================

            await Promise.all(

                produtosSelecionados.map(async (item) => {

                    const payload = {

                        fkCliente: cliente.id,

                        fkProduto: item.produto.id,

                        fkMovimentacao: movimentacaoAtual.id,

                        qtd: Number(item.qtd)
                    };

                    // =========================
                    // NOVO
                    // =========================

                    if (!item.id) {

                        await adicionarVendas(payload);

                        return;
                    }

                    // =========================
                    // EXISTENTE
                    // =========================

                    const original = produtoOriginal.find(
                        p => p.id === item.id
                    );

                    if (!original) return;

                    const mudouProduto =
                        original.produto.id !== item.produto.id;

                    const mudouQtd =
                        Number(original.qtd) !== Number(item.qtd);

                    // =========================
                    // EDITAR SOMENTE SE MUDOU
                    // =========================

                    if (mudouProduto || mudouQtd) {

                        await editarVenda(
                            item.id,
                            payload
                        );
                    }
                })
            );

            alert("Movimentação atualizada com sucesso");

            voltarListagem();

        } catch (error) {

            console.error(error);

            alert("Erro ao salvar edição");
        }
    }

    // =========================
    // LOAD
    // =========================

    useEffect(() => {

        const movimentacao = movimentacoes.find(
            c => c.movimentacao.id === movimentacaoSelecionada
        );

        if (movimentacao) {

            setCanalSelecionado(movimentacao.canal.id);

            setClienteSelecionado(movimentacao.cliente.id);

            const vendasTratadas = movimentacao.vendas.map(venda => ({

                localId: gerarLocalId(),

                id: venda.id,

                produto: {

                    id: venda.produto.id,

                    tipo: venda.produto.tipo,

                    descricao: venda.produto.descricao,

                    preco: Number(venda.produto.preco)
                },

                qtd: Number(venda.qtd)
            }));

            setProdutosSelecionados(vendasTratadas);

            setProdutosVisualizados(vendasTratadas);

            setProdutoOriginal(vendasTratadas);

            setMovimentacaoAtual(movimentacao.movimentacao);

            setValorMovimentacao(
                movimentacao.movimentacao.valor
            );

            setTipo(
                movimentacao.canal.metodo === 1
                    ? "entrada"
                    : "saida"
            );
        }

        buscar(setProdutos, "produtos");

        buscar(setClientes, "clientes");

        buscar(setCanais, "canais");

    }, []);

    // =========================
    // TOTAL
    // =========================

    useEffect(() => {

        const novoTotal = produtosSelecionados.reduce(

            (acc, item) => {

                const valorProduto =
                    Number(item.produto.preco);

                const qtdProduto =
                    Number(item.qtd);

                const subtotal =
                    valorProduto * qtdProduto;

                return acc + (
                    isNaN(subtotal)
                        ? 0
                        : subtotal
                );
            },

            0
        );

        setTotal(novoTotal);

    }, [produtosSelecionados]);

    // =========================
    // CANAIS
    // =========================

    useEffect(() => {

        if (!canais.length) return;

        const filtrados =

            tipo === "entrada"

                ? canais.filter(item => item.metodo === 1)

                : canais.filter(item => item.metodo === 0);

        setCanaisFiltrados(filtrados);

    }, [tipo, canais]);

    // =========================
// CANAIS
// =========================

    useEffect(() => {

        if (!canais.length) return;

        const filtrados =

            tipo === "entrada"

                ? canais.filter(item => item.metodo === 1)

                : canais.filter(item => item.metodo === 0);

        setCanaisFiltrados(filtrados);

    }, [tipo, canais]);

    return (

        <FormularioCard
            title={"Edição de Fluxo de Caixa"}
            sucesso={enviarEdicao}
            cancelar={voltarListagem}
        >

            <div className={styles.elements}>

                {/* ESQUERDA */}

                <div className={styles.formLadoA}>

                    {/* TIPO */}

                    <div className={styles.filtrosEntrada}>

                        <select
                            className={styles.select}
                            value={tipo}
                            onChange={(e) =>
                                setTipo(e.target.value)
                            }
                        >
                            <option value="entrada">
                                Entrada
                            </option>

                            <option value="saida">
                                Saída
                            </option>
                        </select>

                    </div>

                    {/* CANAL */}

                    <div className={styles.campos}>

                        <div>Selecione o canal:</div>

                        <div className={styles.canal}>

                            <div className={`${styles.boxInput} ${styles.pesquisaLista}`}>

                                <img src={lupaIcon} alt="" />

                                <input
                                    type="text"
                                    placeholder="Pesquise o canal"
                                    className={styles.inputPesquisa}
                                    onChange={(e) =>
                                        filtrarCanal(e.target.value)
                                    }
                                />

                            </div>

                            <div className={styles.filtrosDiv}>

                                <select
                                    value={canalSelecionado ?? ""}
                                    onChange={(e) =>
                                        setCanalSelecionado(
                                            Number(e.target.value)
                                        )
                                    }
                                >
                                    {
                                        canaisFiltrados.map(canal => (

                                            <option
                                                key={canal.id}
                                                value={canal.id}
                                            >
                                                {canal.categoria}
                                            </option>
                                        ))
                                    }

                                </select>

                            </div>

                        </div>

                    </div>

                    {/* CLIENTE */}

                    <div className={styles.campos}>

                        <div>Selecione o cliente:</div>

                        <div className={styles.canal}>

                            <div className={`${styles.boxInput} ${styles.pesquisaLista}`}>

                                <img src={lupaIcon} alt="" />

                                <input
                                    type="text"
                                    placeholder="Pesquise o cliente"
                                    className={styles.inputPesquisa}
                                    onChange={(e) =>
                                        filtrarCliente(e.target.value)
                                    }
                                />

                            </div>

                            <div className={styles.filtrosDiv}>

                                <select
                                    value={clienteSelecionado ?? ""}
                                    onChange={(e) =>
                                        setClienteSelecionado(
                                            Number(e.target.value)
                                        )
                                    }
                                >
                                    {
                                        clientesFiltrados.map(cliente => (

                                            <option
                                                key={cliente.id}
                                                value={cliente.id}
                                            >
                                                {cliente.nome}
                                            </option>
                                        ))
                                    }

                                </select>

                            </div>

                        </div>

                    </div>

                    {/* VALOR */}

                    <div className={styles.campos}>

                        <div>
                            Valor da movimentação:
                            (Recomendado: R$ {total.toFixed(2)})
                        </div>

                        <input
                            type="number"
                            min={0}
                            step="0.01"
                            value={valorMovimentacao}
                            onChange={(e) => {

                                const valor =
                                    Number(e.target.value);

                                setValorMovimentacao(valor);

                                if (valor < 0) {

                                    setErroValor(
                                        "Valor não pode ser negativo"
                                    );

                                } else {

                                    setErroValor("");
                                }
                            }}
                        />

                        {
                            erroValor &&
                            <span className={styles.erroCampo}>
                                {erroValor}
                            </span>
                        }

                    </div>

                </div>

                {/* CARRINHO */}

                <div className={
                    tipo === "entrada"
                        ? styles.formatoFormulario
                        : styles.formatoFormularioDesativado
                }>

                    <div className={styles.formDivisor}></div>

                    <div className={styles.formLadoB}>

                        <p>Produtos selecionados:</p>

                        <InputPesquisa
                            textoPlaceHolder={
                                "Pesquise o produto desejado"
                            }
                            variant={"pesquisaLista"}
                            procurar={filtrarProduto}
                        />

                        <div className={
                            tipo === "entrada"
                                ? styles.listagemProdutosAtiva
                                : styles.listagemProdutosDesativa
                        }>

                            {
                                produtosVisualizados.map((vendas) => (

                                    <div
                                        key={vendas.localId}
                                        className={styles.cardProduto}
                                    >

                                        <div className={styles.cabecalhoProduto}>

                                            <div>
                                                Nome:
                                                {" "}
                                                {vendas.produto.tipo}
                                                {" "}
                                                (
                                                {vendas.produto.descricao}
                                                )
                                            </div>

                                            <div>
                                                Quantidade:
                                                {" "}
                                                {vendas.qtd ?? 0}
                                            </div>

                                            <div>
                                                Preço Unitário:
                                                {" "}
                                                R$
                                                {" "}
                                                {Number(
                                                    vendas.produto.preco
                                                ).toFixed(2)}
                                            </div>

                                        </div>

                                        <div className={`${styles.coluna} ${styles.acoes}`}>

                                            {/* EDITAR */}

                                            <button
                                                className={`${styles.botao} ${styles.editar}`}
                                            >

                                                <FaEdit
                                                    onClick={() => {

                                                        setBool("flex");

                                                        setAcao("Editar");

                                                        setQtd(
                                                            Number(vendas.qtd)
                                                        );

                                                        setPreco(
                                                            Number(
                                                                vendas.produto.preco
                                                            )
                                                        );

                                                        setProdutoCaixaSelecionado(
                                                            vendas.produto.id
                                                        );

                                                        setIdVenda(
                                                            vendas.localId
                                                        );
                                                    }}
                                                />

                                            </button>

                                            {/* REMOVER */}

                                            <button
                                                className={`${styles.botao} ${styles.excluir}`}
                                            >

                                                <FaTrash
                                                    onClick={() =>
                                                        remover(
                                                            vendas.localId
                                                        )
                                                    }
                                                />

                                            </button>

                                        </div>

                                    </div>
                                ))
                            }

                            {/* MODAL */}

                            <div
                                className={styles.modalAdicionar}
                                style={{ display: bool }}
                            >

                                {/* PRODUTO */}

                                <div className={styles.campos}>

                                    <div>
                                        Selecione o produto:
                                    </div>

                                    <div className={styles.canal}>

                                        <div className={`${styles.boxInput} ${styles.pesquisaLista}`}>

                                            <img src={lupaIcon} alt="" />

                                            <input
                                                type="text"
                                                placeholder={"Pesquise o produto"}
                                                className={styles.inputPesquisa}
                                                onChange={(e) =>
                                                    filtrarProdutos(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                        <div className={styles.filtrosDiv}>

                                            <select
                                                value={
                                                    produtoCaixaSelecionado ?? ""
                                                }
                                                onChange={(e) => {

                                                    const produtoId = Number(e.target.value);

                                                    setProdutoCaixaSelecionado(produtoId);

                                                    // =========================
                                                    // AUTOSETAR PREÇO ORIGINAL
                                                    // =========================

                                                    const produtoSelecionado = produtos.find(
                                                        produto => produto.id === produtoId
                                                    );

                                                    if (produtoSelecionado) {

                                                        setPreco(
                                                            Number(produtoSelecionado.preco)
                                                        );
                                                    }
                                                }}
                                            >

                                                <option value="">
                                                    Selecione
                                                </option>

                                                {
                                                    produtosFiltrados.map(produto => (

                                                        <option
                                                            key={produto.id}
                                                            value={produto.id}
                                                        >
                                                            {produto.nome}
                                                            {" "}
                                                            (
                                                            {produto.descricao}
                                                            )
                                                        </option>
                                                    ))
                                                }

                                            </select>

                                        </div>

                                    </div>

                                </div>

                                {/* QTD */}

                                <div className={styles.qtdAdicionar}>

                                    <div className={`${styles.boxInput} ${styles.pesquisaLista}`}>

                                        <input
                                            type="number"
                                            min={1}
                                            placeholder="Quantidade"
                                            className={styles.inputPesquisa}
                                            value={qtd}
                                            onChange={(e) =>
                                                setQtd(
                                                    Number(
                                                        e.target.value
                                                    )
                                                )
                                            }
                                        />

                                    </div>

                                    {/* PREÇO */}

                                    <div className={`${styles.boxInput} ${styles.pesquisaLista}`}>

                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Preço"
                                            className={styles.inputPesquisa}
                                            value={preco}
                                            onChange={(e) =>
                                                setPreco(
                                                    Number(
                                                        e.target.value
                                                    )
                                                )
                                            }
                                        />

                                    </div>

                                </div>

                                {/* BOTÕES */}

                                <div className={styles.botaoAdicionar}>

                                    <button
                                        onClick={adicionarProduto}
                                    >
                                        {acao}
                                    </button>

                                    <button
                                        onClick={() => {

                                            setBool("none");

                                            setIdVenda(null);

                                            setQtd(1);

                                            setPreco(0);

                                            setProdutoCaixaSelecionado(null);
                                        }}
                                        className={
                                            styles.btnCancelarEnvioMensagem
                                        }
                                    >
                                        Cancelar
                                    </button>

                                </div>

                            </div>

                            {/* ADD */}

                            <div
                                className={styles.adicionar}
                                onClick={() => {

                                    const primeiroProduto =
                                        produtos[0] ?? null;

                                    setBool("flex");

                                    setAcao("Adicionar");

                                    setQtd(1);

                                    setIdVenda(null);

                                    if (primeiroProduto) {

                                        setProdutoCaixaSelecionado(
                                            primeiroProduto.id
                                        );

                                        // =========================
                                        // PREÇO PADRÃO DO PRODUTO
                                        // =========================

                                        setPreco(
                                            Number(primeiroProduto.preco)
                                        );

                                    } else {

                                        setProdutoCaixaSelecionado(null);

                                        setPreco(0);
                                    }
                                }}
                            >
                                +
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </FormularioCard>
    );
}

export default EdicaoFluxoV2;