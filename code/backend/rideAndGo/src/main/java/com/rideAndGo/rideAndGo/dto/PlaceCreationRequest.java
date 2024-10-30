package com.rideAndGo.rideAndGo.dto;

import lombok.Data;

@Data
public class PlaceCreationRequest {
    private String mapName;
    private String currentName;
    private String description;
}
