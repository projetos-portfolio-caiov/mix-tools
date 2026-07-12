package laudo.munition.system.infraestructure.jpa.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import laudo.munition.system.core.entity.estande.Estande;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="cliente")
public class ClienteJpa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min = 4, max = 45)
    private String nome;

    @NotBlank
    @Column(unique = true)
    @Size(min = 11, max = 11)
    private String cpf;

    @NotBlank
    @Column(unique = true)
    @Size(min = 7, max = 9)
    private String rg;

    @NotBlank
    @Column(unique = true)
    @Size(min = 13, max = 13)
    private String telefone;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "estande")
    Estande estande;
}
