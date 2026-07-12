package laudo.munition.system.core.entity.endereco.valueObjects;

public class Estado {

    private String value;

    private Estado(String value) {
        this.value = value;
    }

    public static Estado build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Estado(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Estado{value='" + value + "'}";
    }
}
