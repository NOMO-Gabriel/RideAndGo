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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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
public ResponseEntity<Iterable<User>> getAllActiveUsers() {
    Iterable<User> users = StreamSupport.stream(userService.getAllUsers().spliterator(), false)
                                        .filter(user -> !user.getIsDeleted() && !user.getIsSuspend())
                                        .collect(Collectors.toList());
    return ResponseEntity.ok(users);
}



    // Récupérer un utilisateur par son ID
@GetMapping("/{id}")
public ResponseEntity<?> getUserById(@PathVariable UUID id) {
    Optional<User> user = userService.getUserById(id);
    if (!user.isPresent() || user.get().getIsDeleted() || user.get().getIsSuspend()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found or inactive."));
    }
    return ResponseEntity.ok(user.get());
}

@PutMapping("/{id}")
public ResponseEntity<?> updateUser(@PathVariable UUID id, @RequestBody User updatedUser) {
    Optional<User> existingUser = userService.getUserById(id);
    if (!existingUser.isPresent() || existingUser.get().getIsDeleted() ||existingUser.get().getIsSuspend()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found or deleted."));
    }
    updatedUser.setId(id);
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


// Suppression fictive d'un utilisateur
@PutMapping("/softDelete/{id}")
public ResponseEntity<?> softDeleteUser(@PathVariable UUID id) {
    Optional<User> user = userService.getUserById(id);
    if (!user.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found."));
    }
    
    user.get().setIsDeleted(true);
    userService.updateUser(user.get());
    return ResponseEntity.ok(new AuthResponse("User has been softly deleted."));
}

// Suspension d'un utilisateur
@PutMapping("/suspend/{id}")
public ResponseEntity<?> suspendUser(@PathVariable UUID id) {
    Optional<User> user = userService.getUserById(id);
    if (!user.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found."));
    }
    
    user.get().setIsSuspend(true);
    userService.updateUser(user.get());
    return ResponseEntity.ok(new AuthResponse("User has been suspended."));
}

// Réactiver un utilisateur suspendu
@PutMapping("/reactivate/{id}")
public ResponseEntity<?> reactivateUser(@PathVariable UUID id) {
    Optional<User> user = userService.getUserById(id);
    if (!user.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found."));
    }
    
    user.get().setIsSuspend(false);
    userService.updateUser(user.get());
    return ResponseEntity.ok(new AuthResponse("User has been reactivated."));
}


}
