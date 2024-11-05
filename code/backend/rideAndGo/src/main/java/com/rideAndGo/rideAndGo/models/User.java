package com.rideAndGo.rideAndGo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.CassandraType.Name;


import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Table("user") 
public class User {
    @Id
    private UUID id;

    @Column("name")
    private String name;

    @Column("surname")
    private String surname;

    @Column("pseudo")
    private String pseudo;

    @Column("email")
    private String email;

    @Column("password")
    private String password;

    @Column("phonenumber")
    private Double phoneNumber;

    @Column("isonline")
    private Boolean isOnline;

    @Column("roles")
    private List<String> roles;

    @Column("mycomplaints")
    private List<UUID> myComplaints;

    @Column("myplace")
    private List<UUID> myPlace;

    @Column("myitineraries")
    private List<UUID> myItineraries;

    @Column("mytravels")
    private List<UUID> myTravels;

    @Column("mysuscription")
    private UUID subscription;

    @Column("paiementdate")
    private Instant paiementDate;

    @Column("vehicle")
    private UUID vehicle;

    @Column("piece")
    private List<UUID> piece;

    @Column("picture")
    @CassandraType(type = Name.BLOB)
    private byte[] picture;

    @Column("avatar")
    @CassandraType(type = Name.BLOB)
    private byte[] avatar;

    @Column("createdat")
    private Instant createdAt;  // Utilisation de Instant pour TIMESTAMP

    @Column("updatedat")
    private Instant updatedAt;  // Utilisation de Instant pour TIMESTAMP

    @Column("birthdate")
    private LocalDate birthDate;  // Utilisation de LocalDate pour DATE

    @Column("averagerating")
    private Float averageRating;

    @Column("lastconnection")
    private Instant lastConnection;

    @Column("issuspend")
    private Boolean isSuspend;

    @Column("isdeleted")
    private Boolean isDeleted;

    @Column("gender")
    private String gender;

    @Column("language")
    private String language;
    @Column("theme")
    private String theme;

    @Column("islocalisable")
    private Boolean isLocalisable;

    @Column("isauthenticatedasdriver")
    private Boolean isAuthenticatedAsDriver;
    
    @Column("timezone")
    private Double timeZone;

}
