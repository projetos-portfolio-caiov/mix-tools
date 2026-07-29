import styles from "./listagemFluxo.module.css";
import InputPesquisa from "../../../components/inputFluxoPesquisa/InputFluxoPesquisa.jsx";
import CardListagemFluxo from "../../../components/CardListagemNova/CardListagemFluxo";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import ConfirmarRemocaoCard from "../../../components/ConfirmarRemocaoCard/ConfirmarRemocaoCard.jsx";

function ListagemFluxo() {
  const { movimentacoes, setMovimentacoes, setMovimentacaoSelecionada } = useOutletContext();
  const [ filtrar, setFiltrar ] = useState("cliente");

  const [ cursor, setCursor ] = useState(null);
  const [ temProxima, setTemProxima ] = useState(true);
  const [ loading, setLoading ] = useState(false);

  const [ mostrarModal, setMostrarModal ] = useState(false)
  const [ movimentacaoRemover, setMovimentacaoRemover ] = useState(null)

  function abrirConfirmacao(id) {
    console.log(id)

      const movimentacao = movimentacoes.find(
      m => m.movimentacao.id === Number(id)
      )

      setMovimentacaoRemover(movimentacao)
      setMostrarModal(true)
  }

  function filtrarMov(value) {
    console.log("filtrarMov")
    console.log(value)

    if(value != "" && value != null) {
        api.get(`/movimentacoes/filtro/${filtrar}/${value}`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
            }
        })
        .then((res) => {
            tratarResponse(res);
        });
    } else {
      setCursor(null);
      setTemProxima(true);
      buscarVendas(null, true);
    }
  }

  function tratarResponse(res) {
    let vendas_estruturadas = [];

    console.log("Resposta da API (raw):")
    console.log(res.data)

    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i]) {
        let canal = res.data[i].canal || {
          categoria: "Não identificado",
          descricao: "Não identificado",
          id: "",
          metodo: "",
          periodicidade: ""
        };

        let cliente = res.data[i].cliente || {
          id: "",
          nome: "Não identificado"
        };

        let vendas_raw = [];
        if (res.data[i].compras && res.data[i].compras.length > 0) {
          vendas_raw = res.data[i].compras.map(compra => ({
            ...compra,
            // Fallback robusto caso o produto venha null da API
            produto: compra.produto || {
              id: "",
              nome: "Produto removido",
              tipo: "Produto removido",
              descricao: "Item excluído",
              imagem: ""
            }
          }));
        } else {
          vendas_raw = [{
            id: null,
            qtd: "",
            produto: {
              id: "",
              nome: "Não identificado",
              tipo: "Não identificado",
              descricao: "",
              imagem: ""
            }
          }];
        }

        let movimentacao_corrigido = {
          "id": res.data[i].id,
          "dtHora": new Date(res.data[i].dtHora).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
          "valor": res.data[i].valor,
        };

        vendas_estruturadas.push({
          movimentacao: movimentacao_corrigido,
          canal: canal,
          vendas: vendas_raw,
          cliente: cliente
        });
      }
    }

    return vendas_estruturadas;
  }

  function buscarVendas(novoCursor = null, reset = false) {
    if (loading) return;

    setLoading(true);

    let url = `/movimentacoes/pagina/cursor?tamanho=30`;

    if (novoCursor) {
        url += `&cursor=${novoCursor}`;
    }

    api.get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
        
      },
    })
    .then((res) => {
        const data = res.data;

        const validados = tratarResponse({ data: data.dados });

        if (reset) {
          setMovimentacoes(validados);
        } else {
          setMovimentacoes(prev => [...prev, ...validados]);
        }

        console.log("Resposta da API:")
        console.log(validados)

        setCursor(data.proximoCursor);
        setTemProxima(data.temProxima);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        setLoading(false);
    });
  }

  function remover() {
    api.delete(`/movimentacoes/${movimentacaoRemover.movimentacao.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
      },
    }).then((res) => {
      buscarVendas(null, true);
      setMostrarModal(false);
    });
  }

  useEffect(() => {
    buscarVendas(null, true);
  }, []);

  return (
    <div className={styles.listagemFluxoContainer}>

      <div className={styles.cabecalhoInput}>
        <InputPesquisa textoPlaceHolder="Pesquise por cliente, produto, data..." procurar={filtrarMov} setFiltro={setFiltrar}/>
      </div>

      <div className={styles.cardClienteFluxo}>

        {/* Cabeçalho */}
        <div className={styles.cabecalho}>
          <span>Data</span>
          <span>Tipo</span>
          <span>Categoria</span>
          <span>Valor</span>
          <span>Produto</span>
          <span>Cliente</span>
          <span>Ações</span>
        </div>

        {/*  Linhas  */}
        <div className={styles.linhas}>
          {movimentacoes.map((mov) => (
            <CardListagemFluxo
              id={mov.movimentacao.id}
              info1={mov.canal}
              info2={mov.movimentacao}
              info3={mov.vendas}
              info4={mov.cliente}
              setSelecionado={setMovimentacaoSelecionada}
              url="fluxo"
              remover={abrirConfirmacao}
            />
          ))}
        </div>
      </div>
      {
        mostrarModal && (
        <ConfirmarRemocaoCard
            titulo="Remover movimentação"
            mensagem={`Deseja realmente remover a movimentação do dia "${movimentacaoRemover.movimentacao.dtHora}" de ${movimentacaoRemover.cliente.nome}?`} 
            onConfirmar={remover}
            onCancelar={() => setMostrarModal(false)}
        />
        )
      }
      {temProxima && (
          <button 
              onClick={() => buscarVendas(cursor)}
              disabled={loading}
              className={styles.botaoCarregar}
          >
              {loading ? "Carregando..." : "Carregar mais"}
          </button>
      )}
    </div>
  );
}

export default ListagemFluxo;