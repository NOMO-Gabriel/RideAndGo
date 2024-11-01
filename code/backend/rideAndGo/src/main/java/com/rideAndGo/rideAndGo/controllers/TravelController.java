package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.models.Travel;
import com.rideAndGo.rideAndGo.dto.TravelRequestDTO;
import com.rideAndGo.rideAndGo.dto.TravelResponseDTO;
import com.rideAndGo.rideAndGo.dto.AuthResponse;
import com.rideAndGo.rideAndGo.dto.DriverAssignResponse;
import com.rideAndGo.rideAndGo.services.TravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/travels")
public class TravelController {

    @Autowired
    private final TravelService travelService;

    public TravelController (TravelService travelService){
        this.travelService = travelService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTravelById(@PathVariable UUID id) {
        Optional<Travel> travel = travelService.getTravelById(id);
        if (travel.isPresent()) {
            return ResponseEntity.ok(new TravelResponseDTO(travel.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("Travel not found"));
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<TravelResponseDTO>> getAllTravels() {
        List<TravelResponseDTO> travels = travelService.getAllTravels()
                                                        .stream()
                                                        .map(TravelResponseDTO::new)
                                                        .collect(Collectors.toList());
        return ResponseEntity.ok(travels);
    }

    @PostMapping("/create")
    public ResponseEntity<TravelResponseDTO> createTravel(@RequestBody TravelRequestDTO travelRequestDTO) {
        // Crée un nouvel objet Travel
        Travel travel = new Travel();
        travel.setId(UUID.randomUUID());
        // Remplit les champs à partir de TravelRequestDTO
        travel.setStartPointId(travelRequestDTO.getStartPointId());
        travel.setEndPointId(travelRequestDTO.getEndPointId());
        travel.setTraveller(travelRequestDTO.getTraveller());
        travel.setDate(travelRequestDTO.getDate());
        travel.setDepartureTime(travelRequestDTO.getDepartureTime());
        travel.setNumberOfSeats(travelRequestDTO.getNumberOfSeats());
        travel.setPrice(travelRequestDTO.getPrice());
        
        // Définit les valeurs par défaut pour les autres champs
        travel.setTravellerRating(0.0);
        travel.setDriverRating(0.0);
        travel.setDriver(null);
        
        // Sauvegarde le trajet
        Travel createdTravel = travelService.createTravel(travel);
        
        // Retourne la réponse
        return ResponseEntity.ok(new TravelResponseDTO(createdTravel));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<AuthResponse> deleteTravel(@PathVariable UUID id) {
        travelService.deleteTravel(id);
        return ResponseEntity.ok(new AuthResponse("Travel deleted successfully"));
    }
    
    // @PutMapping("/edit/{id}")
    // public ResponseEntity<?> updateTravel(@PathVariable UUID id, @RequestBody TravelRequestDTO travelRequestDTO) {
    //     Travel updatedTravel = travelService.updateTravel(id, travelRequestDTO);
    //     return ResponseEntity.ok(new TravelResponseDTO(updatedTravel));
    // }

    @PutMapping("/{id}/rateTraveller")
    public ResponseEntity<?> rateTraveller(@PathVariable UUID id, @RequestParam Double travellerRating) {
        Optional<Travel> travelOptional = travelService.getTravelById(id);
        if (travelOptional.isPresent()) {
            Travel travel = travelOptional.get();
            if (travel.getDriver() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Travel does not have an assigned driver yet.");
            }
            travelService.rateTraveller(id, travellerRating);
            return ResponseEntity.ok(new TravelResponseDTO(travel));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Travel not found");
        }
    }

    @PutMapping("/{id}/rateDriver")
public ResponseEntity<?> rateDriver(@PathVariable UUID id, @RequestParam Double driverRating) {
    Optional<Travel> travelOptional = travelService.getTravelById(id);
    if (travelOptional.isPresent()) {
        Travel travel = travelOptional.get();
        if (travel.getDriver() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Driver not yet assigned for this travel.");
        }
        travelService.rateDriver(id, driverRating);
        return ResponseEntity.ok(new TravelResponseDTO(travel));
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Travel not found");
    }
}

    @PutMapping("/{id}/assignDriver")
public ResponseEntity<?> assignDriver(@PathVariable UUID id, @RequestParam UUID driver) {
    Optional<Travel> travelOptional = travelService.getTravelById(id);
    if (travelOptional.isPresent()) {
        Travel travel = travelOptional.get();
        if (travel.getDriver() != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new DriverAssignResponse("Driver already assigned for this travel.", travel));
        }
        travelService.assignDriver(id, driver);
        return ResponseEntity.ok(new TravelResponseDTO(travel));
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Travel not found");
    }
}
}
