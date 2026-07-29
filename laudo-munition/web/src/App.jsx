import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./containers/Login/login.jsx";

import MainLayout from "./layouts/MainLayout.jsx";

import HomePage from "./containers/Home/Home.jsx";

{/* CLIENTE */ }
import Cliente from "./containers/Cliente/Cliente.jsx";
import ListagemCliente from "./containers/Cliente/Listagem/ClienteListagem.jsx";
import CadastroClienteV2 from "./containers/Cliente/CadastroEdicao/CadastroClienteV2.jsx";
import EdicaoClienteV2 from "./containers/Cliente/CadastroEdicao/EdicaoClienteV2.jsx";

{/* DASHBOARD */ }
import Dashboard from "./containers/Dashboard/Dashboard.jsx";
import DashGeral from "./containers/Dashboard/geral/geral.jsx";
import DashCliente from "./containers/Dashboard/cliente/cliente.jsx";
import DashFinanceiro from "./containers/Dashboard/financeiro/financeiro.jsx";
import DashProduto from "./containers/Dashboard/produto/produto.jsx";

{/* FLUXO DE CAIXA */ }
import Fluxo from "./containers/Fluxo/Fluxo.jsx";
import ListagemFluxo from "./containers/Fluxo/Listagem/listagemFluxo.jsx";
import CadastroFluxoV2 from "./containers/Fluxo/CadastroEdicao/CadastroFluxoV2.jsx";
import EdicaoFluxoV2 from "./containers/Fluxo/CadastroEdicao/EdicaoFluxoV2.jsx";

{/* MENSAGEM */ }
import Mensagem from "./containers/Mensagem/mensagem.jsx";
import CadastroMensagem from "./containers/Mensagem/CadastroEdicao/cadastro_mensagem.jsx";
import ListagemMensagem from "./containers/Mensagem/Listagem/listagem_mensagem.jsx";
import EditarMensagem from "./containers/Mensagem/CadastroEdicao/editar_mensagem.jsx";
import EnvioMensagem from "./containers/Mensagem/Envio/EnvioMensagem.jsx";

{/* PRODUTO */ }
import Produto from "./containers/Produto/Produto.jsx";
import ListagemProduto from "./containers/Produto/Listagem/ProdutoListagem.jsx";
import CadastroProduto from "./containers/Produto/CadastroEdicao/CadastroProduto.jsx";
import EdicaoProduto from "./containers/Produto/CadastroEdicao/EdicaoProduto.jsx";

{/* Canal */ }
import Canal from "./containers/Canal/Canal.jsx";
import CadastroCanal from "./containers/Canal/CadastroEdicao/CadastroCanal.jsx";
import EdicaoCanal from "./containers/Canal/CadastroEdicao/EdicaoCanal.jsx";
import ListagemCanal from "./containers/Canal/Listagem/ListagemCanal.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />

          {/* CLIENTE */}
          <Route path="/cliente" element={<Cliente />}>
            <Route path="/cliente/listagem" element={<ListagemCliente />} />
            <Route path="/cliente/cadastro" element={<CadastroClienteV2 />} />
            <Route path="/cliente/edicao" element={<EdicaoClienteV2 />} />
          </Route>

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/geral" element={<DashGeral />} />
            <Route path="/dashboard/financeiro" element={<DashFinanceiro />} />
            <Route path="/dashboard/produto" element={<DashProduto />} />
            <Route path="/dashboard/cliente" element={<DashCliente />} />
          </Route>

          {/* FLUXO DE CAIXA */}
          <Route path="/fluxo" element={<Fluxo />}>
            <Route path="/fluxo/listagem" element={<ListagemFluxo />} />
            <Route path="/fluxo/cadastro" element={<CadastroFluxoV2 />} />
            <Route path="/fluxo/edicao" element={<EdicaoFluxoV2 />} />
          </Route>

          {/* PRODUTO */}
          <Route path="/produto" element={<Produto />}>
            <Route path="/produto/listagem" element={<ListagemProduto />} />
            <Route path="/produto/cadastro" element={<CadastroProduto />} />
            <Route path="/produto/edicao" element={<EdicaoProduto />} />
          </Route>

          {/* MENSAGEM */}
          <Route path="/mensagem" element={<Mensagem />}>
            <Route path="/mensagem/listagem" element={<ListagemMensagem />} />
            <Route path="/mensagem/cadastro" element={<CadastroMensagem />} />
            <Route path="/mensagem/edicao" element={<EditarMensagem />} />
            <Route path="/mensagem/envio" element={<EnvioMensagem />} />
          </Route>

          {/* CANAL */}
          <Route path="/canal" element={<Canal />}>
            <Route path="/canal/listagem" element={<ListagemCanal />} />
            <Route path="/canal/cadastro" element={<CadastroCanal />} />
            <Route path="/canal/edicao" element={<EdicaoCanal />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;