package laudo.munition.system.infraestructure.adapter;

import laudo.munition.system.core.entity.endereco.Endereco;
import laudo.munition.system.core.repository.endereco.EnderecoQueryRepository;
import laudo.munition.system.infraestructure.jpa.repository.EnderecoJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class EnderecoRepositoryAdapter implements EnderecoQueryRepository {

    private final EnderecoJpaRepository repository;

    public EnderecoRepositoryAdapter(EnderecoJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Endereco> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public List<Endereco> findAll(Integer id) {
        return List.of();
    }

    @Override
    public void save(Endereco input) {

    }

    @Override
    public void deleteById(Integer id) {

    }
}
