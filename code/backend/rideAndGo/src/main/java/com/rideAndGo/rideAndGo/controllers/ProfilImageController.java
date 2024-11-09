package com.rideAndGo.rideAndGo.controllers;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.rideAndGo.rideAndGo.models.ProfilImages;
import com.rideAndGo.rideAndGo.services.ProfilImageService;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/profile_images")
public class ProfilImageController {

    @Autowired
    private ProfilImageService profilImageService;

    // Endpoint pour l'upload d'une image de profil

    @PostMapping("/{ownerId}")
    public ResponseEntity <ProfilImages> uploadProfileImage(@RequestParam("file") MultipartFile  file, @PathVariable UUID ownerId) {
        try{
            ProfilImages uploadedImage = profilImageService.uploadProfilImage(file, ownerId);
            return ResponseEntity.ok(uploadedImage);
        }catch(IOException e){
            e.printStackTrace(); 
            return ResponseEntity.status(500).build();
        }
       
        
    }
    


    
}
