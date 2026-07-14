package laudo.munition.system.core.entity.laudo;

import laudo.munition.system.core.entity.shared.EstandeId;
import laudo.munition.system.core.entity.laudo.valueObjects.*;

public class Laudo {

    private Integer id;
    private ClienteId clienteId;
    private EstandeId estandeId;
    private DtHora dtHora;
    private Observacoes observacoes;
    private Integer fundamentacaoId;
    private Integer armaId;
    private Aprovado aprovado;

    public Laudo(
            Integer id,
            ClienteId clienteId,
            EstandeId estandeId,
            DtHora dtHora,
            Observacoes observacoes,
            Integer fundamentacaoId,
            Integer armaId,
            Aprovado aprovado
    ) {
        this.id = id;
        this.clienteId = clienteId;
        this.estandeId = estandeId;
        this.dtHora = dtHora;
        this.observacoes = observacoes;
        this.fundamentacaoId = fundamentacaoId;
        this.armaId = armaId;
        this.aprovado = aprovado;
    }

    public static Laudo build(
            Integer id,
            Integer clienteId,
            Integer estandeId,
            String dtHora,
            String observacoes,
            Integer fundamentacaoId,
            Integer armaId,
            Integer aprovado
    ) {
        return new Laudo(
                id,
                ClienteId.build(clienteId),
                EstandeId.build(estandeId),
                DtHora.build(dtHora),
                Observacoes.build(observacoes),
                fundamentacaoId,
                armaId,
                Aprovado.build(aprovado)
        );
    }

    public static Laudo rebuild() {
        return null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer Id) {
        this.id = Id;
    }

    public ClienteId getClienteId() {
        return clienteId;
    }

    public void setClienteId(ClienteId clienteId) {
        this.clienteId = clienteId;
    }

    public EstandeId getEstandeId() {
        return estandeId;
    }

    public void setEstandeId(EstandeId estandeId) {
        this.estandeId = estandeId;
    }

    public DtHora getDtHora() {
        return dtHora;
    }

    public void setDtHora(DtHora dtHora) {
        this.dtHora = dtHora;
    }

    public Observacoes getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(Observacoes observacoes) {
        this.observacoes = observacoes;
    }

    public Integer getFundamentacaoId() {
        return fundamentacaoId;
    }

    public void setFundamentacaoId(Integer fundamentacaoId) {
        this.fundamentacaoId = fundamentacaoId;
    }

    public Integer getArmaId() {
        return armaId;
    }

    public void setArmaId(Integer armaId) {
        this.armaId = armaId;
    }

    public Aprovado getAprovado() {
        return aprovado;
    }

    public void setAprovado(Aprovado aprovado) {
        this.aprovado = aprovado;
    }

}
