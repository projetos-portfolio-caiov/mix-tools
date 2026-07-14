package laudo.munition.system.core.entity.arma.valueObjects;

public class Calibre {
    private String value;

    private Calibre(String value) {
        this.value = value;
    }

    public static Calibre build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Calibre(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Calibre{value='" + value + "'}";
    }
}
