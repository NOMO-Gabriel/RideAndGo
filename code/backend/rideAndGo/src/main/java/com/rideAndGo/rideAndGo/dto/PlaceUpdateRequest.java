package com.rideAndGo.rideAndGo.dto;

import lombok.Data;

@Data
public class PlaceUpdateRequest {
    private String newCurrentName;
    private String newDescription;
}
