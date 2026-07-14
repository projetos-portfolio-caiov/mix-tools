package laudo.munition.system.core.entity.arma.valueObjects;

public class Pontuacao {
    private String value;

    private Pontuacao(String value) {
        this.value = value;
    }

    public static Pontuacao build(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return new Pontuacao(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Pontuacao{value='" + value + "'}";
    }
}
