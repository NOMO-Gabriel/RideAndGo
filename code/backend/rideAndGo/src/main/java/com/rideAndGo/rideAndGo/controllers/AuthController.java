package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.dto.AuthRequest;
import com.rideAndGo.rideAndGo.dto.AuthResponse;
import com.rideAndGo.rideAndGo.dto.UserRegistrationRequest;
import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.services.UserService;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/loginByPseudo")
    public ResponseEntity<AuthResponse> loginByPseudo(@RequestBody AuthRequest authRequest) {
        User user = userService.findByPseudo(authRequest.getPseudo()).orElse(null);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found"));
        }

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Incorrect password"));
        }
        
        return ResponseEntity.ok(new AuthResponse("Login successful"));
    }

    @PostMapping("/loginByPhoneNumber")
    public ResponseEntity<AuthResponse> loginByPhoneNumber(@RequestBody AuthRequest authRequest) {
        User user = userService.findByPhoneNumber(authRequest.getPhoneNumber()).orElse(null);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found"));
        }

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Incorrect password"));
        }
        
        return ResponseEntity.ok(new AuthResponse("Login successful"));
    }

    @PostMapping("/loginByEmail")
    public ResponseEntity<AuthResponse> loginByEmail(@RequestBody AuthRequest authRequest) {
        User user = userService.findByEmail(authRequest.getEmail()).orElse(null);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found"));
        }

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Incorrect password"));
        }
        
        return ResponseEntity.ok(new AuthResponse("Login successful"));
    }

    @PostMapping("/register")
public ResponseEntity<AuthResponse> register(@RequestBody UserRegistrationRequest registrationRequest) {
    

        if (userService.existsByPseudo(registrationRequest.getPseudo())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new AuthResponse("This pseudo is already used"));
        }

        if (userService.existsByEmail(registrationRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new AuthResponse("This Email is already used"));
        }

        if (userService.existsByPhoneNumber(registrationRequest.getPhoneNumber())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new AuthResponse("This phoneNumber is already used"));
        }
    
    List<String> roles = new ArrayList<>();
    roles.add("ROLE_USER");
    Instant now = Instant.now();  // Pour les champs TIMESTAMP
    LocalDate birthDate = registrationRequest.getBirthDate();  // Pour le champ DATE

    User newUser = new User();
    newUser.setId(UUID.randomUUID());  // Génération automatique d'un ID
    newUser.setPseudo(registrationRequest.getPseudo());
    newUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
    newUser.setEmail(registrationRequest.getEmail());
    newUser.setRoles(roles);
    newUser.setSurname(registrationRequest.getSurname());
    newUser.setName(registrationRequest.getName());
    newUser.setPhoneNumber(registrationRequest.getPhoneNumber());  // Valeur statique pour le numéro de téléphone
    newUser.setIsOnline(false);  // Par défaut, l'utilisateur n'est pas en ligne

    // Valeurs statiques pour les autres champs
    List<UUID> defaultUUIDList = new ArrayList<>();
    defaultUUIDList.add(UUID.randomUUID());

    newUser.setMyComplaints(defaultUUIDList);  // Complaints par défaut
    newUser.setMyPlace(defaultUUIDList);       // Place par défaut
    newUser.setMyItineraries(defaultUUIDList); // Itineraries par défaut
    newUser.setMyTravels(defaultUUIDList);     // Travels par défaut
    newUser.setMySuscription(UUID.randomUUID()); // Subscription par défaut
    newUser.setVehicle(UUID.randomUUID());      // Vehicle par défaut
    newUser.setPiece(defaultUUIDList);          // Pieces par défaut
    newUser.setPicture(defaultUUIDList);        // Pictures par défaut
    newUser.setAvatar(defaultUUIDList);         // Avatar par défaut

    newUser.setCreatedAt(now);          // Utilise Instant pour TIMESTAMP
    newUser.setUpdatedAt(now);          // Utilise Instant pour TIMESTAMP
       
    newUser.setAverageRating(0.f);     // Note moyenne par défaut

    userService.save(newUser);

    return ResponseEntity.ok(new AuthResponse("Registration successful"));
}
}