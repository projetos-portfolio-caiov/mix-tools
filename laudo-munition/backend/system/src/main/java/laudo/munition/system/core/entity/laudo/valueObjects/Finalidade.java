package laudo.munition.system.core.entity.laudo.valueObjects;

public class Finalidade {

    private String value;

    private Finalidade(String value) {
        this.value = value;
    }

    public static Finalidade build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Finalidade(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Finalidade{value='" + value + "'}";
    }
}
