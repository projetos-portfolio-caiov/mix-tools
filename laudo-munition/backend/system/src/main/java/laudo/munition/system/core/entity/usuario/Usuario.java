package laudo.munition.system.core.entity.usuario;

import laudo.munition.system.core.entity.shared.EstandeId;
import laudo.munition.system.core.entity.shared.Email;
import laudo.munition.system.core.entity.shared.Nome;
import laudo.munition.system.core.entity.usuario.valueObjects.Cargo;
import laudo.munition.system.core.entity.usuario.valueObjects.Senha;
import laudo.munition.system.core.entity.usuario.valueObjects.Token;
public class Usuario {

    private Integer id;
    private Email email;
    private Senha senha;
    private Nome nome;
    private Cargo cargo;
    private EstandeId estandeId;
    private Token token;

    public Usuario(
            Integer id,
            Email email,
            Senha senha,
            Nome nome,
            Cargo cargo,
            EstandeId estandeId
    ) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.cargo = cargo;
        this.estandeId = estandeId;
    }

    public Usuario() {
    }

    public static Usuario build(
            Integer id,
            String email,
            String senha,
            String nome,
            Integer cargo,
            Integer estandeId
    ) {
        return new Usuario(
                id,
                Email.build(email),
                Senha.build(senha),
                Nome.build(nome),
                Cargo.build(cargo),
                EstandeId.build(estandeId)
        );
    }

    public static Usuario buildlogin(
            String email,
            String senha
    ) {
        Usuario aux = new Usuario();
        aux.setEmail(Email.build(email));
        aux.setPassword(Senha.build(senha));
        return aux;
    }

    public static Usuario rebuild() {
        return null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer Id) {
        this.id = Id;
    }

    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public Senha getPassword() {
        return senha;
    }

    public void setPassword(Senha password) {
        this.senha = password;
    }

    public Token getToken() {
        return token;
    }

    public void setTokenFromString(String token) {
        this.token = Token.build(token);
    }

    public Nome getNome() {
        return nome;
    }

    public void setNome(Nome nome) {
        this.nome = nome;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }


    public EstandeId getEstandeId() {
        return estandeId;
    }

    public void setEstandeId(EstandeId estandeId) {
        this.estandeId = estandeId;
    }

    public static Usuario login(
            String email,
            String senha
    ) {

        Usuario usuario = new Usuario();

        usuario.email = Email.build(email);
        usuario.senha = Senha.build(senha);

        return usuario;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "userId='" + id + '\'' +
                ", email=" + email +
                ", password=" + senha +
                ", token=" + token +
                '}';
    }
}
