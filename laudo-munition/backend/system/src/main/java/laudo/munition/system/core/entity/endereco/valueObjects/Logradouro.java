package laudo.munition.system.core.entity.endereco.valueObjects;

public class Logradouro {

    private String value;

    private Logradouro(String value) {
        this.value = value;
    }

    public static Logradouro build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Logradouro(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Cidade{value='" + value + "'}";
    }
}
