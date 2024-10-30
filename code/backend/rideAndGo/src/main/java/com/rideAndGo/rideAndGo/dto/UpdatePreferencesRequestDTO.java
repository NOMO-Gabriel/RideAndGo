package com.rideAndGo.rideAndGo.dto;

import java.time.LocalDate;
import java.util.UUID;

import lombok.Data;

@Data
public class UpdatePreferencesRequestDTO {
    private UUID id;
    private preferencesDTO preferences;

    @Data
    public static class preferencesDTO {
        private String language;
        private String theme;
        private Boolean isLocalisable;
        private Double timeZone = 0.0;
    }
}
