package laudo.munition.system.application.useCase;

import laudo.munition.system.application.dto.usuario.UsuarioMapper;
import laudo.munition.system.application.dto.usuario.UsuarioTokenResponse;
import laudo.munition.system.application.port.TokenProvider;
import laudo.munition.system.core.entity.usuario.Usuario;
import laudo.munition.system.core.repository.usuario.UsuarioQueryRepository;
import laudo.munition.system.infraestructure.config.security.GerenciadorTokenJwt;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;


public class Autenticar {

    private final UsuarioQueryRepository repository;
    private PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private AuthenticationManager authenticationManager;

    public Autenticar(
            UsuarioQueryRepository repository,
            PasswordEncoder passwordEncoder,
            TokenProvider tokenProvider,
            AuthenticationManager authenticationManager
    ){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    public UsuarioTokenResponse executar(Usuario input) {
        System.out.println(input);
        final UsernamePasswordAuthenticationToken credentials = new UsernamePasswordAuthenticationToken(
                input.getEmail().getValue(), input.getPassword().getValue());

        System.out.println(credentials);

        try {
            final Authentication authentication = this.authenticationManager.authenticate(credentials);
            System.out.println("teste 2");
            Usuario funcionarioAutenticado =
                    repository.findByEmail(input.getEmail().getValue())
                            .orElseThrow(
                                    ()-> new ResponseStatusException(404, "Email do usuario não cadastrado", null)
                            );
            System.out.println("teste 3");

            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("teste 4");

            String token = tokenProvider.gerarToken(funcionarioAutenticado);
            System.out.println("teste 5");

            return UsuarioMapper.toUsuarioTokenResponse(funcionarioAutenticado, token);
        } catch (Exception e){
            e.printStackTrace();
            throw new BadCredentialsException("Credenciais inválidas", e);
        }
    }
}
