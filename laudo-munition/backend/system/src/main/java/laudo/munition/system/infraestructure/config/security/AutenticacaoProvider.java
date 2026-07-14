package laudo.munition.system.infraestructure.config.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AutenticacaoProvider implements AuthenticationProvider {

    private final AutenticacaoService usuarioAutorizacaoService;
    private final PasswordEncoder passwordEncoder;

    public AutenticacaoProvider(AutenticacaoService usuarioAutorizacaoService, PasswordEncoder passwordEncoder){
        this.usuarioAutorizacaoService = usuarioAutorizacaoService;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public org.springframework.security.core.Authentication authenticate(org.springframework.security.core.Authentication authentication) throws org.springframework.security.core.AuthenticationException {
        final String username = authentication.getName();
        final String password = authentication.getCredentials().toString();

        UserDetails userDetails = this.usuarioAutorizacaoService.loadUserByUsername(username);

        System.out.println("Username: " + username);
        System.out.println("Senha digitada: " + password);
        System.out.println("Senha banco: " + userDetails.getPassword());

        boolean matches = passwordEncoder.matches(password, userDetails.getPassword());

        System.out.println("Matches: " + matches);

        if (matches) {
            return new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
        }

        throw new BadCredentialsException("Usuário ou Senha inválidos");

        /*if(this.passwordEncoder.matches(password, userDetails.getPassword())){
            return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        } else{
            throw new BadCredentialsException("Usuário ou Senha inválidos");
        }*/
    }

    @Override
    public boolean supports(final Class<?> authentication){
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}
