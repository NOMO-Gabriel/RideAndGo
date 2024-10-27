package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.dto.AuthResponse;
import com.rideAndGo.rideAndGo.dto.HTTPResponse;
import com.rideAndGo.rideAndGo.dto.PasswordChangeRequest;
import com.rideAndGo.rideAndGo.dto.UpdatePersonalInfosRequestDTO;
import com.rideAndGo.rideAndGo.dto.UpdatePreferencesRequestDTO;
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
    @CrossOrigin(origins = "http://localhost:3000")
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

    //to update personnal infos of a user
    @PutMapping("/updatePersonnalInfos")
    public ResponseEntity<HTTPResponse> updatePersonnalInfos(@RequestBody UpdatePersonalInfosRequestDTO infosToUpdate) {
        Optional<User> optionalUser = userService.getUserById(infosToUpdate.getId());
    
        // Vérification si l'utilisateur existe
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HTTPResponse("User not found."));
        }
    
        // Extraction de l'utilisateur
        User userToUpdate = optionalUser.get();
        UpdatePersonalInfosRequestDTO.PersonalInfosDTO newInfos = infosToUpdate.getPersonnalInfos();
    
        // Mise à jour conditionnelle des champs non nuls
        if (newInfos.getName() != null) {
            userToUpdate.setName(newInfos.getName());
        }
        if (newInfos.getSurname() != null) {
            userToUpdate.setSurname(newInfos.getSurname());
        }
        if (newInfos.getPseudo() != null) {
            userToUpdate.setPseudo(newInfos.getPseudo());
        }
        if (newInfos.getBirthDate() != null) {
            userToUpdate.setBirthDate(newInfos.getBirthDate());
        }
        if (newInfos.getGender() != null) {
            userToUpdate.setGender(newInfos.getGender());
        }
        if (newInfos.getEmail() != null) {
            userToUpdate.setEmail(newInfos.getEmail());
        }
        if (newInfos.getPhoneNumber() != null) {
            userToUpdate.setPhoneNumber(newInfos.getPhoneNumber());
        }
    
        // Enregistrement des modifications
        userService.updateUser(userToUpdate);
    
        return ResponseEntity.ok(new HTTPResponse("Personal information updated successfully."));
    }

    @PutMapping("/updatePreferences")
    public ResponseEntity<HTTPResponse> updatePreferences(@RequestBody UpdatePreferencesRequestDTO preferencesToUpdate) {
        Optional<User> optionalUser = userService.getUserById(preferencesToUpdate.getId());
    
        // Vérification si l'utilisateur existe
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HTTPResponse("User not found."));
        }
    
        // Extraction de l'utilisateur
        User userToUpdate = optionalUser.get();
        UpdatePreferencesRequestDTO.preferencesDTO newPreferences = preferencesToUpdate.getPreferencesDTO();
        System.out.println("ID: " + preferencesToUpdate.getId());
        System.out.println("Preferences: " + preferencesToUpdate.getPreferencesDTO());

        if(newPreferences==null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new HTTPResponse("You can not update empty preferences."));
        }
        // Mise à jour conditionnelle des champs non nuls
        if (newPreferences.getLanguage() != null) {
            userToUpdate.setLanguage(newPreferences.getLanguage());
        }
        if(newPreferences.getTheme() != null) {
            userToUpdate.setTheme(newPreferences.getTheme());
        }
        if (newPreferences.getIsLocalisable() != null) {
            userToUpdate.setIsLocalisable(newPreferences.getIsLocalisable());
            
        }
        if(newPreferences.getTimeZone() != null) {
            userToUpdate.setTimeZone(newPreferences.getTimeZone());
        }
    
        // Enregistrement des modifications
        userService.updateUser(userToUpdate);
    
        return ResponseEntity.ok(new HTTPResponse("Preferences updated successfully."));
    }
    

}
