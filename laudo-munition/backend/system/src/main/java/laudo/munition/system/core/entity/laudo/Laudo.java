package laudo.munition.system.core.entity.laudo;

import laudo.munition.system.core.entity.generalValueObjects.Email;
import laudo.munition.system.core.entity.laudo.valueObjects.*;

public class Laudo {

    private Integer id;
    private ClienteId clienteId;
    private UsuarioId usuarioId;
    private DtHora dtHora;
    private Finalidade finalidade;
    private Arma arma;

    public Laudo(
            Integer id,
            ClienteId clienteId,
            UsuarioId usuarioId,
            DtHora dtHora,
            Finalidade finalidade,
            Arma arma
    ) {
        this.id = id;
        this.clienteId = clienteId;
        this.usuarioId = usuarioId;
        this.dtHora = dtHora;
        this.finalidade = finalidade;
        this.arma = arma;
    }

    public static Laudo build(
            Integer id,
            Integer clienteId,
            Integer usuarioId,
            String dtHora,
            String finalidade,
            String arma
    ) {
        return new Laudo(
                id,
                ClienteId.build(clienteId),
                UsuarioId.build(usuarioId),
                DtHora.build(dtHora),
                Finalidade.build(finalidade),
                Arma.build(arma)
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

    public UsuarioId getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(UsuarioId usuarioId) {
        this.usuarioId = usuarioId;
    }

    public DtHora getDtHora() {
        return dtHora;
    }

    public void setDtHora(DtHora dtHora) {
        this.dtHora = dtHora;
    }

    public Finalidade getFinalidade() {
        return finalidade;
    }

    public void setFinalidade(Finalidade finalidade) {
        this.finalidade = finalidade;
    }

    public Arma getArma() {
        return arma;
    }

    public void setArma(Arma arma) {
        this.arma = arma;
    }

}
