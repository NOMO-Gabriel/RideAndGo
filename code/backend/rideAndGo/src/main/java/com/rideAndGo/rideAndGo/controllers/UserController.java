package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.dto.AuthResponse;
import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.services.UserService;

import org.springframework.http.HttpStatus;
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

    // Récupérer tous les utilisateurs
    @GetMapping("/")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        Iterable<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Récupérer un utilisateur par son ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable UUID id) {
        Optional<User> user = userService.getUserById(id);
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found."));
        }
        return ResponseEntity.ok(user.get());
    }

    // Mettre à jour un utilisateur
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable UUID id, @RequestBody User updatedUser) {
        // Vérifiez que l'utilisateur existe d'abord
        Optional<User> existingUser = userService.getUserById(id);
        if (!existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found."));
        }
        
        // Mettez à jour les informations de l'utilisateur
        updatedUser.setId(id); // Assurez-vous que l'ID est défini
        User user = userService.updateUser(updatedUser);
        return ResponseEntity.ok(user);
    }

    // Supprimer un utilisateur
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable UUID id) {
        // Vérifiez si l'utilisateur existe
        Optional<User> user = userService.getUserById(id);
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found."));
        }
        
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
