package com.rideAndGo.rideAndGo.dto;


import java.util.UUID;

import lombok.Data;

@Data
public class PasswordChangeRequest {
    private UUID id;
    private String currentPassword;
    private String newPassword;
}
 