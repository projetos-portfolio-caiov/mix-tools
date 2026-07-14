package laudo.munition.system.core.entity.shared;

import laudo.munition.system.core.exception.DadosMalFormatados;

public class EstandeId {

    private Integer value;

    private EstandeId(Integer value) {
        this.value = value;
    }

    public static EstandeId build(Integer value) {
        if (value == null || value <= 0) {
            throw new DadosMalFormatados("Id de Cliente inválido: %s mal formatado!".formatted(value));
        }
        return new EstandeId(value);
    }

    public Integer getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "EstandeId{" +
                "value='" + value + '\'' +
                '}';
    }
}
