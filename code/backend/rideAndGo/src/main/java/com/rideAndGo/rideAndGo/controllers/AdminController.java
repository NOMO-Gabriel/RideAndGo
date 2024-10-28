package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.dto.CreateAdminRequest;
import com.rideAndGo.rideAndGo.dto.HTTPResponse;
import com.rideAndGo.rideAndGo.dto.SetRolesRequest;
import com.rideAndGo.rideAndGo.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/createAdmin")
    public ResponseEntity<HTTPResponse> createAdmin(@RequestBody CreateAdminRequest request) {

        // Vérification si l'utilisateur avec superadminId a le rôle ROLE_SUPER_ADMIN
        User superAdmin = userService.getUserById(request.getSuperadminId())
                .orElse(null);

        if (superAdmin == null || !superAdmin.getRoles().contains("ROLE_SUPER_ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new HTTPResponse("Only super admins can create admins."));
        }

        // Vérification si le pseudo, email ou numéro de téléphone sont déjà utilisés
        if (userService.existsByPseudo(request.getAdminToCreate().getPseudo())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new HTTPResponse("This pseudo is already used"));
        }
        if (userService.existsByEmail(request.getAdminToCreate().getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new HTTPResponse("This Email is already used"));
        }
        if (userService.existsByPhoneNumber(request.getAdminToCreate().getPhoneNumber())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new HTTPResponse("This phoneNumber is already used"));
        }

        // Création de l'admin avec les informations fournies
        User admin = new User();
        Instant now = Instant.now();
        LocalDate birthDate = request.getAdminToCreate().getBirthday();

        admin.setId(UUID.randomUUID());
        admin.setPseudo(request.getAdminToCreate().getPseudo());
        admin.setPassword(passwordEncoder.encode(request.getAdminToCreate().getPassword()));
        admin.setEmail(request.getAdminToCreate().getEmail());
        admin.setRoles(Collections.singletonList("ROLE_ADMIN"));
        admin.setName(request.getAdminToCreate().getName());
        admin.setSurname(request.getAdminToCreate().getSurname());
        admin.setPhoneNumber(request.getAdminToCreate().getPhoneNumber());
        admin.setGender(request.getAdminToCreate().getGender());
        admin.setIsOnline(false);
        admin.setIsSuspend(false);
        admin.setIsDeleted(false);
        admin.setLastConnection(null);
        admin.setBirthDate(birthDate);

        // Valeurs par défaut pour les autres champs
        admin.setMyComplaints(Collections.singletonList(UUID.randomUUID()));
        admin.setMyPlace(Collections.singletonList(UUID.randomUUID()));
        admin.setMyItineraries(Collections.singletonList(UUID.randomUUID()));
        admin.setMyTravels(Collections.singletonList(UUID.randomUUID()));
        admin.setMySuscription(UUID.randomUUID());
        admin.setVehicle(UUID.randomUUID());
        admin.setPiece(Collections.singletonList(UUID.randomUUID()));
        admin.setPicture(Collections.singletonList(UUID.randomUUID()));
        admin.setAvatar(Collections.singletonList(UUID.randomUUID()));
        admin.setCreatedAt(now);
        admin.setUpdatedAt(now);
        admin.setAverageRating(0.0f);

        userService.save(admin);

        return ResponseEntity.ok(new HTTPResponse("Admin created successfully."));
    }

    @PutMapping("/setRoles")
    public ResponseEntity<?> setRoles(@RequestBody SetRolesRequest request) {
        UUID adminId = request.getAdminId();
        UUID userId = request.getUserId();

        List<String> newRoles = request.getNewRoles();
        
        if (adminId == null || userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin ID or User ID must not be null");
        }
        
        if (!userService.existsById(adminId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin ID not found");
        }

        if (!userService.existsById(userId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User ID not found");
        }

        // Récupération et mise à jour des rôles de l'utilisateur
        User user = userService.getUserById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setRoles(newRoles);
        userService.save(user);

        return ResponseEntity.ok("User roles updated successfully");
    }

}
