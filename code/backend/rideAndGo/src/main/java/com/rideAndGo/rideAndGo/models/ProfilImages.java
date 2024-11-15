package com.rideAndGo.rideAndGo.models;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Table;
import java.time.Instant;

@Data
@Table("profilImages")
public class ProfilImages {
    @Id
    private UUID id;

    @Column("filePath")
    private String filePath;

    @Column("originalFileName")
    private String originalFileName;

    @Column("cloudinaryPublicId")
    private String cloudinaryPublicId;

    @Column("fileType")
    private String fileType;

    @Column("fileSize")
    private long fileSize;

    @Column("ownerId")
    private UUID ownerId;

    @Column("uploadDate")
    private Instant uploadDate;

}
