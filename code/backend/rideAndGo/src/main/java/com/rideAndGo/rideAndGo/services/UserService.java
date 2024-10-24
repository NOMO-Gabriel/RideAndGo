package com.rideAndGo.rideAndGo.services;

import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.repositories.UserRepository;
import org.springframework.stereotype.Service;

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
    public Optional<User> findByPseudo(String pseudo) { // Correction ici : 'String' au lieu de 'string'
        return userRepository.findByPseudo(pseudo);
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

    // Vérifier l'existence d'un pseudo
    public boolean existsByPseudo(String pseudo) {
        return userRepository.existsByPseudo(pseudo);
    }

    // Enregistrer un nouvel utilisateur
    public void save(User user) {
        userRepository.save(user);
    }
}
