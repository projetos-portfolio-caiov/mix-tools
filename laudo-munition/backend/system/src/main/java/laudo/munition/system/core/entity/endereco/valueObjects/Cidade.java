package laudo.munition.system.core.entity.endereco.valueObjects;

public class Cidade {

    private String value;

    private Cidade(String value) {
        this.value = value;
    }

    public static Cidade build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Cidade(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Cidade{value='" + value + "'}";
    }
}
