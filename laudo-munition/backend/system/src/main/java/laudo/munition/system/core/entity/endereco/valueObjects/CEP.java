package laudo.munition.system.core.entity.endereco.valueObjects;

public class CEP {

    private String value;

    private CEP(String value) {
        this.value = value;
    }

    public static CEP build(String value) {
        if (value == null || value.isBlank() || value.length() != 8) {
            return null;
        }
        return new CEP(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "CEP{value='" + value + "'}";
    }
}
