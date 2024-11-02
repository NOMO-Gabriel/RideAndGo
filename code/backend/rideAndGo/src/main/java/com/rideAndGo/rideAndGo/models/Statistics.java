package com.rideAndGo.rideAndGo.models;

import lombok.Data;
import java.util.Map;
import java.util.HashMap; 


@Data
public class Statistics {
    private Map<String, Integer> mostVisitedPlaces;
    private int totalUsers;
    private int totalDrivers;
    private int totalTrips;
    private int totalVehicles;
    private int totalAmountSpent;
    private int totalItineraries;
    private int totalPlaces;

    // Getters and setters
}
