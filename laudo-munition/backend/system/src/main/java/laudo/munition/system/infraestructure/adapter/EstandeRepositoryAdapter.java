package laudo.munition.system.infraestructure.adapter;

import laudo.munition.system.core.entity.estande.Estande;
import laudo.munition.system.core.repository.estande.EstandeQueryRepository;
import laudo.munition.system.infraestructure.jpa.repository.EstandeJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class EstandeRepositoryAdapter implements EstandeQueryRepository {

    private final EstandeJpaRepository repository;

    public EstandeRepositoryAdapter(EstandeJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Estande> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public List<Estande> findAll(Integer id) {
        return List.of();
    }

    @Override
    public void save(Estande input) {

    }

    @Override
    public void deleteById(Integer id) {

    }
}
