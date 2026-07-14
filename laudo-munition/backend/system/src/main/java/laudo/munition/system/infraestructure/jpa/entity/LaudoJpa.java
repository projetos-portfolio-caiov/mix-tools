package laudo.munition.system.infraestructure.jpa.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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
    @ManyToOne
    private ClienteJpa cliente;

    @NotNull
    @ManyToOne
    private EstandeJpa estande;

    @DateTimeFormat
    public LocalDateTime dtHora;

    @NotNull
    @Min(value = -1)
    @Max(value = 2)
    private Integer aprovado;

    @Size(min = 0, max = 270)
    private String observacoes;

    @NotNull
    @Positive
    private Integer fundamentacaoId;

    @NotNull
    @Positive
    private Integer armaId;
}
