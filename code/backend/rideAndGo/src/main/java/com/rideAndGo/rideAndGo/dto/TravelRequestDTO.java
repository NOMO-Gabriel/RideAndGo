package com.rideAndGo.rideAndGo.dto;

import lombok.Data;

import java.time.LocalDate;


import java.time.LocalTime;
import java.util.UUID;



@Data
public class TravelRequestDTO {
     private UUID startPointId;
    private UUID endPointId;
    private UUID traveller;
    private LocalDate date;
    
    private LocalTime departureTime;
    private double numberOfSeats;
    private double price;

    
}
