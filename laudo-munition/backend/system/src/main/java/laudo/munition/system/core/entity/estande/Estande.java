package laudo.munition.system.core.entity.estande;

import laudo.munition.system.core.entity.generalValueObjects.Email;
import laudo.munition.system.core.entity.generalValueObjects.Nome;
import laudo.munition.system.core.entity.generalValueObjects.Telefone;

public class Estande {

    private Integer id;
    private Nome nome;
    private Email email;
    private Telefone telefone;

    public Estande(
            Integer id,
            Nome nome,
            Email email,
            Telefone telefone
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }

    public static Estande build(
            Integer id,
            String nome,
            String email,
            String telefone
    ) {
        return new Estande(
                id,
                Nome.build(nome),
                Email.build(email),
                Telefone.build(telefone)
        );
    }

    public static Estande rebuild() {
        return null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer Id) {
        this.id = Id;
    }

    public Nome getNome() {
        return this.nome;
    }

    public Email getEmail() {
        return this.email;
    }

    public Telefone getTelefone() {
        return this.telefone;
    }
}
