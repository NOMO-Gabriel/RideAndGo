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
import java.util.List;
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
            // Identifiant unique et fixe pour le super administrateur
            UUID superAdminId = UUID.fromString("ff4340cd-6785-4582-92a2-3cc83554955f");

            // Vérifie s’il existe déjà un super admin avec l’email ou le pseudo
            if (userService.existsByEmail("tdjotio@gmail.com") || userService.existsByPseudo("Thomas")) {
                System.out.println("SuperAdmin existe déjà dans la base de données.");
            } else {
                Instant now = Instant.now();
                User superAdmin = new User();

                // Initialisation des valeurs du super admin
                superAdmin.setId(superAdminId);
                superAdmin.setName("Djotio");
                superAdmin.setSurname("Thomas");
                superAdmin.setPseudo("Thomas");
                superAdmin.setEmail("tdjotio@gmail.com");
                superAdmin.setPassword(passwordEncoder.encode("motdepasse"));  // Mot de passe sécurisé
                superAdmin.setPhoneNumber(12345678900.0);
                superAdmin.setIsOnline(false);
                superAdmin.setRoles(Collections.singletonList("ROLE_SUPER_ADMIN"));
                superAdmin.setGender("M");
                superAdmin.setIsSuspend(false);
                superAdmin.setIsDeleted(false);
                superAdmin.setLastConnection(now);

                // Initialisation des listes et des valeurs par défaut
                List<UUID> defaultUUIDList = Arrays.asList(UUID.randomUUID());
                superAdmin.setMyComplaints(defaultUUIDList);
                superAdmin.setMyPlace(defaultUUIDList);
                superAdmin.setMyItineraries(defaultUUIDList);
                superAdmin.setMyTravels(defaultUUIDList);
                superAdmin.setMySuscription(UUID.randomUUID());
                superAdmin.setVehicle(UUID.randomUUID());
                superAdmin.setPiece(defaultUUIDList);
                superAdmin.setPicture(defaultUUIDList);
                superAdmin.setAvatar(defaultUUIDList);

                // Champs supplémentaires
                superAdmin.setCreatedAt(now);
                superAdmin.setUpdatedAt(now);
                superAdmin.setAverageRating(0.0f);
                superAdmin.setLanguage("en");
                superAdmin.setTheme("light");
                superAdmin.setIsLocalisable(false);

                // Sauvegarde du super administrateur
                userService.save(superAdmin);
                System.out.println("SuperAdmin créé avec succès avec l'ID : " + superAdminId);
            }
        };
    }
}
