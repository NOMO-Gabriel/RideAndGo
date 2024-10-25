package com.rideAndGo.rideAndGo.dto;

import java.util.UUID;
public class UserDTO {
    private UUID id;
    private String pseudo;
    private String email;

    public UserDTO(UUID id, String pseudo, String email) {
        this.id = id;
        this.pseudo = pseudo;
        this.email = email;
    }

    
}
