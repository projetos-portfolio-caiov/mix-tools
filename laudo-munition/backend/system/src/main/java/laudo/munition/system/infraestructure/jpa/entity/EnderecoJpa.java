package laudo.munition.system.infraestructure.jpa.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import laudo.munition.system.core.entity.cliente.Cliente;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "endereco")
public class EnderecoJpa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min = 0, max = 90)
    public String bairro;

    @NotBlank
    @Size(min = 8, max = 8)
    public String cep;

    @NotBlank
    @Size(min = 0, max = 90)
    public String cidade;

    @Size(min = 0, max = 90)
    public String complemento;

    @NotBlank
    @Size(min = 0, max = 90)
    public String estado;

    @NotBlank
    @Size(min = 0, max = 90)
    public String logradouro;

    @NotNull
    @Positive
    public Integer numero;

    @OneToMany(mappedBy = "endereco")
    public List<Cliente> cliente;
}
