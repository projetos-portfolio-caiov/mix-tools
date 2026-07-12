package laudo.munition.system.core.entity.usuario.valueObjects;

import laudo.munition.system.core.exception.ErroInternoException;

public class Token {

    private String value;

    private Token(String value) {
        this.value = value;
    }

    public static Token build(
            String value
    ) {
        if (
                value == null
                        || value.isBlank()
        ) {
            throw new ErroInternoException("Senha: %s mal formatada!".formatted(value));
        }
        return new Token(value);
    }

    public String getValue() {
        return this.value;
    }
}
