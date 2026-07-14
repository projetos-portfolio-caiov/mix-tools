package laudo.munition.system.core.entity.estande.valueObjects;

public class Presidente {

    private String value;

    private Presidente(String value) {
        this.value = value;
    }

    public static Presidente build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Presidente(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Presidente{value='" + value + "'}";
    }
}
