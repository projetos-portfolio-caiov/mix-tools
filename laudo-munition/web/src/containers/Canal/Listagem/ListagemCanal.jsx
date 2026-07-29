import styles from "./ListagemCanal.module.css";
import InputDePesquisa from "../../../components/inputDePesquisa/InputPesquisa";
import CardListagem from "../../../components/CardListagemNova/CardListagemCanal";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import ConfirmarRemocaoCard from "../../../components/ConfirmarRemocaoCard/ConfirmarRemocaoCard";

function ListagemCanal() {
  const { canais, setCanais, setCanalSelecionado } = useOutletContext();
    const [mostrarModal, setMostrarModal] = useState(false)
    const [canalRemover, setCanalRemover] = useState(null)

  function abrirConfirmacao(id) {
    const canal = canais.find(
      p => p.id === Number(id)
    )

    setCanalRemover(canal)
    setMostrarModal(true)
  }

  function filtrarCategoria(value) {

        if(value != "" && value != null) {
            api.get(`/canais/filtrado/${value}`,
            {
                headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
                }
            }
            ).then(res => {
              if(res.data.length > 0) {
                console.log(res.data)
                setCanais(res.data);
              }
            })
        } else {
            buscarCanais()
        }

    }

  function removerCanalConfirmado() {
    api.delete(`/canais/${canalRemover.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
      }
    })
    .then(() => {
      setCanais(prev =>
        prev.filter(p => p.id !== canalRemover.id)
      )
      setMostrarModal(false)
    })
  }

  function buscarCanais() {
    api.get(`/canais`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
      }
    }).then((res) => {
      console.log(res.data)
      setCanais(res.data);
    });
  }

  useEffect(() => {
    buscarCanais();
  }, []);

  return (
    <div className={styles.listagem}>

      <InputDePesquisa textoPlaceHolder="Pesquise por tipo, categoria, periodicidade..."  procurar={filtrarCategoria}/>

      <div className={styles.cardCanal}>

        {/* Cabeçalho */}
        <div className={styles.cabecalho}>
          <span>Tipo</span>
          <span>Categoria</span>
          <span>Periodicidade</span>
          <span>Descrição</span>
          <span>Ações</span>
        </div>

        {/* Linhas */}
        <div className={styles.linhas}>
          {canais.map((canal) => (
            <CardListagem
              key={canal.id}
              info1={canal.categoria}
              info2={canal.metodo}
              info3={canal.periodicidade}
              info4={canal.descricao}
              setSelecionado={setCanalSelecionado}
              remover={abrirConfirmacao}
              id={canal.id}
              url="canal"
            />
          ))}
        </div>

      </div>
    {
      mostrarModal && (
      <ConfirmarRemocaoCard
          titulo="Remover canal"
          mensagem={`Deseja realmente remover o canal "${canalRemover?.categoria}"?`}
          onConfirmar={removerCanalConfirmado}
          onCancelar={() => setMostrarModal(false)}
      />
      )
    }
    </div>
  );
}

export default ListagemCanal;
