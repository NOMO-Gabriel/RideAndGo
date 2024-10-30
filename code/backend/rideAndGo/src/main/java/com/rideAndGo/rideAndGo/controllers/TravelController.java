package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.models.Travel;
import com.rideAndGo.rideAndGo.dto.AuthResponse;
import com.rideAndGo.rideAndGo.services.TravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.List;
import java.util.UUID;
import java.util.stream.StreamSupport;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/travels")
public class TravelController {

    @Autowired
    private final TravelService travelService;

    public TravelController (TravelService travelService){
        this.travelService = travelService;
    }
     
     //get a travel by id
    @GetMapping("/{id}")
    public Travel getTravelById(@PathVariable UUID id) {  
        /*Optional<Travel> travel = travelService.getTravelById(id);
        if (!travel.isPresent() ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("Travel not found"));
        }
        return ResponseEntity.ok(user.get());
        */
        return travelService.getTravelById(id).orElse(null);
    }
    //get all travels
    @GetMapping
    public ResponseEntity<Iterable<Travel>>getAllTravels() {
        Iterable<Travel> travels = StreamSupport.stream(travelService.getAllTravels().spliterator(), false)
                                             .collect(Collectors.toList());
        return ResponseEntity.ok(travels);

    }

    //create a travel
    @PostMapping("/create")
    public Travel createTravel(@RequestBody Travel travel) {
        return travelService.createTravel(travel);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTravel(@PathVariable UUID id) {
        travelService.deleteTravel(id);
    }
    
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateTravel(@PathVariable UUID id, @RequestBody Travel travelDetails) {
        Optional<Travel> existingTravel = travelService.getTravelById(id);
        if (!existingTravel.isPresent() ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("Travel not found or deleted."));
        }
        
        Travel travel = travelService.updateTravel(id, travelDetails);
        return ResponseEntity.ok(travel);
    }
}
