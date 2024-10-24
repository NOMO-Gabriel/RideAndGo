package com.rideAndGo.rideAndGo.Modele;



import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @PrimaryKey
    private int id;
    private String prenom;
    private String nom;
    private String pseudo;
    private String email;
    private String motDePasse;
    private String adresse;
    private String telephone;

}
