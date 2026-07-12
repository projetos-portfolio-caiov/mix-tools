package laudo.munition.system.core.entity.laudo.valueObjects;

import laudo.munition.system.core.entity.generalValueObjects.Nome;

public class Arma {

    private String value;

    private Arma(String value) {
        this.value = value;
    }

    public static Arma build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Arma(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Arma{value='" + value + "'}";
    }
}
