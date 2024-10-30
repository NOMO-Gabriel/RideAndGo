package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.dto.AuthResponse;
import com.rideAndGo.rideAndGo.dto.PlaceCreationRequest;
import com.rideAndGo.rideAndGo.models.Place;
import com.rideAndGo.rideAndGo.services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping("/searchById/{id}")
    public ResponseEntity<?> getPlaceById(@PathVariable UUID id) {
        Optional<Place> place = placeService.getPlaceById(id);
        if (place.isPresent()) {
            return ResponseEntity.ok(place.get());
        } else {
            //return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("Place not found", "Place with id " + id + " does not exist"));
        
            return ResponseEntity.status(404).body("Place not found, place with id " + id + " does not exist");
        }
    }

    @GetMapping("/searchByName/{name}")
    public ResponseEntity<?> searchPlacesByName(@PathVariable String name) {
        List<Place> places = placeService.searchPlacesByName(name);
        if (!places.isEmpty()) {
            return ResponseEntity.ok(places);
        } else {
            return ResponseEntity.status(404).body("No places found containing: " + name);
        }
    }

    @GetMapping("/")
    public ResponseEntity<Iterable<Place>> getAllPlaces() {
        Iterable<Place> places = placeService.getAllPlaces();
        return ResponseEntity.ok(places);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPlace(@RequestBody PlaceCreationRequest place) {
        try {
            UUID placeId=UUID.randomUUID();
            Place placeToSave=new Place();
            placeToSave.setMapName(place.getMapName());
            placeToSave.setCurrentName(place.getCurrentName());
            placeToSave.setDescription(place.getDescription());
            placeToSave.setId(placeId);
            Place createdPlace = placeService.createPlace(placeToSave);
            return ResponseEntity.status(201).body(createdPlace);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating place" + e.getMessage());
        }
    }

    // @DeleteMapping("/delete/{id}")
    // public ResponseEntity<?> deletePlace(@PathVariable UUID id) {
    //     try {
    //         placeService.deletePlace(id);
    //         return ResponseEntity.status(204).build();
    //     } catch (Exception e) {
    //         return ResponseEntity.status(500).body(new AuthResponse("Error deleting place " + e.getMessage()));
    //     }
    // }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updatePlace(@PathVariable UUID id, @RequestBody PlaceUpdateRequest placeDetails) {
        try {
            Place updatedPlace = new Place();
            Place placeToUpdate = new Place();
            placeToUpdate = placeService.getPlaceById(id).get();
            updatedPlace.setId(id);
            updatedPlace.setMapName(placeToUpdate.getMapName());
            updatedPlace.setCurrentName(placeDetails.getCurrentName());
            updatedPlace.setDescription(placeDetails.getDescription());
            return ResponseEntity.ok(updatedPlace);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating place " + e.getMessage());
        }
    }
}
