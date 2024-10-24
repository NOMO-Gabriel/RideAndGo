package com.rideAndGo.rideAndGo.Modele;

import lombok.*;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("compteur")  // Assurez-vous que le nom correspond à la table dans votre base de données Cassandra
@Data
@AllArgsConstructor
@NoArgsConstructor  // Ce constructeur sans arguments résout l'erreur
public class Compteur {

    @PrimaryKey
    private int id;
    private int compteurUser;
    private int compteurConducteur;  // Renommé pour suivre la convention camelCase
    private int compteurVoyage;  // Renommé pour suivre la convention camelCase
    private int compteurMessage;  // Renommé pour suivre la convention camelCase
}
