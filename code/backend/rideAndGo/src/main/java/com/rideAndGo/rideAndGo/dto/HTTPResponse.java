package com.rideAndGo.rideAndGo.dto;



import lombok.Data;
@Data
public class HTTPResponse {
   private String message;
  
  
    public HTTPResponse(String message) {
        this.message = message;
    }
    
}
