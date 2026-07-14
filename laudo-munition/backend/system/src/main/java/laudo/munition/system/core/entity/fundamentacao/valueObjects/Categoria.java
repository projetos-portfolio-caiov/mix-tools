package laudo.munition.system.core.entity.fundamentacao.valueObjects;

public class Categoria {
    private String value;

    private Categoria(String value) {
        this.value = value;
    }

    public static Categoria build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Categoria(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Categoria{value='" + value + "'}";
    }
}
