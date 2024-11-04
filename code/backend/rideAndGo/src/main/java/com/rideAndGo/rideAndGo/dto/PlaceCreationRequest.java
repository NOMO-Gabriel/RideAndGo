package com.rideAndGo.rideAndGo.dto;

import lombok.Data;

@Data
public class PlaceCreationRequest {
    private Long osmId;
    private String name;
    private Double latitude;
    private Double longitude;
    private String way;
    private String description;
}
