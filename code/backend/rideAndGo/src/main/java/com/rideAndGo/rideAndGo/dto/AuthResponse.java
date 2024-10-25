package com.rideAndGo.rideAndGo.dto;

import com.rideAndGo.rideAndGo.models.User;

import lombok.Data;

@Data
public class AuthResponse {
    private String message;
    private User user;

    public AuthResponse(String message) {
        this.message = message;
    }
    public AuthResponse(String message, User user){
        this.message=message;
        this.user=user;

    }

    // public String getMessage() {
    //     return message;
    // }
}
