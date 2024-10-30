package com.rideAndGo.rideAndGo.dto;

import com.rideAndGo.rideAndGo.models.Travel;
import lombok.Data;



import java.util.UUID;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TravelResponseDTO {
    private UUID id;
    private UUID startPointId;
    private UUID endPointId;
    private UUID driver;
    private UUID traveller;
    private LocalDate date;
    private LocalTime departureTime;
    private Double travellerRating;
    private Double driverRating;
    private Double numberOfSeats;
    private Double price;

    public TravelResponseDTO(Travel travel) {
        this.id = travel.getId();
        this.startPointId = travel.getStartPointId();
        this.endPointId = travel.getEndPointId();
        this.driver = travel.getDriver();
        this.traveller = travel.getTraveller();
        this.date = travel.getDate();
        this.departureTime=travel.getDepartureTime();
        this.travellerRating = travel.getTravellerRating();
        this.driverRating = travel.getDriverRating();
        this.numberOfSeats = travel.getNumberOfSeats();
        this.price = travel.getPrice();
    }
}


