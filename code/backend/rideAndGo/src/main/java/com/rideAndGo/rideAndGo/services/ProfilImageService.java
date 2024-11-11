package com.rideAndGo.rideAndGo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rideAndGo.rideAndGo.models.ProfilImages;
import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.repositories.ProfilImageRepository;
import com.rideAndGo.rideAndGo.repositories.UserRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;
import java.time.Instant;

@Service
public class ProfilImageService {

    private final Path rootLocation = Paths.get("src/main/resources/static/profile_images");

    @Autowired
    private ProfilImageRepository profilImageRepository;

    @Autowired
    private UserRepository userRepository;


    // Méthode pour l'upload d'une image de profil et mise à jour du User
    public ProfilImages uploadProfilImage (MultipartFile file, UUID ownerId) throws IOException{

        if (file == null || file.isEmpty()) {
            throw new IOException("Le fichier est vide ou non envoyé.");
        }

        UUID fileId = UUID.randomUUID();

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            throw new IOException("Le fichier n'a pas de nom original.");
        }

        String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));

        // Créer un nom de fichier unique avec l'extension
        String filename = fileId + extension;  // Exemple : ff4340cd-6785-4582-92a2-3cc83554955f.jpg

        // Définir le chemin du fichier
        Path filePath = rootLocation.resolve(filename);
        
         // Créer le dossier s'il n'existe pas
         if (!Files.exists(rootLocation)){
            Files.createDirectories(rootLocation);
         }

         // Sauvegarder le fichier sur le disque
         Files.copy(file.getInputStream(), filePath);
         
         // Enregistrer les métadonnées dans Cassandra
         ProfilImages profilImage = new ProfilImages();
         profilImage.setId(fileId);
         profilImage.setFilePath("profile_images/" + filename);
         profilImage.setOriginalFileName(file.getOriginalFilename());
         profilImage.setFileType(file.getContentType());
         profilImage.setFileSize(file.getSize());
         profilImage.setOwnerId(ownerId);
         profilImageRepository.save(profilImage);


        // Mettre à jour l'utilisateur avec le nouvel ID de l'image de profil
        Optional <User> userOptional = userRepository.findById(ownerId);
        if(userOptional.isPresent()){
            User user = userOptional.get();
            user.setPictureId(fileId);
            userRepository.save(user);
            
        }
        
        return profilImage;



    }




    
}
