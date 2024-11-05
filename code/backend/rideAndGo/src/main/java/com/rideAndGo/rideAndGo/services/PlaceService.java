package com.rideAndGo.rideAndGo.services;

import com.rideAndGo.rideAndGo.models.Place;
import com.rideAndGo.rideAndGo.repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.cassandra.repository.Query;

import java.util.stream.Collectors;

import java.util.stream.Collectors;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    // Récupérer un lieu par ID
    // Récupérer un lieu par ID
    public Optional<Place> getPlaceById(UUID id) {
        return placeRepository.findById(id);
    }

    

    // Rechercher des lieux par nom
    public List<Place> searchPlacesByName(String name) {
        return placeRepository.findAll()
                            .stream()
                            .filter(place ->place.getName().toLowerCase().contains(name.toLowerCase()))
                            .collect(Collectors.toList());
    }

    // Récupérer tous les lieux
    // Récupérer tous les lieux
    public Iterable<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    
    

    // Créer un nouveau lieu
    // Créer un nouveau lieu
    public Place createPlace(Place place) {
        return placeRepository.save(place);
    }

    // Mettre à jour un lieu existant
    public Place updatePlace(UUID id, Place updatedPlace) {
        updatedPlace.setId(id); // Au cas où l'ID ne serait pas défini dans updatedPlace
        return placeRepository.save(updatedPlace);
    }
    

    // Supprimer un lieu (optionnel si besoin d'une fonction de suppression)
   
    

    // Supprimer un lieu (optionnel si besoin d'une fonction de suppression)
    public void deletePlace(UUID id) {
        if (placeRepository.existsById(id)) {
            placeRepository.deleteById(id);
         } else {
            throw new RuntimeException("Place not found with ID " + id);
        }
    }
}
