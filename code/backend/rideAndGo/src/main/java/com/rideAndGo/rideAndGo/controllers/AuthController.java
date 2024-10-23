package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.dto.AuthRequest;
import com.rideAndGo.rideAndGo.dto.AuthResponse;
import com.rideAndGo.rideAndGo.dto.UserRegistrationRequest;
import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.services.UserService;
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

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        User user = userService.findByPseudo(authRequest.getPseudo()).orElse(null);
        if(user ==null){
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
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new AuthResponse("Pseudo already exists"));
        }

        User newUser = new User();
        newUser.setPseudo(registrationRequest.getPseudo());
        newUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        userService.save(newUser);

        return ResponseEntity.ok(new AuthResponse("Registration successful"));
    }
}
