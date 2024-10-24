package com.rideAndGo.rideAndGo.Service;



import com.rideAndGo.rideAndGo.Modele.User;
import com.rideAndGo.rideAndGo.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository repository;


    public List<User> lireallUser(){
        return repository.findAll();
    }


    public User recuperer(int id){
        return repository.findById(id).get();
    }
    public User créer(User User){
        return  repository.save(User);
    }

    /*
    public int chercherNom(String nom, String password) {
        Optional<User> User = repository.findByNomAndMotDePasse(nom, password);
        return User.map(User::getId_User).orElse(-1);
    }*/

    public void saveall(List<User> Users){
        repository.saveAll(Users);
    }
}
