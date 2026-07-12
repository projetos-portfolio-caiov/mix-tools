package laudo.munition.system.core.repository.laudo;

import laudo.munition.system.core.entity.laudo.Laudo;

import java.util.List;
import java.util.Optional;

public interface LaudoQueryRepository {

    Optional<Laudo> findById (Integer id);
    List<Laudo> findAll (Integer id);

    void save(Laudo input);
    void deleteById(Integer id);
}
