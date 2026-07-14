package laudo.munition.system.core.entity.fundamentacao;

import laudo.munition.system.core.entity.fundamentacao.valueObjects.Categoria;
import laudo.munition.system.core.entity.fundamentacao.valueObjects.Finalidade;

public enum Fundamentacao {
    ART_DP(
            1,
            Categoria.build("Aquisição, Registro ou Transferência"),
            Finalidade.build("Defesa Pessoal")
    ),
    ART_Inst(
            1,
            Categoria.build("Aquisição, Registro ou Transferência"),
            Finalidade.build("Institucional")
    ),
    Porte_DP(
            1,
            Categoria.build("Porte"),
            Finalidade.build("Defesa Pessoal")
    ),
    Porte_Inst(
            1,
            Categoria.build("Porte"),
            Finalidade.build("Institucional")
    ),
    SIGMA_DP(
            1,
            Categoria.build("SIGMA"),
            Finalidade.build("Defesa Pessoal")
    ),
    SIGMA_Inst(
            1,
            Categoria.build("SIGMA"),
            Finalidade.build("Institucional")
    );

    private Integer id;
    private Categoria categoria;
    private Finalidade finalidade;

    Fundamentacao(
            Integer id,
            Categoria categoria,
            Finalidade finalidade
    ) {
        this.id = id;
        this.categoria = categoria;
        this.finalidade = finalidade;
    }

    public Integer getId() {
        return id;
    }
    public Categoria getCategoria() {
        return categoria;
    }
    public Finalidade getFinalidade() {
        return finalidade;
    }

    public static Fundamentacao fromId(Integer id) {
        if (id == null){return null;}
        for(Fundamentacao f : values()) {
            if (f.id.equals(id)){return f;}
        }
        return null;
    }
}
