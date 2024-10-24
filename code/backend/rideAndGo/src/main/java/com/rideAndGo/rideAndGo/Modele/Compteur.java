package com.rideAndGo.rideAndGo.Modele;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("Compteur")
@Data
@AllArgsConstructor
public class Compteur{

    @PrimaryKey
    @Id
    public int id;
    public  int compteurUser;

    public int compteur_Conducteur;
    public int compteur_voyage;

    public int compteur_message;
}
