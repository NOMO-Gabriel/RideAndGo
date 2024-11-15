package com.rideAndGo.rideAndGo.services;

import java.io.IOException;
import java.sql.Driver;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.rideAndGo.rideAndGo.models.DriverDocuments;
import com.rideAndGo.rideAndGo.models.DocumentType;
import com.rideAndGo.rideAndGo.repositories.DriverDocumentsRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.Date;
import java.util.List;

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

        // Conversion de la chaîne en DocumentType avec le code (par exemple "CNI")
        DocumentType resolvedDocumentType = DocumentType.fromCode(documentTypeStr);
        
        if (resolvedDocumentType == null) {
            throw new IllegalArgumentException("Invalid document type code provided.");
        }
      
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

   // récupérer un document par son id
     public DriverDocuments getDocumentsById( UUID documentId){
          return driverDocumentsRepository.findById(documentId)
               .orElseThrow(() -> new IllegalArgumentException("Document introuvable avec l'ID:" + documentId));
     }

          //récupérer tous les documents d'un utilisateur
          public List<DriverDocuments> getAllDocumentsByOwnerId(UUID ownerId){
               return driverDocumentsRepository.findByOwnerId(ownerId);
          } 
               //Supprimer un document
               public void deleteDocument(UUID documentId) throws IOException{
                    DriverDocuments document = getDocumentsById(documentId);
                    //Supprimer du stockage Cloudinary
                    cloudinary.uploader().destroy(document.getCloudinaryPublicId(),Map.of());
                    // Supprimer de la base de données
                    driverDocumentsRepository.deleteById(documentId);
               }
    
     //modifier un document
     @SuppressWarnings("unchecked")
     public DriverDocuments updateDocument(UUID documentId, MultipartFile newFile, String newDocumentTypeStr) throws IOException{
          DriverDocuments document = getDocumentsById(documentId);

           // Supprimer l'ancien fichier sur Cloudinary
               cloudinary.uploader().destroy(document.getCloudinaryPublicId(), Map.of());

               // Upload du nouveau fichier sur Cloudinary
               Map<String, String> uploadResult = cloudinary.uploader().upload(newFile.getBytes(), Map.of());
               String newFileUrl = uploadResult.get("url");
               String newCloudinaryPublicId = uploadResult.get("public_id");

               // Conversion de la chaîne en DocumentType avec le code (par exemple "CNI")
               DocumentType resolvedDocumentType = DocumentType.fromCode(newDocumentTypeStr);
               
               if (resolvedDocumentType == null) {
                    throw new IllegalArgumentException("Invalid document type code provided.");
               }
               

               document.setOriginalFileName(newFile.getOriginalFilename());
               document.setFileSize(newFile.getSize());
               document.setFileType(newFile.getContentType());
               document.setCloudinaryPublicId(newCloudinaryPublicId);
               document.setFilePath(newFileUrl);
               document.setDocumentType(resolvedDocumentType);
               document.setUploadDate(new Date());

               // Sauvegarder les modifications
               return driverDocumentsRepository.save(document);
     }
}
