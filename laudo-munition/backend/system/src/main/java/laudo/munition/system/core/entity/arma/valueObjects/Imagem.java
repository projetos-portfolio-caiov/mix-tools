package laudo.munition.system.core.entity.arma.valueObjects;

public class Imagem {
    private String value;

    private Imagem(String value) {
        this.value = value;
    }

    public static Imagem build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Imagem(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Imagem{value='" + value + "'}";
    }
}
