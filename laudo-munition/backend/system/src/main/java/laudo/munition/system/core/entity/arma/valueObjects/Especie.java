package laudo.munition.system.core.entity.arma.valueObjects;

public class Especie {
    private String value;

    private Especie(String value) {
        this.value = value;
    }

    public static Especie build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Especie(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Especie{value='" + value + "'}";
    }
}
