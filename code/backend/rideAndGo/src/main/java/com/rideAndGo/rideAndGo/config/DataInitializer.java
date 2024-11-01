package com.rideAndGo.rideAndGo.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.services.UserService;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

@Configuration
public class DataInitializer {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Cette méthode est exécutée au démarrage de l'application.
     * Elle crée un super administrateur avec des informations par défaut.
     * Si le super administrateur existe déjà dans la base de données,
     * alors la méthode ne fait rien.
     * La méthode utilise l'interface {@link UserService} pour sauvegarder le super administrateur.
     * Elle utilise également le {@link PasswordEncoder} pour crypter le mot de passe.
     */
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
                List<String> roles = new ArrayList<>();
                roles.add("ROLE_TRAVELLER");
                roles.add("ROLE_ADMIN");
                roles.add("ROLE_SUPER_ADMIN");

                // Initialisation des valeurs du super admin
                superAdmin.setId(superAdminId);
                superAdmin.setName("Djotio");
                superAdmin.setSurname("Thomas");
                superAdmin.setPseudo("Thomas");
                superAdmin.setEmail("tdjotio@gmail.com");
                superAdmin.setPassword(passwordEncoder.encode("motdepasse"));  // Mot de passe sécurisé
                superAdmin.setPhoneNumber(12345678900.0);
                superAdmin.setIsOnline(false);
                superAdmin.setRoles(roles);
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
                superAdmin.setTimeZone(0.0);

                // Sauvegarde du super administrateur
                userService.save(superAdmin);
                System.out.println("SuperAdmin créé avec succès avec l'ID : " + superAdminId);
            }

            
                        
            // Création de 6 utilisateurs avec les rôles spécifiés
            createUser("admin1@example.com", "admin1", "Admin", "One", Arrays.asList("ROLE_TRAVELLER", "ROLE_ADMIN"), "admin1");
            createUser("admin2@example.com", "admin2", "Admin", "Two", Arrays.asList("ROLE_TRAVELLER", "ROLE_ADMIN"), "admin2");
            createUser("traveller1@example.com", "traveller1", "Traveller", "One", Arrays.asList("ROLE_TRAVELLER"), "traveller1");
            createUser("traveller2@example.com", "traveller2", "Traveller", "Two", Arrays.asList("ROLE_TRAVELLER"), "traveller2");
            createUser("driver1@example.com", "driver1", "Driver", "One", Arrays.asList("ROLE_TRAVELLER", "ROLE_DRIVER"), "driver1");
            createUser("driver2@example.com", "driver2", "Driver", "Two", Arrays.asList("ROLE_TRAVELLER", "ROLE_DRIVER"), "driver2");
        };
    }

    private void createUser(String email, String pseudo, String name, String surname, List<String> role, String password) {
        if (userService.existsByEmail(email) || userService.existsByPseudo(pseudo)) {
            System.out.println("Utilisateur avec email " + email + " ou pseudo " + pseudo + " existe déjà.");
        } else {
            Instant now = Instant.now();
            User user = new User();
         
           

            // Initialisation des valeurs de l'utilisateur
            user.setId(UUID.randomUUID());
            user.setName(name);
            user.setSurname(surname);
            user.setPseudo(pseudo);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));  // Mot de passe sécurisé
            user.setPhoneNumber(12345678900.0);
            user.setIsOnline(false);
            user.setRoles(role);
            user.setGender("M");
            user.setIsSuspend(false);
            user.setIsDeleted(false);
            user.setLastConnection(now);

            // Initialisation des listes et des valeurs par défaut
            List<UUID> defaultUUIDList = Arrays.asList(UUID.randomUUID());
            user.setMyComplaints(defaultUUIDList);
            user.setMyPlace(defaultUUIDList);
            user.setMyItineraries(defaultUUIDList);
            user.setMyTravels(defaultUUIDList);
            user.setMySuscription(UUID.randomUUID());
            user.setVehicle(UUID.randomUUID());
            user.setPiece(defaultUUIDList);
            user.setPicture(defaultUUIDList);
            user.setAvatar(defaultUUIDList);

            // Champs supplémentaires
            user.setCreatedAt(now);
            user.setUpdatedAt(now);
            user.setAverageRating(0.0f);
            user.setLanguage("en");
            user.setTheme("light");
            user.setIsLocalisable(false);
            user.setTimeZone(0.0);

            // Sauvegarde de l'utilisateur
            userService.save(user);
            System.out.println("Utilisateur créé avec succès avec l'email : " + email);
        }
    }
}
