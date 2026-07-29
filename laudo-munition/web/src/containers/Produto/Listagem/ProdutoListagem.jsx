import styles from "./ProdutoListagem.module.css";
import { useOutletContext } from "react-router-dom";
import CardMensagem from "../../../components/CardMensagem/card";
import InputPesquisa from "../../../components/inputDePesquisa/InputPesquisa";
import ConfirmarRemocaoCard from "../../../components/ConfirmarRemocaoCard/ConfirmarRemocaoCard";

import { useEffect, useState } from "react";
import { api } from "../../../api";

function ListagemProduto() {

  const { produtos, setProdutos, setProdutoSelecionado } = useOutletContext()
  const [mostrarModal, setMostrarModal] = useState(false)
  const [produtoRemover, setProdutoRemover] = useState(null)

  function abrirConfirmacao(id) {
    const produto = produtos.find(
      p => p.id === Number(id)
    )

    setProdutoRemover(produto)
    setMostrarModal(true)
  }

  function filtrarNome(value) {
    if(value != "" && value != null) {
        api.get(`/produtos/filtrado/${value}`,
        {
            headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
            }
        }
        ).then(res => {
            if(res.data.length > 0) {
              tratarResponse(res)
            }
        })
    } else {
        buscarProdutos()
    }
  }

  function removerProdutoConfirmado() {
    api.delete(`/produtos/${produtoRemover.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
      }
    })
    .then(() => {
      setProdutos(prev =>
        prev.filter(p => p.id !== produtoRemover.id)
      )
      setMostrarModal(false)
    })
  }

  function tratarResponse(res) {
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
      console.log(cards)
      setProdutos(cards)
  }

  function buscarProdutos() {
    api.get(`/produtos`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
      }
    })
    .then((res) => {
      tratarResponse(res)
    })
  }

  useEffect(() => {
    buscarProdutos()
  }, [])

  return (
    <div className={styles.contentListagemProduto}>
      <InputPesquisa textoPlaceHolder="Pesquisar título do produto" procurar={filtrarNome}/>
      <div className={styles.cardList}>
        {
          produtos.map(produto => (
            <CardMensagem
              key={produto.id}
              info1={produto.nome}
              info2={produto.descricao}
              info3={produto.preco}
              imagem={"https://s3-confeitaria-nocelli-raw.s3.us-east-1.amazonaws.com/img/produto/" + produto.imagem}
              setElementSelecionado={setProdutoSelecionado}
              remover={abrirConfirmacao}
              id={produto.id} 
              url="produto"
            />
          ))
        }
      </div>
      {
        mostrarModal && (
          <ConfirmarRemocaoCard
            titulo="Remover produto"
            mensagem={`Deseja realmente remover o produto "${produtoRemover?.nome}"?`}
            onConfirmar={removerProdutoConfirmado}
            onCancelar={() => setMostrarModal(false)}
          />
        )
      }
    </div>
  )
}

export default ListagemProduto;