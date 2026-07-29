import styles from './InputPesquisa.module.css'
import lupaIcon from '../icons/lupa.svg'

function InputPesquisa({ textoPlaceHolder, variant, procurar }) {

    return (

        <div className={`${styles.boxInput } ${variant==="pesquisaLista" ? styles.pesquisaLista : ""}`}>
            <img src={lupaIcon} alt="" className='iconeEmail' />
            <input
                type="text"
                placeholder={textoPlaceHolder}
                className= {styles.inputPesquisa}
                onChange={(event) => procurar(event.target.value)}
            />
        </div>
    )
}

export default InputPesquisa;