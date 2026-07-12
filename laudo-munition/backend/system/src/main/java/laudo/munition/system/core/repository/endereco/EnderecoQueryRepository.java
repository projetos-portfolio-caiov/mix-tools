package laudo.munition.system.core.repository.endereco;

import laudo.munition.system.core.entity.endereco.Endereco;

import java.util.List;
import java.util.Optional;

public interface EnderecoQueryRepository {

    Optional<Endereco> findById (Integer id);
    List<Endereco> findAll (Integer id);

    void save(Endereco input);
    void deleteById(Integer id);
}
