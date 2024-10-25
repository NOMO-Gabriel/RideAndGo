package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.dto.AuthResponse;
import com.rideAndGo.rideAndGo.dto.PasswordChangeRequest;
import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.services.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder=passwordEncoder;
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

@PutMapping("/changePassword")

public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
  
    Optional<User> userOptional = userService.getUserById(passwordChangeRequest.getId());
    
    if (!userOptional.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found"));
    }
    
    User user = userOptional.get();
    
    if (!passwordEncoder.matches(passwordChangeRequest.getCurrentPassword(), user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Incorrect current password"));
    }
    
    
    user.setPassword(passwordEncoder.encode(passwordChangeRequest.getNewPassword()));
    userService.updateUser(user); 
    
    return ResponseEntity.ok(new AuthResponse("Password changed successfully"));
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
