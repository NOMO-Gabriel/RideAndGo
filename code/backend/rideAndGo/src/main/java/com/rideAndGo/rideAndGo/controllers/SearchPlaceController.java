package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.dto.SearchPlaceDTO;
import com.rideAndGo.rideAndGo.services.SearchPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SearchPlaceController {

    @Autowired
    private SearchPlaceService searchPlaceService;

    // Recherche avec un paramètre `name` qui permet une correspondance progressive
    @GetMapping("/api/places/search")
    public List<SearchPlaceDTO> searchPlaces(@RequestParam String name) {
        return searchPlaceService.searchPlacesByName(name);
    }
}
