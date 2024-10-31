package com.rideAndGo.rideAndGo.services;

import com.rideAndGo.rideAndGo.models.Travel;
import com.rideAndGo.rideAndGo.dto.TravelRequestDTO;
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

    public Optional<Travel> getTravelById(UUID id) {
        return travelRepository.findById(id);
    }

    public List<Travel> getAllTravels() {
        return travelRepository.findAll();
    }

    public Travel createTravel(Travel travel) {
        return travelRepository.save(travel);
    }

    public void deleteTravel(UUID id) {
        travelRepository.deleteById(id);
    }

    // public Travel updateTravel(UUID id, TravelRequestDTO travelRequestDTO) {
    //     Travel travel = travelRepository.findById(id).orElseThrow(() -> new RuntimeException("Travel not found"));
    //     travel.setStartPointId(travelRequestDTO.getStartPointId());
    //     travel.setEndPointId(travelRequestDTO.getEndPointId());
    //     travel.setDriver(travelRequestDTO.getDriver());
    //     travel.setTraveller(travelRequestDTO.getTraveller());
    //     travel.setDate(travelRequestDTO.getDate());
    //     travel.setTravellerRating(travelRequestDTO.getTravellerRating());
    //     travel.setDriverRating(travelRequestDTO.getDriverRating());
    //     travel.setNumberOfSeats(travelRequestDTO.getNumberOfSeats());
    //     travel.setPrice(travelRequestDTO.getPrice());
    //     return travelRepository.save(travel);

    // }


    public void rateTraveller(UUID id, Double travellerRating) {
        Travel travel = travelRepository.findById(id).orElseThrow(() -> new RuntimeException("Travel not found"));
        travel.setTravellerRating(travellerRating);
        travelRepository.save(travel);
    }
    
    public void rateDriver(UUID id, Double driverRating) {
        Travel travel = travelRepository.findById(id).orElseThrow(() -> new RuntimeException("Travel not found"));
        travel.setDriverRating(driverRating);
        travelRepository.save(travel);
    }
    
    public void assignDriver(UUID id, UUID driver) {
        Travel travel = travelRepository.findById(id).orElseThrow(() -> new RuntimeException("Travel not found"));
        travel.setDriver(driver);
        travelRepository.save(travel);
    }
}
