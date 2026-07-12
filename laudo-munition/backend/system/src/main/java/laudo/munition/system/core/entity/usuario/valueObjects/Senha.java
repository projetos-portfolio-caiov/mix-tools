package laudo.munition.system.core.entity.usuario.valueObjects;

import laudo.munition.system.core.entity.generalValueObjects.Email;

public class Senha {

    private String value;

    private Senha(String value) {
        this.value = value;
    }

    public static Senha build(String value) {
        if (value == null || value.isBlank() || value.length() <= 8) {
            return null;
        }
        return new Senha(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Senha{value='" + value + "'}";
    }
}
