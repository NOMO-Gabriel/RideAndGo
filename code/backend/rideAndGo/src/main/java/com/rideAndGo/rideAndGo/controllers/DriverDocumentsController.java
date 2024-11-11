package com.rideAndGo.rideAndGo.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.rideAndGo.rideAndGo.services.DriverDocumentsService;
import com.rideAndGo.rideAndGo.models.DriverDocuments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/driver_documents")
public class DriverDocumentsController {

    @Autowired
    private DriverDocumentsService driverDocumentsService;

    @PostMapping("/{ownerId}")
    public ResponseEntity <DriverDocuments> uploadDriverDocument(@PathVariable UUID ownerId , @RequestParam("file") MultipartFile file, @RequestParam("documentType") String documentTypeStr ) {

        try{
            DriverDocuments document = driverDocumentsService.uploadDriverDocuments(file, ownerId, documentTypeStr);
            return ResponseEntity.ok(document);

;        }catch(IOException e){
            e.printStackTrace();
            return ResponseEntity.status(500).build();

        }
        
    }
    

    
}
