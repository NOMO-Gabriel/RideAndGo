package com.rideAndGo.rideAndGo.dto;

import java.time.LocalDate;
import java.util.UUID;

import lombok.Data;

@Data
public class CreateAdminRequest {

    private UUID superAdminId;
    private AdminDetails adminToCreate;


    public static class AdminDetails {
        private String pseudo;
        private String email;
        private String password;
        private Double phoneNumber;
        private String name;
        private String surname;
        private LocalDate birthday;
        private String gender;

        // Getters et Setters
        public String getPseudo() {
            return pseudo;
        }

        public void setPseudo(String pseudo) {
            this.pseudo = pseudo;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public Double getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(Double phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getSurname() {
            return surname;
        }

        public void setSurname(String surname) {
            this.surname = surname;
        }

        public LocalDate getBirthday() {
            return birthday;
        }

        public void setBirthday(LocalDate birthday) {
            this.birthday = birthday;
        }

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }
    }
}
