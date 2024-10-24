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

@RequestMapping("/User")
@RestController
@AllArgsConstructor

public class UserController {
    private final UserService service;
    private final CompteurRepository repository;

    private final UserAuthentificationRepository repository2;
/*
    @PostConstruct
    public void saveUser(){
        List<User> users=new ArrayList<>();
        users.add(new User(1,"ronel","nkouathio","aok","nkouathioronel@gmail","12","melen","697933510"));
        users.add(new User(2,"onel","ronel","lao","ronelnkouathio@gmail","13","melen","697933410"));
        users.add(new User(3,"ronel","manel","ado","manelnkouathio@gmail","14","melen","697933511"));
        service.saveall(users);
    }*/
    @GetMapping("/read")
    public List<User> getUser(){
        return service.lireallUser();
    }
    @PostMapping("/create")
    public User addUser(@RequestBody User User){
        Compteur compteur=repository.findById(1).get();
        compteur.compteurUser=compteur.compteurUser+1;
        repository.save(compteur);
        User.setId(compteur.compteurUser);
        service.créer(User);
        repository2.save(new UserAuthentification(new KeyUser( User.getNom(), User.getMotDePasse()),User.getId(), User.getPrenom(), User.getPseudo(), User.getEmail(),User.getAdresse(),User.getTelephone()));
        return User;
    }
    @GetMapping(value = "/read/{id}")
    public User recuperer(@PathVariable int id)
    {
        return service.recuperer(id);
    }

}
