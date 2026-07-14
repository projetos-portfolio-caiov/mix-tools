package laudo.munition.system.core.entity.cliente;

import laudo.munition.system.core.entity.cliente.valueObjects.*;
import laudo.munition.system.core.entity.shared.EnderecoId;
import laudo.munition.system.core.entity.shared.EstandeId;
import laudo.munition.system.core.entity.shared.Nome;
import laudo.munition.system.core.entity.shared.Telefone;

public class Cliente {

    private Integer id;
    private Nome nome;
    private CPF cpf;
    private RG rg;
    private Telefone telefone;
    private EstandeId estandeId;
    private EnderecoId enderecoId;

    public Cliente(
            Integer id,
            Nome nome,
            CPF cpf,
            RG rg,
            Telefone telefone,
            EstandeId estandeId,
            EnderecoId enderecoId
    ) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.rg = rg;
        this.telefone = telefone;
        this.estandeId = estandeId;
        this.enderecoId = enderecoId;
    }

    public static Cliente build(
            Integer id,
            String nome,
            String cpf,
            String rg,
            String telefone,
            Integer estandeId,
            Integer enderecoId
    ) {
        return new Cliente(
                id,
                Nome.build(nome),
                CPF.build(cpf),
                RG.build(rg),
                Telefone.build(telefone),
                EstandeId.build(estandeId),
                EnderecoId.build(enderecoId)
        );
    }

    public static Cliente rebuild() {
        return null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer Id) {
        this.id = Id;
    }

    public Nome getNome() {
        return nome;
    }

    public void setNome(Nome nome) {
        this.nome = nome;
    }


    public CPF getCPF() {
        return cpf;
    }

    public void setCPF(CPF cpf) {
        this.cpf = cpf;
    }


    public RG getRG() {
        return rg;
    }

    public void setRG(RG rg) {
        this.rg = rg;
    }


    public Telefone getTelefone() {
        return telefone;
    }

    public void setTelefone(Telefone telefone) {
        this.telefone = telefone;
    }


    public EstandeId getEstandeId() {
        return estandeId;
    }

    public void setEstandeId(EstandeId estandeId) {
        this.estandeId = estandeId;
    }


    public EnderecoId getEnderecoId() {
        return enderecoId;
    }

    public void setEnderecoId(EnderecoId enderecoId) {
        this.enderecoId = enderecoId;
    }

}
