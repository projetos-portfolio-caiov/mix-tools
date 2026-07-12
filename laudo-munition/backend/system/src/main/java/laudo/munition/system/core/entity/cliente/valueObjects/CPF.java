package laudo.munition.system.core.entity.cliente.valueObjects;

public class CPF {

    private String value;

    private CPF(String value) {
        this.value = value;
    }

    public static CPF build (String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        return new CPF(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "CPF{" +
                "value=" + value +
                '}';
    }
}
