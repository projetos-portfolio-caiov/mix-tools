package laudo.munition.system.infraestructure.adapter;

import laudo.munition.system.core.entity.usuario.Usuario;
import laudo.munition.system.core.repository.usuario.UsuarioQueryRepository;
import laudo.munition.system.infraestructure.jpa.repository.UsuarioJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UsuarioRepositoryAdapter implements UsuarioQueryRepository {

    private final UsuarioJpaRepository repository;

    public UsuarioRepositoryAdapter(UsuarioJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Usuario> findByEmail(String email) {
        return Optional.empty();
    }

    @Override
    public Optional<Usuario> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public List<Usuario> findAll(Integer id) {
        return List.of();
    }

    @Override
    public void save(Usuario input) {

    }

    @Override
    public void deleteById(Integer id) {

    }
}
