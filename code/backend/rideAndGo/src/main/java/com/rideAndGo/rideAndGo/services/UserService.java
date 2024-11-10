package com.rideAndGo.rideAndGo.services;

import com.rideAndGo.rideAndGo.dto.UpdatePersonalInfosRequestDTO;
import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
   

   
   
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
       
    }

   

    // Récupérer un utilisateur par son ID
    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    // Recherche d'un utilisateur par son pseudo
    public Optional<User> findByPseudo(String pseudo) { 
        return userRepository.findByPseudo(pseudo);
    }

    public Optional<User> findByEmail(String email) { 
    return userRepository.findByEmail(email);
}

public Optional<User> findByPhoneNumber(Double phoneNumber) { 
return userRepository.findByPhoneNumber(phoneNumber);
}


    // Récupérer tous les utilisateurs
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Mettre à jour un utilisateur
    public User updateUser(User user) {
        return userRepository.save(user); // Sauvegarde l'utilisateur mis à jour
    }

    // Supprimer un utilisateur
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
     // Enregistrer un nouvel utilisateur
     public void save(User user) {
        userRepository.save(user);
    }

    // Vérifier l'existence d'un pseudo
    public boolean existsByPseudo(String pseudo) {
        return userRepository.existsByPseudo(pseudo);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
              
    }
    public boolean existsByPhoneNumber(double phoneNumber) {
        return userRepository.existsByPhoneNumber(phoneNumber);
    }

    public boolean existsById(UUID ID) {
        return userRepository.existsById(ID);
    }

   
}
