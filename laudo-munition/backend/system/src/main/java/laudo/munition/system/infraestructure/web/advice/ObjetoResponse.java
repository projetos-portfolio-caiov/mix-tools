package laudo.munition.system.infraestructure.web.advice;

import java.time.LocalDateTime;

public class ObjetoResponse {

    private LocalDateTime timestamp;
    private int status;
    private String mensagem;

    public ObjetoResponse(LocalDateTime timestamp, int status, String mensagem) {
        this.timestamp = timestamp;
        this.status = status;
        this.mensagem = mensagem;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getMensagem() {
        return mensagem;
    }
}
