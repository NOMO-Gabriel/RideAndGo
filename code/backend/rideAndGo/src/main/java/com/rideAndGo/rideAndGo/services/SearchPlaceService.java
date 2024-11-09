package com.rideAndGo.rideAndGo.services;

import com.rideAndGo.rideAndGo.dto.SearchPlaceDTO;
import com.rideAndGo.rideAndGo.models.SearchPlace;
import com.rideAndGo.rideAndGo.repositories.SearchPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchPlaceService {

    @Autowired
    private SearchPlaceRepository searchPlaceRepository;

    public List<SearchPlaceDTO> searchPlacesByName(String name) {
        // Assurez-vous que le nom est entouré de '*' pour faire une recherche flexible
        name = "*" + name + "*";  // Cela permet de rechercher à partir de n'importe quelle position du champ "name"
        List<SearchPlace> places = searchPlaceRepository.findByNameLike(name);
        return places.stream()
                .map(place -> new SearchPlaceDTO(place.getId(), place.getOsmId(), place.getName(), place.getLatitude(), place.getLongitude(), place.getWay(), place.getDescription()))
                .collect(Collectors.toList());
    }
}
