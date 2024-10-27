package com.rideAndGo.rideAndGo.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.services.UserService;

import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.UUID;

@Configuration
public class DataInitializer {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            UUID superAdminId = UUID.randomUUID();
            if (userService.getUserById(superAdminId).isEmpty()) {
                Instant now = Instant.now();
                User superAdmin = new User();
                
                // Initialisation des valeurs par défaut
                superAdmin.setId(superAdminId);
                superAdmin.setName("Djotio");
                superAdmin.setSurname("Thomas");
                superAdmin.setPseudo("Thomas");
                superAdmin.setEmail("tdjotio@gmail.com");
                superAdmin.setPassword(passwordEncoder.encode("motdepasse")); // ou hashé directement
                superAdmin.setPhoneNumber(12345678900.0);
                superAdmin.setIsOnline(false);
                superAdmin.setRoles(Collections.singletonList("ROLE_SUPER_ADMIN"));
                superAdmin.setGender("M");
                superAdmin.setIsSuspend(false);
                superAdmin.setIsDeleted(false);
                superAdmin.setLastConnection(now);
                superAdmin.setMyComplaints(Collections.singletonList(UUID.randomUUID()));
                superAdmin.setMyPlace(Collections.singletonList(UUID.randomUUID()));
                superAdmin.setMyItineraries(Collections.singletonList(UUID.randomUUID()));
                superAdmin.setMyTravels(Collections.singletonList(UUID.randomUUID()));
                superAdmin.setMySuscription(UUID.randomUUID());
                superAdmin.setVehicle(UUID.randomUUID());
                superAdmin.setPiece(Collections.singletonList(UUID.randomUUID()));
                superAdmin.setPicture(Collections.singletonList(UUID.randomUUID()));
                superAdmin.setAvatar(Collections.singletonList(UUID.randomUUID()));
                superAdmin.setCreatedAt(now);
                superAdmin.setUpdatedAt(now);
                superAdmin.setAverageRating(0.0f);

                userService.save(superAdmin);
                System.out.println("SuperAdmin créé avec succès avec l'ID : " + superAdminId);
            }
        };
    }
}
