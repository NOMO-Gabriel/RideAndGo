package com.rideAndGo.rideAndGo.dto;

public class UserRegistrationRequest {
    private String pseudo;
    private String password;

    // Getters et Setters
    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
