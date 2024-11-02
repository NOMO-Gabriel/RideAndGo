package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.dto.PlaceCreationRequest;
import com.rideAndGo.rideAndGo.dto.PlaceUpdateRequest;
import com.rideAndGo.rideAndGo.models.Place;
import com.rideAndGo.rideAndGo.services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    // Récupérer un lieu par son ID
    @GetMapping("/searchById/{id}")
    public ResponseEntity<?> getPlaceById(@PathVariable UUID id) {
        Optional<Place> place = placeService.getPlaceById(id);
        if (place.isPresent()) {
            return ResponseEntity.ok(place.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Place not found, place with ID " + id + " does not exist");
        }
    }

    // Rechercher des lieux par nom
    @GetMapping("/searchByName/{name}")
    public ResponseEntity<?> searchPlacesByName(@PathVariable String name) {
        List<Place> places = placeService.searchPlacesByName(name);
        if (!places.isEmpty()) {
            return ResponseEntity.ok(places);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No places found containing: " + name);
        }
    }

    // Obtenir tous les lieux
    @GetMapping("/")
    public ResponseEntity<Iterable<Place>> getAllPlaces() {
        Iterable<Place> places = placeService.getAllPlaces();
        return ResponseEntity.ok(places);
    }

    // Créer un lieu
    @PostMapping("/create")
    public ResponseEntity<?> createPlace(@RequestBody PlaceCreationRequest placeRequest) {
        try {
            UUID placeId = UUID.randomUUID();
            Place placeToSave = new Place();
            placeToSave.setId(placeId);
            placeToSave.setOsmId(placeRequest.getOsmId());
            placeToSave.setName(placeRequest.getName());
            placeToSave.setLatitude(placeRequest.getLatitude());
            placeToSave.setLongitude(placeRequest.getLongitude());
            placeToSave.setWay(placeRequest.getWay());
            placeToSave.setDescription(placeRequest.getDescription());
            Place createdPlace = placeService.createPlace(placeToSave);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPlace);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating place: " + e.getMessage());
        }
    }

    // Mettre à jour un lieu
    @PutMapping("/edit/{id}")
public ResponseEntity<?> updatePlace(@PathVariable UUID id, @RequestBody PlaceUpdateRequest placeDetails) {
    Optional<Place> existingPlaceOpt = placeService.getPlaceById(id);
    if (!existingPlaceOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Place with ID " + id + " does not exist");
    }

    Place existingPlace = existingPlaceOpt.get();
    existingPlace.setName(placeDetails.getName());
    existingPlace.setDescription(placeDetails.getDescription());
    existingPlace.setLatitude(placeDetails.getLatitude());
    existingPlace.setLongitude(placeDetails.getLongitude());
    existingPlace.setWay(placeDetails.getWay());
    existingPlace.setOsmId(placeDetails.getOsmId());

    Place updatedPlace = placeService.updatePlace(id, existingPlace);
    return ResponseEntity.ok(updatedPlace);
}

}
