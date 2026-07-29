import styles from "./Home.module.css";

import clienteIconSLC from "../../components/icons/IconClienteSLC.svg";
import usuarioIcon from "../../components/icons/IconUsuario.svg";
import laudoIcon from "../../components/icons/IconLaudo.svg";
import dashIconSLC from "../../components/icons/IconDashSLC.svg";
import setaIconSLC from "../../components/icons/IconSetaBtnSLC.svg";
import setaIcon from "../../components/icons/IconSetaBranco.svg";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const btnAcessarDash = () => {
        navigate("/dashboard");
    };

    const btnAcessarClientes = () => {
        navigate("/cliente/listagem");
    };

    const btnAcessarFluxo = () => {
        navigate("/fluxo/listagem");
    };

    const btnAcessarProduto = () => {
        navigate("/produto/listagem");
    };
    
    const btnAcessarCanal = () => {
        navigate("/canal/listagem");
    };

    const btnAcessarMensagem = () => {
        navigate("/mensagem/listagem");
    };


    return (
        <main className={styles.homePage}>
            <div className={styles.conteudo}>

                <h1>O que deseja realizar hoje?</h1>
                <p>Escolha uma das opções abaixo para gerenciar sua confeitaria</p>

                <section className={styles.gerenciamento}>

                    <div className={styles.selecaoPrincipal}>

                        <div className={`${styles.slcPrincipal} ${styles.optCliente}`}>
                            <div className={styles.imgDesc}>
                                <div className={styles.imgSLC}>
                                    <img src={clienteIconSLC} alt="" className={styles.imgClienteSLC}/>
                                </div>

                                <div className={styles.desc}>
                                    <h3>Gerenciar Clientes</h3>
                                    <p>Controle completo da sua base de clientes</p>
                                    <ul>
                                        <li>Visualizar todos os clientes</li>
                                        <li>Cadastrar clientes</li>
                                        <li>Atualizar dados dos clientes</li>
                                        <li>Remover clientes</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.acesso}>
                                <button onClick={btnAcessarClientes}>
                                    Acessar Ferramenta <img src={setaIconSLC} alt="" />
                                </button>
                            </div>
                        </div>

                        <div className={`${styles.slcPrincipal} ${styles.optCaixa}`}>
                            <div className={styles.imgDesc}>
                                <div className={styles.imgSLC}>
                                    <img src={usuarioIcon} alt="" className={styles.imgCaixaSLC}/>
                                </div>

                                <div className={styles.desc}>
                                    <h3>Gerenciar Usuários</h3>
                                    <p>Gerencie os usuários que realizaram ou irão realizar laudos</p>
                                    <ul>
                                        <li>Visualizar todos os pedidos de laudos</li>
                                        <li>Cadastrar usuários</li>
                                        <li>Atualizar dados dos usuários</li>
                                        <li>Remover usuários</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.acesso}>
                                <button onClick={btnAcessarFluxo}>
                                    Acessar Ferramenta <img src={setaIconSLC} alt="" />
                                </button>
                            </div>
                        </div>

                        <div className={`${styles.slcPrincipal} ${styles.optProduto}`}>
                            <div className={styles.imgDesc}>
                                <div className={styles.imgSLC}>
                                    <img src={laudoIcon} alt="" className={styles.imgProdutoSLC}/>
                                </div>

                                <div className={styles.desc}>
                                    <h3>Gerenciar Laudos</h3>
                                    <p>Organiza seus laudos marcados</p>
                                    <ul>
                                        <li>Visualizar todos os laudos</li>
                                        <li>Cadastrar laudos</li>
                                        <li>Aprovar laudos</li>
                                        <li>Atualizar dados dos laudos</li>
                                        <li>Remover laudos</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.acesso}>
                                <button onClick={btnAcessarProduto}>
                                    Acessar Ferramenta <img src={setaIconSLC} alt="" />
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className={styles.selecaoDash}>
                        <div className={styles.slcDash}>
                            <div className={styles.imgDescDash}>
                                <div className={styles.imgDashSLC}>
                                    <img src={dashIconSLC} alt="" />
                                </div>

                                <div className={styles.descDash}>
                                    <h3>Dashboard</h3>
                                    <p>Visualize a situação financeira do seu negócio</p>
                                </div>
                            </div>

                            <div className={styles.acessoDash}>
                                <button onClick={btnAcessarDash}>
                                    Acessar Dashboard <img src={setaIcon} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </main>
    );
}

export default HomePage;