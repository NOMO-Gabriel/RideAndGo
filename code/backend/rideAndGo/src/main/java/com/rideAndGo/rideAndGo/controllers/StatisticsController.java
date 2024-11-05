package com.rideAndGo.rideAndGo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rideAndGo.rideAndGo.services.StatisticsService;
import com.rideAndGo.rideAndGo.models.Statistics;


@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping
    public ResponseEntity<Statistics> getStatistics() {
        Statistics stats = statisticsService.getStatistics();
        return ResponseEntity.ok(stats);
    }
    
}
