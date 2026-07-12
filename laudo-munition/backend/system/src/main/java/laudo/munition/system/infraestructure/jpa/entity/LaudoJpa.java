package laudo.munition.system.infraestructure.jpa.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import laudo.munition.system.core.entity.cliente.Cliente;
import laudo.munition.system.core.entity.usuario.Usuario;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name="laudo")
public class LaudoJpa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @OneToMany
    private Set<Cliente> clientes;

    @NotNull
    @OneToMany
    private Set<Usuario> usuarios;

    @DateTimeFormat
    public LocalDateTime dtHora;

    @NotBlank
    @Size(min = 0, max = 45)
    private String finalidade;

    @NotBlank
    @Size(min = 0, max = 45)
    private String arma;
}
