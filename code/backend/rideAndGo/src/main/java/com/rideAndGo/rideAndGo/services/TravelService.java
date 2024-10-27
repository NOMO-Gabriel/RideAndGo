package com.rideAndGo.rideAndGo.services;

import com.rideAndGo.rideAndGo.models.Travel;
import com.rideAndGo.rideAndGo.repositories.TravelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TravelService {

    @Autowired
    private final TravelRepository travelRepository;

    public TravelService(TravelRepository travelRepository){
        this.travelRepository = travelRepository;
    }

    //getting a single travel
    public Optional<Travel> getTravelById(UUID id) {
        return travelRepository.findById(id);
    }

    //getting all travels
    public Iterable<Travel> getAllTravels() {
        return travelRepository.findAll();
    }

    public Travel createTravel(Travel travel) {
        return travelRepository.save(travel);
    }

    public void deleteTravel(UUID id) {
        travelRepository.deleteById(id);
    }

    public Travel updateTravel(UUID id, Travel travelDetails) {
        Optional<Travel> optionalTravel = travelRepository.findById(id);
        if (optionalTravel.isPresent()) {
            Travel travel = optionalTravel.get();
            travel.setStartPointId(travelDetails.getStartPointId());
            travel.setEndPointId(travelDetails.getEndPointId());
            travel.setDriver(travelDetails.getDriver());
            travel.setTraveller(travelDetails.getTraveller());
            travel.setDate(travelDetails.getDate());
            travel.setTravellerRating(travelDetails.getTravellerRating());
            travel.setDriverRating(travelDetails.getDriverRating());
            travel.setNumberOfSeats(travelDetails.getNumberOfSeats());
            travel.setPrice(travelDetails.getPrice());
            return travelRepository.save(travel);
        } else {
            throw new RuntimeException("Travel not found with id " + id);
        }
    }
}
