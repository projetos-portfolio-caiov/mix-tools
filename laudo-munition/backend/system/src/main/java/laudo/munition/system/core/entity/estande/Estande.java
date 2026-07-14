package laudo.munition.system.core.entity.estande;

import laudo.munition.system.core.entity.estande.valueObjects.Presidente;
import laudo.munition.system.core.entity.shared.Email;
import laudo.munition.system.core.entity.shared.EnderecoId;
import laudo.munition.system.core.entity.shared.Nome;
import laudo.munition.system.core.entity.shared.Telefone;

public class Estande {

    private Integer id;
    private Nome nome;
    private Email email;
    private Telefone telefone;
    private Presidente presidente;
    private EnderecoId enderecoId;

    public Estande(
            Integer id,
            Nome nome,
            Email email,
            Telefone telefone,
            Presidente presidente,
            EnderecoId enderecoId
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.presidente = presidente;
        this.enderecoId = enderecoId;
    }

    public static Estande build(
            Integer id,
            String nome,
            String email,
            String telefone,
            String presidente,
            Integer enderecoId
    ) {
        return new Estande(
                id,
                Nome.build(nome),
                Email.build(email),
                Telefone.build(telefone),
                Presidente.build(presidente),
                EnderecoId.build(enderecoId)
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


    public Presidente getPresidente() {
        return this.presidente;
    }

    public EnderecoId getEnderecoId() {
        return this.enderecoId;
    }
}
