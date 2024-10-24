package com.rideAndGo.rideAndGo.Controller;

import com.rideAndGo.rideAndGo.Modele.User;
import com.rideAndGo.rideAndGo.Modele.UserAuthentification;
import com.rideAndGo.rideAndGo.Modele.Compteur;
import com.rideAndGo.rideAndGo.Modele.KeyUser;
import com.rideAndGo.rideAndGo.Repository.UserAuthentificationRepository;
import com.rideAndGo.rideAndGo.Repository.CompteurRepository;
import com.rideAndGo.rideAndGo.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/User")
@RestController
@AllArgsConstructor
public class UserController {
    private final UserService service;
    private final CompteurRepository repository;

    private final UserAuthentificationRepository repository2;

    @GetMapping("/read")
    public List<User> getUser() {
        return service.lireallUser();
    }

    @PostMapping("/create")
    public User addUser(@RequestBody User User) {
        // Chercher le compteur avec l'ID 1
        Optional<Compteur> optionalCompteur = repository.findById(1);

        Compteur compteur;
        if (optionalCompteur.isPresent()) {
            // Si le compteur existe, l'utiliser
            compteur = optionalCompteur.get();
        } else {
            // Sinon, créer un nouveau compteur avec l'ID 1
            compteur = new Compteur();
            compteur.setId(1);  // Initialiser le compteur avec ID 1
            compteur.setCompteurUser(0);  // Initialiser le compteur d'utilisateur à 0
        }

        // Incrémenter le compteur d'utilisateur
        compteur.setCompteurUser(compteur.getCompteurUser() + 1);

        // Sauvegarder le compteur mis à jour dans la base de données
        repository.save(compteur);

        // Utiliser le compteur incrémenté comme ID pour l'utilisateur
        User.setId(compteur.getCompteurUser());

        // Sauvegarder l'utilisateur
        service.créer(User);

        // Sauvegarder l'utilisateur pour l'authentification
        repository2.save(new UserAuthentification(
                new KeyUser(User.getNom(), User.getMotDePasse()),
                User.getId(),
                User.getPrenom(),
                User.getPseudo(),
                User.getEmail(),
                User.getAdresse(),
                User.getTelephone()
        ));

        return User;
    }

    @GetMapping(value = "/read/{id}")
    public User recuperer(@PathVariable int id) {
        return service.recuperer(id);
    }
}
