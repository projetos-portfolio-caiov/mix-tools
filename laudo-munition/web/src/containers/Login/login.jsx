import { useState } from 'react';
import styles from './login.module.css';
import imgEmail from "../../components/icons/email.svg";
import imgCadeado from "../../components/icons/cadeado.svg";
import imgOlho from "../../components/icons/olho.svg";
import { useNavigate } from "react-router-dom";
import { api } from '../../api';

function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [statusSenha, setStatusSenha] = useState("password");

  // controle de digitação
  const [digitouEmail, setDigitouEmail] = useState(false);
  const [digitouSenha, setDigitouSenha] = useState(false);

  // regras EMAIL
  const [regrasEmail, setRegrasEmail] = useState({
    tamanho: false,
    arroba: false
  });

  // regras SENHA
  const [regrasSenha, setRegrasSenha] = useState({
    tamanho: false,
    numero: false,
    letra: false
  });

  const navigate = useNavigate();

  function atualizarEmail(valor) {

    setEmail(valor);
    setDigitouEmail(true);

    setRegrasEmail({
      tamanho: valor.length >= 8,
      arroba: valor.includes("@")
    });
  }

  function atualizarSenha(valor) {

    setSenha(valor);
    setDigitouSenha(true);

    setRegrasSenha({

      tamanho: valor.length >= 6,

      numero:
        valor.includes("0") ||
        valor.includes("1") ||
        valor.includes("2") ||
        valor.includes("3") ||
        valor.includes("4") ||
        valor.includes("5") ||
        valor.includes("6") ||
        valor.includes("7") ||
        valor.includes("8") ||
        valor.includes("9"),

      letra:
        valor.toLowerCase() !== valor.toUpperCase()
    });
  }

  function validarELogar() {

    const emailValido =
      regrasEmail.tamanho &&
      regrasEmail.arroba;

    const senhaValida =
      regrasSenha.tamanho &&
      regrasSenha.numero &&
      regrasSenha.letra;

    if (!emailValido) {
      alert("Email inválido");
      return;
    }

    if (!senhaValida) {
      alert("Senha inválida");
      return;
    }

    logar();
  }

  function logar() {

    api.post(`/usuarios/login`, {
      email: email,
      senha: senha
    })

      .then(res => {

        sessionStorage.TOKEN = res.data.token;
        sessionStorage.NOME = "Ana Silva";

        navigate("/home");
      })

      .catch(() => {
        alert("Email ou senha inválidos");
      });
  }

  function atualizarInputSenha() {

    setStatusSenha(
      statusSenha === "password"
        ? "text"
        : "password"
    );
  }

  return (

    <div className={styles.paginaLogin}>

      {/* LADO ESQUERDO */}

      <div className={styles.ladoEsquerdo}>

        <div className={styles.iconeCupcake}>
          <img src="/image.png" alt="Cupcake" />
        </div>

        <h1 className={styles.boasVindas}>
          Bem-vindo!
        </h1>

        <p className={styles.mensagem}>
          Gerencie seus laudos/clientela com facilidade e eficiência
        </p>

      </div>

      {/* LADO DIREITO */}

      <div className={styles.ladoDireito}>

        <h2 className={styles.tituloLogin}>
          Login
        </h2>

        <p className={styles.instrucao}>
          Entre com suas credenciais para acessar o sistema
        </p>

        <div className={styles.inputsLogin}>

          {/* EMAIL */}

          <h2 className={styles.tituloCampos}>
            Email
          </h2>

          <div className={styles.boxInput}>

            <img
              src={imgEmail}
              alt=""
              className={styles.iconeEmail}
            />

            <input
              type="email"
              placeholder="seu@email.com"
              onChange={(e) =>
                atualizarEmail(e.target.value)
              }
            />
          </div>

          {digitouEmail && (

            <div className={styles.regrasSenha}>

              <p className={
                regrasEmail.tamanho
                  ? styles.ok
                  : styles.erro
              }>
                • Mínimo 8 caracteres
              </p>

              <p className={
                regrasEmail.arroba
                  ? styles.ok
                  : styles.erro
              }>
                • Deve conter "@"
              </p>

            </div>
          )}

          {/* SENHA */}

          <h2 className={styles.tituloCampos}>
            Senha
          </h2>

          <div className={styles.boxInput}>

            <img
              src={imgCadeado}
              alt=""
              className={styles.iconeCadeado}
            />

            <input
              className={styles.inputSenha}
              type={statusSenha}
              placeholder="Digite sua senha"
              onChange={(e) =>
                atualizarSenha(e.target.value)
              }
            />

            <img
              src={imgOlho}
              alt=""
              className={styles.imgOlho}
              onClick={atualizarInputSenha}
            />
          </div>

          {digitouSenha && (

            <div className={styles.regrasSenha}>

              <p className={
                regrasSenha.tamanho
                  ? styles.ok
                  : styles.erro
              }>
                • Mínimo 6 caracteres
              </p>

              <p className={
                regrasSenha.numero
                  ? styles.ok
                  : styles.erro
              }>
                • Pelo menos 1 número
              </p>

              <p className={
                regrasSenha.letra
                  ? styles.ok
                  : styles.erro
              }>
                • Pelo menos 1 letra
              </p>

            </div>
          )}

          <div className={styles.linhaCheckbox}>

          </div>

          <a
            href="#"
            className={styles.linkEsqueci}
          >
            <u>
              Esqueci minha senha
            </u>
          </a>

          <button
            className={styles.botaoEntrar}
            onClick={validarELogar}
          >
            Entrar →
          </button>

        </div>

        <p className={styles.criarConta}>
          Não tem uma conta?
          <a href="#"> <u>Entre em contato</u></a>
        </p>

      </div>
    </div>
  );
}

export default Login;