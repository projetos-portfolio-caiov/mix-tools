package laudo.munition.system.core.repository.cliente;

import laudo.munition.system.core.entity.cliente.Cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteQueryRepository {

    Optional<Cliente> findById (Integer id);
    List<Cliente> findAll (Integer id);

    void save(Cliente input);
    void deleteById(Integer id);
}