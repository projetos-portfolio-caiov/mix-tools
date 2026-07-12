package laudo.munition.system.infraestructure.jpa.repository;

import laudo.munition.system.infraestructure.jpa.entity.UsuarioJpa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioJpaRepository  extends JpaRepository<UsuarioJpa, Integer> {
}
