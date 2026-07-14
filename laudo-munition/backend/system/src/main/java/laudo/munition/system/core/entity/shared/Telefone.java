package laudo.munition.system.core.entity.shared;

public class Telefone {

    private String value;


    private Telefone(String telefone) {
        this.value = telefone;
    }

    public static Telefone build(String telefone) {
        if (telefone.length() != 13) {
            return null;
        }
        return new Telefone(telefone);
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Telefone{" +
                "value='" + value + '\'' +
                '}';
    }
}
