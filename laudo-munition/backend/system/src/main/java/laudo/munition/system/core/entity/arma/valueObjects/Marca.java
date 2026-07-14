package laudo.munition.system.core.entity.arma.valueObjects;

public class Marca {
    private String value;

    private Marca(String value) {
        this.value = value;
    }

    public static Marca build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Marca(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Marca{value='" + value + "'}";
    }
}
