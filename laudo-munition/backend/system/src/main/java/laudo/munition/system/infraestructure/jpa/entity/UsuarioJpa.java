package laudo.munition.system.infraestructure.jpa.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import laudo.munition.system.core.entity.estande.Estande;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="usuario")
public class UsuarioJpa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min = 4, max = 45)
    private String nome;

    @NotBlank
    @Email
    @Size(min = 8)
    private String email;

    @NotBlank
    private String senha;

    @NotNull
    @Min(value = -1)
    @Max(value = 2)
    private Integer cargo;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "estande")
    Estande estande;
}
