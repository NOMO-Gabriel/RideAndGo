package com.rideAndGo.rideAndGo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;

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

    @Column("is_online")
    private Boolean isOnline;

    @Column("roles")
    private List<String> roles;

    
}
