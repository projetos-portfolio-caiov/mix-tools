package laudo.munition.system.core.entity.arma.valueObjects;

public class Modelo {
    private String value;

    private Modelo(String value) {
        this.value = value;
    }

    public static Modelo build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Modelo(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Modelo{value='" + value + "'}";
    }
}
