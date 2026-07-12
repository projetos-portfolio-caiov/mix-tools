package laudo.munition.system.core.entity.endereco;

import laudo.munition.system.core.entity.endereco.valueObjects.Bairro;
import laudo.munition.system.core.entity.endereco.valueObjects.CEP;
import laudo.munition.system.core.entity.endereco.valueObjects.Cidade;
import laudo.munition.system.core.entity.endereco.valueObjects.Complemento;
import laudo.munition.system.core.entity.endereco.valueObjects.Estado;
import laudo.munition.system.core.entity.endereco.valueObjects.Logradouro;
import laudo.munition.system.core.entity.endereco.valueObjects.Numero;

public class Endereco {

    private Integer id;
    private Bairro bairro;
    private CEP cep;
    private Cidade cidade;
    private Complemento complemento;
    private Estado estado;
    private Logradouro logradouro;
    private Numero numero;

    public Endereco(
            Integer id,
            Bairro bairro,
            CEP cep,
            Cidade cidade,
            Complemento complemento,
            Estado estado,
            Logradouro logradouro,
            Numero numero
    ) {
        this.id = id;
        this.bairro = bairro;
        this.cep = cep;
        this.cidade = cidade;
        this.complemento = complemento;
        this.estado = estado;
        this.logradouro = logradouro;
        this.numero = numero;
    }

    public static Endereco build(
            Integer id,
            String bairro,
            String cep,
            String cidade,
            String complemento,
            String estado,
            String logradouro,
            Integer numero
    ) {
        return new Endereco(
                id,
                Bairro.build(bairro),
                CEP.build(cep),
                Cidade.build(cidade),
                Complemento.build(complemento),
                Estado.build(estado),
                Logradouro.build(logradouro),
                Numero.build(numero)
        );
    }

    public static Endereco rebuild() {
        return null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer Id) {
        this.id = Id;
    }

    public Bairro getBairro() {
        return bairro;
    }

    public void setBairro(Bairro bairro) {
        this.bairro = bairro;
    }


    public CEP getCEP() {
        return cep;
    }

    public void setCEP(CEP cep) {
        this.cep = cep;
    }


    public Cidade getCidade() {
        return cidade;
    }

    public void setCidade(Cidade cidade) {
        this.cidade = cidade;
    }


    public Complemento getComplemento() {
        return complemento;
    }

    public void setComplemento(Complemento complemento) {
        this.complemento = complemento;
    }


    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }


    public Logradouro getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(Logradouro logradouro) {
        this.logradouro = logradouro;
    }


    public Numero getNumero() {
        return numero;
    }

    public void setNumero(Numero numero) {
        this.numero = numero;
    }
}
