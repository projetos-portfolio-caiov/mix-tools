package laudo.munition.system.application.dto.usuario;

import laudo.munition.system.core.entity.usuario.Usuario;
import laudo.munition.system.infraestructure.jpa.entity.UsuarioJpa;

public class UsuarioMapper {

    public static Usuario toUsuarioFromJpa (UsuarioJpa jpa) {
        Usuario aux = Usuario.build(
                jpa.getId(),
                jpa.getEmail(),
                jpa.getSenha(),
                jpa.getNome(),
                jpa.getCargo(),
                jpa.getEstande().getId()
        );
        aux.setId(jpa.getId());
        return aux;
    }

    public static UsuarioTokenResponse toUsuarioTokenResponse (Usuario aux, String token) {
        return new UsuarioTokenResponse(aux.getId(), aux.getEmail().getValue(), aux.getPassword().getValue(), token);
    }

    public static Usuario toUsuarioFromRequest(UsuarioLoginToken aux) {
        return Usuario.login(
                aux.getEmail(),
                aux.getSenha()
        );
    }
}
