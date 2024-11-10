package com.rideAndGo.rideAndGo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.UUID;

@Data

@Document(indexName = "places") // Retirez l'attribut type
public class SearchPlace {

    @Id
    private String id;  // Utilisez String comme identifiant dans Elasticsearch

    private Long osmId;
    private String name;
    private Double latitude;
    private Double longitude;
    private String way;
    private String description;
}
