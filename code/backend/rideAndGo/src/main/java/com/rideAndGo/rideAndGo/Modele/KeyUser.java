package com.rideAndGo.rideAndGo.Modele;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
@PrimaryKeyClass
@AllArgsConstructor
@Getter
@Setter
public class KeyUser {
    @PrimaryKeyColumn(type = PrimaryKeyType.PARTITIONED)
    private String nom;
    @PrimaryKeyColumn(type = PrimaryKeyType.PARTITIONED)
    private String motDePasse;
}