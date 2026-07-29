import { useState, useRef } from "react";
import styles from "./UploadImagemCard.module.css";
import imgUpload from "../icons/icon_upload.svg";

const API_BASE_URL = "http://localhost:8080";

async function uploadImagem(arquivo) {
    const nomeArquivo = `${Date.now()}-${arquivo.name}`;
    const conteudo = await arquivo.arrayBuffer();

    const response = await fetch(
        `${API_BASE_URL}/uploads/${encodeURIComponent(nomeArquivo)}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                // "Authorization": `Bearer ${token}` // descomente se usar JWT
            },
            body: conteudo,
        }
    );

    if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Erro ao fazer upload");
    }

    return await response.text(); // URL do S3
}

function UploadImagemCard({ onUploadConcluido }) {
    const [preview, setPreview] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const inputRef = useRef(null);

    function handleClick() {
        inputRef.current.click();
    }

    async function handleArquivoSelecionado(e) {
        const arquivo = e.target.files[0];
        if (!arquivo) return;

        // Validação de tipo
        if (!["image/jpeg", "image/png"].includes(arquivo.type)) {
            setErro("Apenas imagens JPG e PNG são permitidas.");
            return;
        }

        // Validação de tamanho (máx 5MB)
        if (arquivo.size > 5 * 1024 * 1024) {
            setErro("O arquivo deve ter no máximo 5MB.");
            return;
        }

        setErro("");
        setPreview(URL.createObjectURL(arquivo));
        setCarregando(true);

        try {
            const url = await uploadImagem(arquivo);
            onUploadConcluido?.(url); // repassa a URL do S3 ao componente pai
        } catch (e) {
            setErro(e.message);
            setPreview(null);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div
            className={styles.areaUploadFotoProduto}
            onClick={handleClick}
            style={{ cursor: carregando ? "wait" : "pointer" }}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg, image/png"
                style={{ display: "none" }}
                onChange={handleArquivoSelecionado}
            />

            {preview ? (
                <img
                    src={preview}
                    alt="Preview"
                    className={styles.imgUploadProduto}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
            ) : (
                <img src={imgUpload} alt="Upload" className={styles.imgUploadProduto} />
            )}

            {!preview && (
                <>
                    <span className={styles.textoCampoFormularioProduto}>
                        {carregando ? "Enviando..." : "Clique para fazer upload"}
                    </span>
                    <span className={styles.textoCampoFormularioProduto}>
                        (JPG e PNG)
                    </span>
                </>
            )}

            {carregando && (
                <span className={styles.textoCampoFormularioProduto}>Enviando...</span>
            )}

            {erro && (
                <span className={styles.textoCampoFormularioProduto} style={{ color: "red" }}>
                    {erro}
                </span>
            )}
        </div>
    );
}

export default UploadImagemCard;