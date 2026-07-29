import styles from "./EnvioMensagem.module.css"
import FormularioCard from "../../../components/FormularioCard/FormularioCard";
import ListagemClienteMensagem from "../../../components/ListagemClienteMensagem/listagemClienteMensagem";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../../../api";
import { useState, useEffect } from "react";

function EnvioMensagem() {
    
    const navigate = useNavigate()
    const [ id, setId ] = useState("")
    const [dtEvento, setDtEvento] = useState("")
    const [imagem, setImagem] = useState("");
    const [texto, setTexto] = useState("")

    const [clientes, setClientes] = useState([])
    const [ selecionados, setSelecionados ] = useState([])

    const { mensagens } = useOutletContext();

    const [ pf, setPf ] = useState("all_pessoa")
    const [ tipoCliente, setTipoCliente ] = useState("all_clientes")

    function atualizarEnvio(idSelecionado) {   
        const mensagem = mensagens.find(
            c => c.id === Number(idSelecionado)
        )

        if(mensagem) {
            const [dia, mes, ano] = mensagem.dtEvento.split("/")
            setDtEvento(`${ano}-${mes}-${dia}`)
            setTexto(mensagem.texto)
            setImagem(mensagem.imagem)
            setId(mensagem.id)
        }
    }

    function voltarListagem() {
        navigate("/mensagem/listagem")
    }

    function enviar() {
        console.log("selecionados")
        console.log(selecionados)

        let payload = {
            mensagemId: id,
            clienteIds: selecionados
        };

        console.log("payload")
        console.log(payload)

        api.post(
            "/envio",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
                }
            }
        ).then((res) => {
            console.log(res)
            voltarListagem()
        })
    }

    useEffect(() => {
        if(mensagens) {
            const [dia, mes, ano] = mensagens[0].dtEvento.split("/")
            setDtEvento(`${ano}-${mes}-${dia}`)
            setTexto(mensagens[0].texto)
            setImagem(mensagens[0].imagem)
            setId(mensagens[0].id)
        }
    }, []);

    return (
        <FormularioCard title={"Envio de Mensagem"} sucesso={enviar} cancelar={voltarListagem}>
            <div className={styles.elements}>
                <div className={styles.formLadoA}>
                    <p>Título da mensagem:</p>
                    <select 
                        name="slt_mensagem"
                        id="slt_mensagem"
                        size={0}
                        onChange={ (event) => atualizarEnvio(event.target.value) }
                    >
                        {
                            mensagens.map(mensagem => (
                                <option key={mensagem.id} value={mensagem.id}>
                                    {mensagem.texto}
                                </option>
                            ))
                        }
                    </select>

                    <p>Data:</p>
                    <input type="date" value={dtEvento} disabled/>

                    <p>Corpo da mensagem:</p>
                    <input type="text" placeholder="Corpo da mensagem" value={texto} disabled/>

                    <div className={styles.imgFormEnvioMensagem}>
                        <img src={`https://s3-confeitaria-nocelli-raw.s3.us-east-1.amazonaws.com/img/msg/` + imagem} alt="" className={styles.img}/>
                    </div>
                </div>

                <div className={styles.formDivisor}></div>

                <div className={styles.formLadoB}>
                    <p>Destinatários:</p>

                    <div className={styles.filtrosDiv}>
                        <select onChange={(event) => setPf(event.target.value)}>
                            <option value="all_pessoa">Todos</option>
                            <option value="1">Pessoa Física</option>
                            <option value="0">Pessoa Jurídica</option>
                        </select>

                        <select onChange={(event) => setTipoCliente(event.target.value)}>
                            <option value="all_clientes">Todos</option>
                            <option value="0">Aniversário</option>
                            <option value="1">Revenda</option>
                            <option value="2">IFood</option>
                        </select>
                    </div>

                    <ListagemClienteMensagem
                        clientes={clientes}
                        setClientes={setClientes}
                        filtro_pf={pf}
                        filtro_tipo={tipoCliente}
                        selecionados={selecionados}
                        setSelecionados={setSelecionados}
                    />
                </div>
            </div>
        </FormularioCard>
    );
}

export default EnvioMensagem