package laudo.munition.system.core.entity.endereco.valueObjects;

public class Bairro {

    private String value;

    private Bairro(String value) {
        this.value = value;
    }

    public static Bairro build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Bairro(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Bairro{value='" + value + "'}";
    }
}
