package com.rideAndGo.rideAndGo.controllers;
import com.rideAndGo.rideAndGo.services.ProfilImageService;


import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.rideAndGo.rideAndGo.models.ProfilImages;

import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;




@RestController
@RequestMapping("/api/profile_images")
public class ProfilImageController {

    @Autowired
    private ProfilImageService profilImageService;


    // Endpoint pour uploader une image
    @PostMapping("/{ownerId}")
    public ProfilImages uploadImage(@PathVariable UUID ownerId, @RequestParam("file") MultipartFile file) throws IOException {
        return profilImageService.uploadImage(ownerId, file);
    }

    // Endpoint pour mettre à jour une image
    @PutMapping("/{ownerId}")
    public ProfilImages updateImage(@PathVariable UUID ownerId, @RequestParam("file") MultipartFile file) throws IOException {
        return profilImageService.updateImage(ownerId, file);
    }

    // Endpoint pour supprimer une image
    @DeleteMapping("/{ownerId}")
    public void deleteImage(@PathVariable UUID ownerId) throws IOException {
        profilImageService.deleteImage(ownerId);
    }

    // Endpoint pour récupérer une image par son ID
    @GetMapping("/{id}")
    public ResponseEntity<ProfilImages> getProfilImageById(@PathVariable UUID id) {
        Optional<ProfilImages> profilImage = profilImageService.getImageById(id);
        return profilImage.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    


    
}
