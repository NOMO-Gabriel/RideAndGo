package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.dto.AuthRequest;
import com.rideAndGo.rideAndGo.dto.AuthResponse;
import com.rideAndGo.rideAndGo.dto.HTTPResponse;
import com.rideAndGo.rideAndGo.dto.UserRegistrationRequest;
import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.services.SubscriptionService;
import com.rideAndGo.rideAndGo.services.UserService;
import com.rideAndGo.rideAndGo.models.Subscription;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final SubscriptionService subscriptionService;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder, SubscriptionService subscriptionService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/loginByPseudo")
    public ResponseEntity<AuthResponse> loginByPseudo(@RequestBody AuthRequest authRequest) {
        User user = userService.findByPseudo(authRequest.getPseudo()).orElse(null);
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found"));
        }
        
        if (user.getIsDeleted()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponse("Account has been deleted"));
        }
    
        if (user.getIsSuspend()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponse("Account is suspended"));
        }
    
        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Incorrect password"));
        }
    
        return ResponseEntity.ok(new AuthResponse("Login successful", user));
    }
    
    @PostMapping("/loginByPhoneNumber")
    public ResponseEntity<AuthResponse> loginByPhoneNumber(@RequestBody AuthRequest authRequest) {
        User user = userService.findByPhoneNumber(authRequest.getPhoneNumber()).orElse(null);
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found"));
        }
    
        if (user.getIsDeleted()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponse("Account has been deleted"));
        }
    
        if (user.getIsSuspend()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponse("Account is suspended"));
        }
    
        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Incorrect password"));
        }
    
        return ResponseEntity.ok(new AuthResponse("Login successful", user));
    }
    
    @PostMapping("/loginByEmail")
    public ResponseEntity<AuthResponse> loginByEmail(@RequestBody AuthRequest authRequest) {
        User user = userService.findByEmail(authRequest.getEmail()).orElse(null);
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("User not found"));
        }
    
        if (user.getIsDeleted()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponse("Account has been deleted"));
        }
    
        if (user.getIsSuspend()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponse("Account is suspended"));
        }
    
        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Incorrect password"));
        }
    
        return ResponseEntity.ok(new AuthResponse("Login successful", user));
    }
    

    @PostMapping("/register")
public ResponseEntity<HTTPResponse> register(@RequestBody UserRegistrationRequest registrationRequest) {
    

        if (userService.existsByPseudo(registrationRequest.getPseudo())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new HTTPResponse("This pseudo is already used"));
        }

        if (userService.existsByEmail(registrationRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new HTTPResponse("This Email is already used"));
        }

        if (userService.existsByPhoneNumber(registrationRequest.getPhoneNumber())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new HTTPResponse("This phoneNumber is already used"));
        }
    
    List<String> roles = new ArrayList<>();
    if(registrationRequest.getIsDriver()== true){
        roles.add("ROLE_DRIVER");
        roles.add("ROLE_TRAVELLER");
    }else{
        roles.add("ROLE_TRAVELLER");
    }
    

    Instant now = Instant.now();  // Pour les champs TIMESTAMP
    LocalDate birthDate = registrationRequest.getBirthDate();  // Pour le champ DATE
    Optional <Subscription> defaultSubscription = subscriptionService.findByLabel("default");

    User newUser = new User();
    newUser.setId(UUID.randomUUID());  // Génération automatique d'un ID
    newUser.setPseudo(registrationRequest.getPseudo());
    newUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
    newUser.setEmail(registrationRequest.getEmail());
    newUser.setRoles(roles);
    newUser.setSurname(registrationRequest.getSurname());
    newUser.setName(registrationRequest.getName());
    newUser.setPhoneNumber(registrationRequest.getPhoneNumber());  // Valeur statique pour le numéro de téléphone
    newUser.setGender(registrationRequest.getGender());
    newUser.setIsOnline(false);  // Par défaut, l'utilisateur n'est pas en ligne
    newUser.setIsSuspend(false);
    newUser.setIsDeleted(false);
    newUser.setLastConnection(now); 
    newUser.setBirthDate(birthDate);
    newUser.setPaiementDate(now);
    // Valeurs statiques pour les autres champs
    List<UUID> defaultUUIDList = new ArrayList<>();
    defaultUUIDList.add(UUID.randomUUID());

    newUser.setMyComplaints(defaultUUIDList);  // Complaints par défaut
    newUser.setMyPlace(defaultUUIDList);       // Place par défaut
    newUser.setMyItineraries(defaultUUIDList); // Itineraries par défaut
    newUser.setMyTravels(defaultUUIDList);     // Travels par défaut
    newUser.setSubscription( defaultSubscription.get().getId()); // Subscription par défaut
    newUser.setVehicle(UUID.randomUUID());      // Vehicle par défaut
    newUser.setPiece(defaultUUIDList);          // Pieces par défaut
    newUser.setPictureId(null);        // Pictures par défaut
    newUser.setAvatar(null);         // Avatar par défaut

    newUser.setCreatedAt(now);          // Utilise Instant pour TIMESTAMP
    newUser.setUpdatedAt(now);          // Utilise Instant pour TIMESTAMP

    newUser.setAverageRating(0.f);     // Note moyenne par défaut
    newUser.setLanguage("en");
    newUser.setTheme("light");
    newUser.setIsLocalisable(false);
    
    userService.save(newUser);


    return ResponseEntity.ok(new HTTPResponse("Registration successful"));
}
}