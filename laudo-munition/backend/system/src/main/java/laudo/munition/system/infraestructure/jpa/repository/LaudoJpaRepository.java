package laudo.munition.system.infraestructure.jpa.repository;

import laudo.munition.system.infraestructure.jpa.entity.LaudoJpa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaudoJpaRepository extends JpaRepository<LaudoJpa, Integer> {
}
