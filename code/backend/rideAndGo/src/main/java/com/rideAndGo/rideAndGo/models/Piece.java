package com.rideAndGo.rideAndGo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.CassandraType.Name;


import java.util.UUID;
import java.util.Date;
import java.time.Instant;


@Data
@Table("Piece")
public class Piece {

    @Id
    private UUID id;

    @Column("file")
    @CassandraType(type = Name.BLOB)
    private byte[] picByte;

    @Column("type")
    private String type;

    @Column("name")
    private String name;

    @Column("ownerId")
    private UUID ownerId;

    @Column("uploadDate")
    private Instant uploadDate;

    public Piece() {
        this.id = UUID.randomUUID(); // Générer un ID unique
    }

    public Piece(String name, String type, byte[] picByte, UUID ownerId, Instant uploadDate) {
        this.id = UUID.randomUUID(); // Générer un ID unique
        this.name = name;
        this.type = type;
        this.picByte = picByte;
        this.ownerId = ownerId;
        this.uploadDate = uploadDate;
    }

    
}
