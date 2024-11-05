package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.models.UserPlace;
import com.rideAndGo.rideAndGo.services.UserPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/userPlaces")
public class UserPlaceController {

    @Autowired
    private final UserPlaceService userPlaceService;

    public UserPlaceController(UserPlaceService userPlaceService) {
        this.userPlaceService = userPlaceService;
    }

    @GetMapping
    public ResponseEntity<Iterable<UserPlace>> getAllUserPlaces() {
        Iterable<UserPlace> userPlaces = userPlaceService.getAllUserPlaces();
   
        System.out.println("Fetched user places: " + userPlaces);
        return ResponseEntity.ok(userPlaceService.getAllUserPlaces());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Iterable<UserPlace>> getUserPlacesByUserId(@PathVariable UUID userId) {
        return ResponseEntity.ok(userPlaceService.getUserPlacesByUserId(userId));
    }

    @PostMapping("/create")
    public ResponseEntity<UserPlace> createUserPlace(@RequestBody UserPlace userPlace) {
        return ResponseEntity.status(201).body(userPlaceService.createUserPlace(userPlace));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUserPlace(@PathVariable UUID id) {
        userPlaceService.deleteUserPlace(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<UserPlace> updateUserPlace(@PathVariable UUID id, @RequestBody UserPlace userPlaceDetails) {
        return ResponseEntity.ok(userPlaceService.updateUserPlace(id, userPlaceDetails));
    }
}
