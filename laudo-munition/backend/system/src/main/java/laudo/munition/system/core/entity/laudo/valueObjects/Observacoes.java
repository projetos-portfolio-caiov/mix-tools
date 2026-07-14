package laudo.munition.system.core.entity.laudo.valueObjects;

public class Observacoes {

    private String value;

    private Observacoes(String value) {
        this.value = value;
    }

    public static Observacoes build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Observacoes(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Observacoes{value='" + value + "'}";
    }
}
