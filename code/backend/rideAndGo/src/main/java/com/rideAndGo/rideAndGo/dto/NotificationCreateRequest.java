package com.rideAndGo.rideAndGo.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class NotificationCreateRequest {
    private String title;
    private String message;
    private UUID receiver;
}
