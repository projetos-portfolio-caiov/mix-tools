package laudo.munition.system.core.entity.shared;

public class Email {

    private String value;

    private Email(String value) {
        this.value = value;
    }

    public static Email build(String value) {
        if (value == null || value.isBlank() || value.length() <= 8 || !value.contains("@")|| !value.contains(".com")) {
            return null;
        }
        return new Email(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Email{value='" + value + "'}";
    }
}
