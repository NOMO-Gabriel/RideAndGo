package com.rideAndGo.rideAndGo.dto;

import lombok.Data;

@Data
public class SearchPlaceDTO {

    private String id;
    private Long osmId;
    private String name;
    private Double latitude;
    private Double longitude;
    private String way;
    private String description;

    // Constructeur à partir de SearchPlace
    public SearchPlaceDTO(String id, Long osmId, String name, Double latitude, Double longitude, String way, String description) {
        this.id = id;
        this.osmId = osmId;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.way = way;
        this.description = description;
    }
}
