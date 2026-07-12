package laudo.munition.system.infraestructure.adapter;

import laudo.munition.system.core.entity.laudo.Laudo;
import laudo.munition.system.core.repository.laudo.LaudoQueryRepository;
import laudo.munition.system.infraestructure.jpa.repository.LaudoJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class LaudoRepositoryAdapter implements LaudoQueryRepository {

    private final LaudoJpaRepository repository;

    public LaudoRepositoryAdapter(LaudoJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Laudo> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public List<Laudo> findAll(Integer id) {
        return List.of();
    }

    @Override
    public void save(Laudo input) {

    }

    @Override
    public void deleteById(Integer id) {

    }
}
