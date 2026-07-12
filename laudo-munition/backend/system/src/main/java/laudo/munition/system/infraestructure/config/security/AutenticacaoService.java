package laudo.munition.system.infraestructure.config.security;

import laudo.munition.system.core.entity.usuario.Usuario;
import laudo.munition.system.core.repository.usuario.UsuarioQueryRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AutenticacaoService implements UserDetailsService {

    private final UsuarioQueryRepository repository;

    public AutenticacaoService(UsuarioQueryRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> usuarioOpt = repository.findByEmail(username);

        if (usuarioOpt.isEmpty()) {
            throw new UsernameNotFoundException(String.format("usuario: %s não encontrado", username));
        }
        return new UsuarioDetalhes(usuarioOpt.get());
    }
}
