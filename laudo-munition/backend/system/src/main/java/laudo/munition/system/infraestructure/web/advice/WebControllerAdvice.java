package laudo.munition.system.infraestructure.web.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class WebControllerAdvice {

    @ExceptionHandler(DadosMalFormatados.class)
    public ResponseEntity<ObjetoResponse> handleDadosMalFormatados(DadosMalFormatados ex) {

        ObjetoResponse response = new ObjetoResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(ErroInternoException.class)
    public ResponseEntity<ObjetoResponse> handleErroInternoException(ErroInternoException ex) {

        ObjetoResponse response = new ObjetoResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                ex.getMessage()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(DadoNaoEncontradoException.class)
    public ResponseEntity<ObjetoResponse> handleDadoNaoEncontradoException(DadoNaoEncontradoException ex) {

        ObjetoResponse response = new ObjetoResponse(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
