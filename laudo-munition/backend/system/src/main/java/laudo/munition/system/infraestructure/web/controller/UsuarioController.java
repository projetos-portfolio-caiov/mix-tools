package laudo.munition.system.infraestructure.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import telegram.messager.backend.application.dto.usuario.UsuarioLoginToken;
import telegram.messager.backend.application.dto.usuario.UsuarioMapper;
import telegram.messager.backend.application.dto.usuario.UsuarioTokenResponse;
import telegram.messager.backend.application.useCase.Autenticar;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final Autenticar autenticar;

    public UsuarioController(Autenticar autenticar) {
        this.autenticar = autenticar;
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioTokenResponse> autenticar(@RequestBody UsuarioLoginToken input) {
        return ResponseEntity.status(200).body(autenticar.executar(UsuarioMapper.toUsuarioFromRequest(input)));
    }
}
