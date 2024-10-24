package com.rideAndGo.rideAndGo.Modele;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
public class UserAuthentification {

    @PrimaryKey
    @Id
    private KeyUser key;

    private int id;

    private String prenom;

    private String pseudo;

    private String email;

    private String adresse;

    private String telephone;
}
