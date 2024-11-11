package com.rideAndGo.rideAndGo.controllers;
import com.rideAndGo.rideAndGo.services.ProfilImageService;


import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.rideAndGo.rideAndGo.models.ProfilImages;

import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.core.io.Resource;




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

    @PutMapping("/{imageId}")
    public ResponseEntity <ProfilImages> updateProfileImage(@PathVariable UUID imageId, @RequestParam("file") MultipartFile newFile) {
        try{
            ProfilImages updatedImage = profilImageService.updateProfilImages(imageId, newFile);
            return ResponseEntity.ok(updatedImage);
        }catch(IOException e){
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity <Void> deleteProfilImege(@PathVariable UUID imageId){
        try{
            profilImageService.deleteProfileImage(imageId);
            return ResponseEntity.noContent().build();

        }catch (IOException e){
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{imageId}")
    public ResponseEntity <Resource> getProfileImageById (@PathVariable UUID imageId) {
        try{
            return profilImageService.getProfilImageById(imageId);

        }catch(IOException e){
            e.printStackTrace();
            return ResponseEntity.status(404).build();
        }
        
    }
    
    


    
}
