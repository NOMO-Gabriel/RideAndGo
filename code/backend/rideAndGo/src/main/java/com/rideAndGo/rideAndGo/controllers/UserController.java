package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Récupérer un utilisateur par son ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Récupérer tous les utilisateurs
    @GetMapping("/")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        Iterable<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Mettre à jour un utilisateur
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable UUID id, @RequestBody User updatedUser) {
        // Vérifiez que l'utilisateur existe d'abord
        if (!userService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        updatedUser.setId(id); // Assurez-vous que l'ID est défini
        User user = userService.updateUser(updatedUser);
        return ResponseEntity.ok(user);
    }

    // Supprimer un utilisateur
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        if (!userService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
