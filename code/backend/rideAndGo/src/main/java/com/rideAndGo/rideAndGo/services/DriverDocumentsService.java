package com.rideAndGo.rideAndGo.services;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.rideAndGo.rideAndGo.models.DriverDocuments;
import com.rideAndGo.rideAndGo.models.DocumentType;
import com.rideAndGo.rideAndGo.repositories.DriverDocumentsRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.Date;

@Service
public class DriverDocumentsService {
    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private DriverDocumentsRepository driverDocumentsRepository;

     // Méthode pour l'upload d'un document
     @SuppressWarnings("unchecked")
     public DriverDocuments uploadDriverDocuments (MultipartFile file, UUID ownerId, String documentTypeStr) throws IOException{
        Map<String, String> uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of());



        String fileUrl = uploadResult.get("url");
        String cloudinaryPublicId = uploadResult.get("public_id");
        LocalDateTime now = LocalDateTime.now();
        Date uploadDate = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

        DriverDocuments document = new DriverDocuments();

        // Conversion de la chaîne en DocumentType
        DocumentType resolvedDocumentType = DocumentType.fromDescription(documentTypeStr);
      
        document.setDocumentType(resolvedDocumentType);

        document.setId(UUID.randomUUID());
        document.setOwnerId(ownerId);
        
        document.setOriginalFileName(file.getOriginalFilename());
        document.setFileSize(file.getSize());
        document.setFileType(file.getContentType());
        document.setCloudinaryPublicId(cloudinaryPublicId);
        document.setFilePath(fileUrl);
        document.setUploadDate(uploadDate);

         // Sauvegarder le document en base de données
    return driverDocumentsRepository.save(document);

     }

    
}
