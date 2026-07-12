package laudo.munition.system.core.entity.endereco.valueObjects;

public class Complemento {

    private String value;

    private Complemento(String value) {
        this.value = value;
    }

    public static Complemento build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Complemento(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Complemento{value='" + value + "'}";
    }
}
