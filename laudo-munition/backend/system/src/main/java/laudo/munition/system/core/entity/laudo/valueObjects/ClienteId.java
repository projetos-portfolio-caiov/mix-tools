package laudo.munition.system.core.entity.laudo.valueObjects;

import laudo.munition.system.core.exception.DadosMalFormatados;

public class ClienteId {

    private Integer value;

    private ClienteId(Integer value) {
        this.value = value;
    }

    public static ClienteId build(Integer value) {
        if (value == null || value <= 0) {
            throw new DadosMalFormatados("Id de Cliente inválido: %s mal formatado!".formatted(value));
        }
        return new ClienteId(value);
    }

    public Integer getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "ClienteId{" +
                "value='" + value + '\'' +
                '}';
    }
}
