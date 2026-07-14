package laudo.munition.system.application.port;

import laudo.munition.system.core.entity.usuario.Usuario;

public interface TokenProvider {

    String gerarToken(Usuario usuario);

    String obterLogin(String token);

    boolean validar(String token);

}