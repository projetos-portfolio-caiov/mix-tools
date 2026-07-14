package laudo.munition.system.infraestructure.config.beans;

 import laudo.munition.system.application.port.TokenProvider;
 import laudo.munition.system.application.useCase.Autenticar;
 import laudo.munition.system.core.repository.usuario.UsuarioQueryRepository;
 import laudo.munition.system.infraestructure.adapter.UsuarioRepositoryAdapter;
 import laudo.munition.system.infraestructure.config.security.AutenticacaoService;
 import org.springframework.context.annotation.Bean;
 import org.springframework.context.annotation.Configuration;
 import org.springframework.security.authentication.AuthenticationManager;
 import org.springframework.security.crypto.password.PasswordEncoder;

 @Configuration
public class UsuarioBeanConfig {

     @Bean
     public Autenticar autenticarUseCase(
             UsuarioQueryRepository repository,
             PasswordEncoder passwordEncoder,
             TokenProvider tokenProvider,
             AuthenticationManager authenticationManager
     ) {
         return new Autenticar(
                 repository,
                 passwordEncoder,
                 tokenProvider,
                 authenticationManager
         );
     }

     @Bean
     public AutenticacaoService autenticacaoService (
             UsuarioRepositoryAdapter implementacao
     ) {
         return new AutenticacaoService(implementacao);
     }
}