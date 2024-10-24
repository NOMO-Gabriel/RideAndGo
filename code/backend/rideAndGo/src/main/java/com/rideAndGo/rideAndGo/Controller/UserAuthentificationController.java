package com.rideAndGo.rideAndGo.Controller;


import com.rideAndGo.rideAndGo.Modele.UserAuthentification;
import com.rideAndGo.rideAndGo.Repository.UserAuthentificationRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RequestMapping("/User")
@RestController
@AllArgsConstructor
public class UserAuthentificationController {
    UserAuthentificationRepository repository;
    @GetMapping(value = "/read1/{nom}/{password}")
    public Integer lireNomPassword(@PathVariable String nom, @PathVariable String password) {
        Optional<UserAuthentification> clientOptional = repository.findByKey_NomAndKey_MotDePasse(nom, password);

        return  clientOptional.map(UserAuthentification -> UserAuthentification.getId())
                .orElse(-1);
    }
    @GetMapping("/read_authentification")
    public List<UserAuthentification> getUserAuthentification(){
        return repository.findAll();
    }
}