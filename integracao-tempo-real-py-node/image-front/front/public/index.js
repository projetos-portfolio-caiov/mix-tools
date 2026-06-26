function cadastrar() {
        let email = document.getElementById("ipt_email_cad").value;
        let senha = document.getElementById("ipt_senha_cad").value;
        console.log(email, senha)

        fetch("/usuario/cadastrarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then((resultado) => {
            console.log(resultado);
        })
    }
    
    function logar() {
        let email = document.getElementById("ipt_email_login").value;
        let senha = document.getElementById("ipt_senha_login").value;

        fetch(`/usuario/${email}/${senha}/logar`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((resposta) => {
            resposta.json()
                .then(json => {
                    sessionStorage.ID_USUARIO = json.lista[0].idUsuario;
                    window.location = "./tela.html";
                })
        })
    }