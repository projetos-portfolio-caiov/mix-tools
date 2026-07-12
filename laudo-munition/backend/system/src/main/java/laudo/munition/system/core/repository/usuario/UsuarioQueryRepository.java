package laudo.munition.system.core.repository.usuario;

import laudo.munition.system.core.entity.usuario.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioQueryRepository {

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findById (Integer id);
    List<Usuario> findAll (Integer id);

    void save(Usuario input);
    void deleteById(Integer id);
}
