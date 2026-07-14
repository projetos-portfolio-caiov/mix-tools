package laudo.munition.system.core.entity.laudo.valueObjects;

import laudo.munition.system.core.entity.usuario.valueObjects.Cargo;

public class Aprovado {

    private Integer value;

    private Aprovado(Integer value) {
        this.value = value;
    }

    public static Aprovado build (Integer value) {
        if (value == null || value < 0 || value < 1) {
            return null;
        }
        return new Aprovado(value);
    }

    public Integer getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Aprovado{" +
                "value=" + value +
                '}';
    }
}
