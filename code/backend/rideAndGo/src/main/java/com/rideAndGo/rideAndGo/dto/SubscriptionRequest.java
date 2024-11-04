package com.rideAndGo.rideAndGo.dto;

import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class SubscriptionRequest {
    private UUID adminId;
    private SubscriptionDTO subscription;
    
    @Data
    public class SubscriptionDTO {
        private String label;
        private Double price;
        private String description;
        private List<String> features;  
        
    }
}
