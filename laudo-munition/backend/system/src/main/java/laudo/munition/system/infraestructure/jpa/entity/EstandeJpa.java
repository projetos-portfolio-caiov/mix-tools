package laudo.munition.system.infraestructure.jpa.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import laudo.munition.system.core.entity.cliente.Cliente;
import laudo.munition.system.core.entity.usuario.Usuario;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name="estande")
public class EstandeJpa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min = 4, max = 45)
    public String nome;

    @NotBlank
    @Email
    @Size(min = 8)
    public String email;

    @NotBlank
    @Column(unique = true)
    @Size(min = 13, max = 13)
    private String telefone;

    @OneToMany(mappedBy = "estande")
    Set<Cliente> clientes;

    @OneToMany(mappedBy = "estande")
    Set<Usuario> usuarios;
}
