package com.rideAndGo.rideAndGo.services;

import com.rideAndGo.rideAndGo.models.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rideAndGo.rideAndGo.repositories.PlaceRepository;
import com.rideAndGo.rideAndGo.repositories.UserRepository;
import com.rideAndGo.rideAndGo.repositories.ItineraryRepository;


import java.util.HashMap;
import java.util.Map;

@Service
public class StatisticsService {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private UserRepository userRepository;

    //@Autowired
    //private VehicleRepository vehicleRepository;

    @Autowired
    private ItineraryRepository itineraryRepository;

    public Statistics getStatistics() {
        Statistics stats = new Statistics();
        
        // Fetch and set data
        //stats.setMostVisitedPlaces(getMostVisitedPlaces());
        stats.setTotalUsers(userRepository.countUsers());
        //stats.setTotalDrivers(userRepository.countDrivers()); // Assuming you have a count method
        //stats.setTotalVehicles(vehicleRepository.countVehicles());
        //stats.setTotalAmountSpent(calculateTotalAmountSpent());
        stats.setTotalItineraries(itineraryRepository.countItineraries());
        stats.setTotalPlaces(placeRepository.countPlaces());

        return stats;
    }

    private Map<String, Integer> getMostVisitedPlaces() {
        // Logic to retrieve and calculate most visited places
        Map<String, Integer> visitedPlaces = new HashMap<>();
        // For example:
        // visitedPlaces.put("Lieu 1", 40);
        // visitedPlaces.put("Lieu 2", 30);
        // Add logic to calculate based on your data
        return visitedPlaces;
    }

    private int calculateTotalAmountSpent() {
        // Logic to calculate the total amount spent
        return 0; // Replace with actual calculation
    }
}
