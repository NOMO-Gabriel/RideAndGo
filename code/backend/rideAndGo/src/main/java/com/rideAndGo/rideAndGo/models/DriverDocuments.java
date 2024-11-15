package com.rideAndGo.rideAndGo.models;

import java.util.Date;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Data;

@Data
@Table("DriverDocuments") 
public class DriverDocuments {
    @Id
    private UUID id;

    @Column("ownerId")
    private UUID ownerId;


    @Column("documentType")
    private String documentType;

    @Column("originalFileName")
    private String originalFileName;

    @Column("fileSize")
    private Long fileSize;

    @Column("fileType")
    private String fileType;

    @Column("filePath")
    private String filePath;

    @Column("cloudinaryPublicId")
    private String cloudinaryPublicId;

    @Column("uploadDate")
    private Date uploadDate;


//    // Getter et Setter pour documentType
//    public DocumentType getDocumentType() {
//         return documentType.valueOf(documentType);
//     }

//     public void setDocumentType(DocumentType documentType) {
//         this.documentType = documentType.getDescription();
//     }
    
    
    
    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType != null ? documentType.name() : null;
    }
    
   
}
