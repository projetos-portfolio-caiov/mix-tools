package laudo.munition.system.core.entity.usuario.valueObjects;

public class Cargo {

    private Integer value;

    private Cargo(Integer value) {
        this.value = value;
    }

    public static Cargo build (Integer value) {
        if (value == null || value < 0 || value < 1) {
            return null;
        }
        return new Cargo(value);
    }

    public Integer getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Cargo{" +
                "value=" + value +
                '}';
    }
}
