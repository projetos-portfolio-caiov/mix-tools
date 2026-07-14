package laudo.munition.system.core.entity.arma;

import laudo.munition.system.core.entity.arma.valueObjects.*;

public enum Arma {
    PISTOLA(
            1,
            Calibre.build(".9mm"),
            Especie.build("Pistola"),
            Imagem.build("./"),
            Marca.build("IWI"),
            Modelo.build("Masada"),
            Pontuacao.build("5M_____   7M______"),
            Registro.build("1687438-SIGMA"),
            Serie.build("B1003028")
    ),
    REVOLVER(
            2,
            Calibre.build(".375 Magnum"),
            Especie.build("Revólver"),
            Imagem.build("./"),
            Marca.build("IWI"),
            Modelo.build("X95"),
            Pontuacao.build("1ª 20M_____   2ª 20M______"),
            Registro.build("2177682-SIGMA"),
            Serie.build("B2101517")
    ),
    CARABINA(
            3,
            Calibre.build(".9mm"),
            Especie.build("Carabina"),
            Imagem.build("./"),
            Marca.build("IWI"),
            Modelo.build("Masada"),
            Pontuacao.build("5M_____   7M______"),
            Registro.build("1687438-SIGMA"),
            Serie.build("B1003028")
    ),
    ESPINGARDA(
            4,
            Calibre.build("12"),
            Especie.build("Espingarda"),
            Imagem.build("./"),
            Marca.build("CBC"),
            Modelo.build("Military"),
            Pontuacao.build("Serie 1: 2 tiros a 15m:_______ / Serie 2: 2 tiros a 15m:_______ / PONTUAÇÃO TOTAL:_______"),
            Registro.build("2023/906315110-00"),
            Serie.build("KXH5151840")
    );

    private Integer id;
    private Calibre calibre;
    private Especie especie;
    private Imagem imagem;
    private Marca marca;
    private Modelo modelo;
    private Pontuacao pontuacao;
    private Registro registro;
    private Serie serie;

    Arma(
        Integer id,
        Calibre calibre,
        Especie especie,
        Imagem imagem,
        Marca marca,
        Modelo modelo,
        Pontuacao pontuacao,
        Registro registro,
        Serie serie
    ) {
        this.id = id;
        this.calibre = calibre;
        this.especie = especie;
        this.imagem = imagem;
        this.marca = marca;
        this.modelo = modelo;
        this.pontuacao = pontuacao;
        this.registro = registro;
        this.serie = serie;
    }

    public Integer getId() {
        return id;
    }
    public Calibre getCalibre() {
        return calibre;
    }
    public Especie getEspecie() {
        return especie;
    }
    public Imagem getImagem() {
        return imagem;
    }
    public Marca getMarca() {
        return marca;
    }
    public Modelo getModelo() {
        return modelo;
    }
    public Pontuacao getPontuacao() {
        return pontuacao;
    }
    public Registro getRegistro() {
        return registro;
    }
    public Serie getSerie() {
        return serie;
    }

    public static Arma fromId(Integer id) {
        if (id == null){return null;}
        for(Arma a : values()) {
            if (a.id.equals(id)){return a;}
        }
        return null;
    }
}
