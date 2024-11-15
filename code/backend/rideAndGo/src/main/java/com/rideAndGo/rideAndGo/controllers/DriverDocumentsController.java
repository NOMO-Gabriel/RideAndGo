package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.services.DriverDocumentsService;
import com.rideAndGo.rideAndGo.models.DriverDocuments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/driver_documents")
public class DriverDocumentsController {

    @Autowired
    private DriverDocumentsService driverDocumentsService;

    @PostMapping("/{ownerId}")
    public ResponseEntity <DriverDocuments> uploadDriverDocument(@PathVariable UUID ownerId , @RequestParam("file") MultipartFile file, @RequestParam("documentType") String documentTypeStr ) {

        try{
            System.out.println("Cloud Name: " + System.getenv("CLOUDINARY_CLOUD_NAME"));
            System.out.println("API Key: " + System.getenv("CLOUDINARY_API_KEY"));
            System.out.println("API Secret: " + System.getenv("CLOUDINARY_API_SECRET"));
            DriverDocuments document = driverDocumentsService.uploadDriverDocuments(file, ownerId, documentTypeStr);
            return ResponseEntity.ok(document);


       }catch(IOException e){
            e.printStackTrace();
            return ResponseEntity.status(500).build();

        }
        
    }

    // Récupérer un document par ID
        @GetMapping("/{documentId}")
        public ResponseEntity<DriverDocuments> getDocumentById(@PathVariable UUID documentId) {
            return ResponseEntity.ok(driverDocumentsService.getDocumentsById(documentId));
        }
    
        // Récupérer tous les documents d'un utilisateur
        @GetMapping("/user/{ownerId}")
        public ResponseEntity<List<DriverDocuments>> getAllDocumentsByOwnerId(@PathVariable UUID ownerId) {
            return ResponseEntity.ok(driverDocumentsService.getAllDocumentsByOwnerId(ownerId));
        }
        

        // Supprimer un document
        @DeleteMapping("/{documentId}")
        public ResponseEntity<Void> deleteDocument(@PathVariable UUID documentId) {
            try {
                driverDocumentsService.deleteDocument(documentId);
                return ResponseEntity.noContent().build();
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).build();
            }
        }

                // Mettre à jour un document
        @PutMapping("/{documentId}")
        public ResponseEntity<DriverDocuments> updateDocument(
            @PathVariable UUID documentId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentTypeStr
        ) {
            try {
                return ResponseEntity.ok(driverDocumentsService.updateDocument(documentId, file, documentTypeStr));
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).build();
            }
        }
}
