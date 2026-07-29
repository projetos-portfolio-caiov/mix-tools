import { api } from "../../api";
import styles from "./listagemClienteMensagem.module.css";
import { useEffect, useState } from "react";

function ListagemClienteMensagem({ clientes, setClientes, filtro_pf, filtro_tipo, selecionados, setSelecionados }) {

  const [clientesOriginais, setClientesOriginais] = useState([])

  function marcarCliente(id) {

    setSelecionados(prev => {
      if (prev.includes(id)) {
        return prev.filter(clienteId => clienteId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  function selecionarTodos() {
    if (selecionados.length === clientes.length) {
      setSelecionados([])
    } else {
      setSelecionados(clientes.map(cliente => cliente.id))
    }
  }

  function aplicarFiltros() {

    let listaFiltrada = [...clientesOriginais]

    if (filtro_pf !== "all_pessoa") {
      listaFiltrada = listaFiltrada.filter(
        cliente => cliente.pf === Number(filtro_pf)
      )
    }

    if (filtro_tipo !== "all_clientes") {
      listaFiltrada = listaFiltrada.filter(
        cliente => cliente.tipo === Number(filtro_tipo)
      )
    }

    console.log(listaFiltrada)
    setClientes(listaFiltrada)
  }

  function buscarClientela() {
    api.get(`/clientes`,
    {
        headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
        }
    }
    ).then(res => {
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

        console.log(clientes_validados)
        setClientes(clientes_validados)
        setClientesOriginais(clientes_validados)
    })
  }
    
  useEffect(() =>{
    buscarClientela()
  }, [])

  useEffect(() => {
    aplicarFiltros()
  }, [filtro_pf, filtro_tipo])
  
  return (
    <div className={styles.listaStyle}>
      
      <div className={styles.selecionarTodosAbaixo}>
        <input
          type="checkbox"
          className={styles.checkboxSelecionarTodosAbaixo}
          checked={selecionados.length === clientes.length}
          onChange={selecionarTodos}
        />

        <div className={styles.estruturaRegistroListagem}>
          <span className={styles.textoCampoFormulario}>
            Selecionar todos abaixo
          </span>
        </div>
      </div>
      
        {
          clientes.map(cliente => (
            <div className={styles.selecionarTodosAbaixo}>
              <input
              type="checkbox"
              className={styles.checkboxSelecionarTodosAbaixo}
              checked={selecionados.includes(cliente.id)}
              onChange={() => marcarCliente(cliente.id)}
            />

            <div className={styles.estruturaRegistroListagem}>
              <span className={styles.textoCampoFormulario}>
                Nome: {cliente.nome} ({cliente.descricao})
              </span>

              <span className={styles.textoCampoFormulario}>
                Telefone: {cliente.telefoneFormatado}
              </span>

              <span className={styles.textoCampoFormulario}>
                Tipo: {cliente.tipo == 0 ? 'Revenda' : cliente.tipo == 1 ? 'iFood' : 'Festa de Aniversário'} ({cliente.pf == 1 ? 'CPF' : 'CNPJ'})
              </span>
            </div>
          </div>
          ))
        }
    </div>
  );
}

export default ListagemClienteMensagem;