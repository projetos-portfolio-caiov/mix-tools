package laudo.munition.system.infraestructure.jpa.repository;

import laudo.munition.system.infraestructure.jpa.entity.ClienteJpa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteJpaRepository extends JpaRepository<ClienteJpa, Integer> {
}
