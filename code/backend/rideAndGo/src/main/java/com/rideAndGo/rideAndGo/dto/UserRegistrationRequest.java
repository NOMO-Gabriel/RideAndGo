package com.rideAndGo.rideAndGo.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserRegistrationRequest {
    private String pseudo;
    private String password;
    private String email;
    private Double phoneNumber;
    private String name;
    private String surname;
    private LocalDate birthDate;
    private String gender;
    private Boolean isDriver;
   
   

    // Lombok génère automatiquement les getters, setters, toString, equals, et hashCode.
}
