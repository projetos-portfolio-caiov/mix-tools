package laudo.munition.system.infraestructure.adapter;

import laudo.munition.system.core.entity.cliente.Cliente;
import laudo.munition.system.core.repository.cliente.ClienteQueryRepository;
import laudo.munition.system.infraestructure.jpa.repository.ClienteJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ClienteRepositoryAdapter implements ClienteQueryRepository {

    private final ClienteJpaRepository repository;

    public ClienteRepositoryAdapter(ClienteJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Cliente> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public List<Cliente> findAll(Integer id) {
        return List.of();
    }

    @Override
    public void save(Cliente input) {

    }

    @Override
    public void deleteById(Integer id) {

    }
}
