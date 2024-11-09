package com.rideAndGo.rideAndGo.models;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Data;
import java.time.Instant;

@Data
@Table("DriverDocuments")
public class DriverDocument {
    @Id
    private UUID id;

    @Column ("name")
    private String type;

    @Column("documentType")
    private DocumentType documentType;

    @Column("fileByte")
    private byte[] fileBytes;

    @Column("ownerId")
    private UUID ownerId;

    @Column("uploadDate")
    private Instant uploadDate;

    
}
