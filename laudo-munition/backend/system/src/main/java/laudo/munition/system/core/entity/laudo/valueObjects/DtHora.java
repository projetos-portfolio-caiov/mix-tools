package laudo.munition.system.core.entity.laudo.valueObjects;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.regex.Pattern;

public class DtHora {

    private LocalDateTime value;
    private static final Pattern DATE_REGEX_PATTERN = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$");

    private DtHora(LocalDateTime value) {
        this.value = value;
    }

    public static DtHora build(String value) {
        if (value == null
                || value.isBlank()
                || DATE_REGEX_PATTERN.matcher(value).matches()) {
            throw new DadosMalFormatados("Data: %s mal formatada! 1".formatted(value));
        }

        LocalDateTime aux;

        try {
            aux = LocalDateTime.parse(value);

            if (aux.isAfter(LocalDateTime.now())) {
                throw new DadosMalFormatados("Data: %s mal formatada! 2".formatted(value));
            }
        } catch (DateTimeParseException e) {
            throw new DadosMalFormatados("Data: %s mal formatada!".formatted(value));
        }

        return new DtHora(aux);
    }

    public LocalDateTime getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "DtHora{" +
                "value='" + value + '\'' +
                '}';
    }
}
