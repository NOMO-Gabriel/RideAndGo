package com.rideAndGo.rideAndGo.services;

import com.rideAndGo.rideAndGo.dto.PlaceCreationRequest;
import com.rideAndGo.rideAndGo.models.Place;
import com.rideAndGo.rideAndGo.repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public Optional<Place> getPlaceById(UUID id) {
        return placeRepository.findById(id);
    }
  public List<Place> searchPlacesByName(String name) {
    return placeRepository.findAll()
                          .stream()
                          .filter(place -> place.getMapName().toLowerCase().contains(name.toLowerCase()))
                          .collect(Collectors.toList());
}


    public Iterable<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    public Place createPlace(Place place) {
        return placeRepository.save(place);
    }

    public void deletePlace(UUID id) {
        placeRepository.deleteById(id);
    }

    public Place updatePlace(UUID id, Place placeDetails) {
        Optional<Place> optionalPlace = placeRepository.findById(id);
        if (optionalPlace.isPresent()) {
            Place place = optionalPlace.get();
            place.setMapName(placeDetails.getMapName());
            place.setCurrentName(placeDetails.getCurrentName());
            place.setDescription(placeDetails.getDescription());
            return placeRepository.save(place);
        } else {
            throw new RuntimeException("Place not found with id " + id);
        }
    }
}
