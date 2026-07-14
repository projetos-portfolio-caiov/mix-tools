package laudo.munition.system.core.entity.arma.valueObjects;

public class Serie {
    private String value;

    private Serie(String value) {
        this.value = value;
    }

    public static Serie build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Serie(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Serie{value='" + value + "'}";
    }
}
