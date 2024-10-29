package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.dto.AuthResponse;
import com.rideAndGo.rideAndGo.models.Place;
import com.rideAndGo.rideAndGo.services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlaceById(@PathVariable UUID id) {
        Optional<Place> place = placeService.getPlaceById(id);
        if (place.isPresent()) {
            return ResponseEntity.ok(place.get());
        } else {
            //return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("Place not found", "Place with id " + id + " does not exist"));

            return ResponseEntity.status(404).body(new AuthResponse("Place not found, place with id " + id + " does not exist"));
        }
    }

    @GetMapping
    public ResponseEntity<Iterable<Place>> getAllPlaces() {
        Iterable<Place> places = placeService.getAllPlaces();
        return ResponseEntity.ok(places);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPlace(@RequestBody Place place) {
        try {
            Place createdPlace = placeService.createPlace(place);
            return ResponseEntity.status(201).body(createdPlace);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthResponse("Error creating place" + e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePlace(@PathVariable UUID id) {
        try {
            placeService.deletePlace(id);
            return ResponseEntity.status(204).build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthResponse("Error deleting place " + e.getMessage()));
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updatePlace(@PathVariable UUID id, @RequestBody Place placeDetails) {
        try {
            Place updatedPlace = placeService.updatePlace(id, placeDetails);
            return ResponseEntity.ok(updatedPlace);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthResponse("Error updating place " + e.getMessage()));
        }
    }
}
