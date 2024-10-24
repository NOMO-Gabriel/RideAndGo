package com.rideAndGo.rideAndGo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // Désactive la protection CSRF pour éviter les erreurs lors des tests
            .authorizeHttpRequests()
            .anyRequest().permitAll();  // Permet toutes les requêtes sans authentification
        return http.build();
    }
}
