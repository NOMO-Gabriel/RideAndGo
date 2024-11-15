package com.rideAndGo.rideAndGo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.rideAndGo.rideAndGo.models.ProfilImages;
import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.repositories.ProfilImageRepository;
import com.rideAndGo.rideAndGo.repositories.UserRepository;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import org.springframework.http.HttpHeaders;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.time.Instant;
import com.cloudinary.utils.ObjectUtils;


@Service
public class ProfilImageService {

    
    @Autowired
    private ProfilImageRepository profilImageRepository;

    @Autowired
    private UserRepository userRepository;  
    

    @Autowired
    private Cloudinary cloudinary;


     // Méthode pour uploader une image
     @SuppressWarnings("unchecked")
    public ProfilImages uploadImage(UUID ownerId, MultipartFile file) throws IOException {
        // Upload de l'image sur Cloudinary
        Map<String, String> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        String fileUrl = uploadResult.get("url");
        String cloudinaryPublicId = uploadResult.get("public_id");

        // Créer un nouvel objet ProfilImages
        ProfilImages profilImage = new ProfilImages();
        profilImage.setId(UUID.randomUUID());
        profilImage.setFilePath(fileUrl);
        profilImage.setOriginalFileName(file.getOriginalFilename());
        profilImage.setFileType(file.getContentType());
        profilImage.setFileSize(file.getSize());
        profilImage.setOwnerId(ownerId);
        profilImage.setUploadDate(Instant.now());
        profilImage.setCloudinaryPublicId(cloudinaryPublicId);

        // Sauvegarder l'image dans Cassandra
         profilImageRepository.save(profilImage);

        Optional <User> userOptional = userRepository.findById(ownerId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPictureId(profilImage.getId());  // Associer l'ID de l'image au user

            // Mettre à jour l'utilisateur dans la base de données
            userRepository.save(user);
        } else {
            throw new RuntimeException("Utilisateur non trouvé pour l'ID: " + ownerId);
        }

        return profilImage;


    }

     // Méthode pour mettre à jour une image existante
     public ProfilImages updateImage(UUID ownerId, MultipartFile file) throws IOException {
        // Récupérer l'image existante de la base de données
        ProfilImages existingImage = profilImageRepository.findByOwnerId(ownerId);
        if (existingImage != null) {
            // Supprimer l'ancienne image de Cloudinary
            cloudinary.uploader().destroy(existingImage.getFilePath(), ObjectUtils.emptyMap());
        }

        // Uploader la nouvelle image
        return uploadImage(ownerId, file);
    }

        // Méthode pour supprimer une image
    public void deleteImage(UUID ownerId) throws IOException {
        // Récupérer l'image existante de la base de données
        ProfilImages existingImage = profilImageRepository.findByOwnerId(ownerId);
        if (existingImage != null) {
            // Supprimer l'image de Cloudinary
            cloudinary.uploader().destroy(existingImage.getFilePath(), ObjectUtils.emptyMap());

            // Supprimer l'image de la base de données
            profilImageRepository.delete(existingImage);
        }
    }

    // Cette méthode récupère une image par son id
    public Optional<ProfilImages> getImageById(UUID id) {
        return profilImageRepository.findById(id);
    }

} 