package laudo.munition.system.core.entity.generalValueObjects;

public class Nome {

    private String value;

    private Nome(String value) {
        this.value = value;
    }

    public static Nome build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Nome(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Nome{value='" + value + "'}";
    }
}