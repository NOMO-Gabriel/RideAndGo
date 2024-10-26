package com.rideAndGo.rideAndGo.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class UpdatePersonalInfosRequestDTO {

    private UUID id;
    private PersonalInfosDTO personnalInfos;

    @Data
    public static class PersonalInfosDTO {
        private String surname;
        private String name;
        private String pseudo;
        private LocalDate birthDate;
        private String gender;
        private String email;
        private Double phoneNumber;
    }
}
