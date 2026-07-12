package laudo.munition.system.core.entity.cliente.valueObjects;

public class RG {

    private String value;

    private RG(String value) {
        this.value = value;
    }

    public static RG build (String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        return new RG(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "RG{" +
                "value=" + value +
                '}';
    }
}
