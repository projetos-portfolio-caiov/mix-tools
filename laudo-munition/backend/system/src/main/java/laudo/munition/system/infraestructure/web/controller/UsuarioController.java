package laudo.munition.system.infraestructure.web.controller;

import laudo.munition.system.application.dto.usuario.UsuarioLoginToken;
import laudo.munition.system.application.dto.usuario.UsuarioMapper;
import laudo.munition.system.application.dto.usuario.UsuarioTokenResponse;
import laudo.munition.system.application.useCase.Autenticar;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final Autenticar autenticar;

    public UsuarioController(Autenticar autenticar) {
        this.autenticar = autenticar;
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioTokenResponse> autenticar(@RequestBody UsuarioLoginToken input) {
        System.out.println(
                new BCryptPasswordEncoder().matches(
                        "testeEstande123#",
                        "$2a$10$qMdTOBI9ScTnfKyIK13dn.4BdEKW8N1nYZlBNZ2ovY5qso1hagfyq"
                )
        );
        return ResponseEntity.status(200).body(autenticar.executar(UsuarioMapper.toUsuarioFromRequest(input)));
    }
}
