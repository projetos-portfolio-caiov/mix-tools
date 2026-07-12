package laudo.munition.system.core.repository.estande;

import laudo.munition.system.core.entity.estande.Estande;

import java.util.List;
import java.util.Optional;

public interface EstandeQueryRepository {

    Optional<Estande> findById (Integer id);
    List<Estande> findAll (Integer id);

    void save(Estande input);
    void deleteById(Integer id);
}
