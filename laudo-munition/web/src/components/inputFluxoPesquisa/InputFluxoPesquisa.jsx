import styles from './InputFluxoPesquisa.module.css'
import lupaIcon from '../icons/lupa.svg'

function InputFluxoPesquisa({ textoPlaceHolder, variant, procurar, setFiltro }) {

    return (
        <div className={styles.cabecalhoInput}>
            <div className={`${styles.boxInput } ${variant==="pesquisaLista" ? styles.pesquisaLista : ""}`}>
                <img src={lupaIcon} alt="" className='iconeEmail' />
                <input
                    type="text"
                    placeholder={textoPlaceHolder}
                    className= {styles.inputPesquisa}
                    onChange={(event) => procurar(event.target.value)}
                    />
            </div>
            <select name="teste" id="" className={styles.slt} onChange={(event) => setFiltro(event.target.value)}>
                <option value="cliente">Cliente</option>
                <option value="tipo">Tipo</option>
                <option value="categoria">Categoria</option>
            </select>
        </div>
    )
}

export default InputFluxoPesquisa;