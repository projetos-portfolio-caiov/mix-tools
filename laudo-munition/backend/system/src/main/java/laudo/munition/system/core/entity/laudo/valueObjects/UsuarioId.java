package laudo.munition.system.core.entity.laudo.valueObjects;

import laudo.munition.system.core.entity.generalValueObjects.EstandeId;
import laudo.munition.system.core.exception.DadosMalFormatados;

public class UsuarioId {

    private Integer value;

    private UsuarioId(Integer value) {
        this.value = value;
    }

    public static UsuarioId build(Integer value) {
        if (value == null || value <= 0) {
            throw new DadosMalFormatados("Id de Cliente inválido: %s mal formatado!".formatted(value));
        }
        return new UsuarioId(value);
    }

    public Integer getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "UsuarioId{" +
                "value='" + value + '\'' +
                '}';
    }
}
