package gr.uoa.di.atlas.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;

@Controller
public class SecurityConstants {

    @Value("${jwt.secret}")
    public String SECRET;

    @Value("${jwt.expiration.time}")
    public Long EXPIRATION_TIME ;
    @Value("${jwt.token.prefix}")
    public String TOKEN_PREFIX ;
    @Value("${jwt.header.string}")
    public  String HEADER_STRING ;
}