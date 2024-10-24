package com.rideAndGo.rideAndGo.dto;

import lombok.Data;

@Data
public class AuthRequest {

    private String pseudo;
    private String password;
    private String Email;
    private Double phoneNumber;

   
}
