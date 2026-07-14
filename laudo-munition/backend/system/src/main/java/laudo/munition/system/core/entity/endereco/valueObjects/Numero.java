package laudo.munition.system.core.entity.endereco.valueObjects;

import laudo.munition.system.core.exception.DadosMalFormatados;

public class Numero {

    private Integer value;

    private Numero(Integer value) {
        this.value = value;
    }

    public static Numero build(Integer value) {
        if (value == null || value <= 0) {
            throw new DadosMalFormatados("Id de Cliente inválido: %s mal formatado!".formatted(value));
        }
        return new Numero(value);
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
