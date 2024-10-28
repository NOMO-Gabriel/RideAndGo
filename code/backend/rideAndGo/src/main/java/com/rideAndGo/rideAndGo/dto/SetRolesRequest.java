package com.rideAndGo.rideAndGo.dto;



import java.util.List;
import java.util.UUID;

import lombok.Data;


@Data
public class SetRolesRequest {

    private UUID adminId;
    private UUID userId;
    private List<String> newRoles;

}
