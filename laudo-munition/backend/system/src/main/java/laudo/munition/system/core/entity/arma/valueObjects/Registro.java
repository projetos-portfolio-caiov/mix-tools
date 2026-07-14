package laudo.munition.system.core.entity.arma.valueObjects;

public class Registro {
    private String value;

    private Registro(String value) {
        this.value = value;
    }

    public static Registro build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Registro(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Registro{value='" + value + "'}";
    }
}
