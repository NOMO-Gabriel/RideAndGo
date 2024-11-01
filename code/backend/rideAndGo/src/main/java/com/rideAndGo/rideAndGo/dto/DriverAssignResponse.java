package com.rideAndGo.rideAndGo.dto;

import com.rideAndGo.rideAndGo.models.Travel;

import lombok.Data;

@Data
public class DriverAssignResponse {
    private String message;
    private Travel travel;
    
    public DriverAssignResponse(String message, Travel travel){
        this.message=message;
        this.travel=travel;
    }
}
