package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.dto.AuthResponse;
import com.rideAndGo.rideAndGo.models.Itinerary;
import com.rideAndGo.rideAndGo.services.ItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/itineraries")
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getItineraryById(@PathVariable UUID id) {
        Optional<Itinerary> itinerary = itineraryService.getItineraryById(id);
        if (itinerary.isPresent()) {
            return ResponseEntity.ok(itinerary.get());
        } else {
            return ResponseEntity.status(404).body(new AuthResponse( "Itinerary with id  not found" + id + " does not exist"));
        }
    }

    @GetMapping
    public ResponseEntity<Iterable<Itinerary>> getAllItineraries() {
        Iterable<Itinerary> itineraries = itineraryService.getAllItineraries();
        return ResponseEntity.ok(itineraries);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createItinerary(@RequestBody Itinerary itinerary) {
        try {
            Itinerary createdItinerary = itineraryService.createItinerary(itinerary);
            return ResponseEntity.status(201).body(createdItinerary);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthResponse("Error creating itinerary " +e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteItinerary(@PathVariable UUID id) {
        try {
            itineraryService.deleteItinerary(id);
            return ResponseEntity.status(204).build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthResponse("Error deleting itinerary " + e.getMessage()));
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateItinerary(@PathVariable UUID id, @RequestBody Itinerary itineraryDetails) {
        try {
            Itinerary updatedItinerary = itineraryService.updateItinerary(id, itineraryDetails);
            return ResponseEntity.ok(updatedItinerary);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthResponse("Error updating itinerary "+ e.getMessage()));
        }
    }
}
