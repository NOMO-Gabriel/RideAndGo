package com.rideAndGo.rideAndGo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class RideAndGoApplication {
	public static void main(String[] args) {
		SpringApplication.run(RideAndGoApplication.class, args);
	}


	
}
