package com.rideAndGo.rideAndGo.services;

import com.rideAndGo.rideAndGo.models.UserPlace;
import com.rideAndGo.rideAndGo.repositories.UserPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class UserPlaceService {

    @Autowired
    private UserPlaceRepository userPlaceRepository;

    public Iterable<UserPlace> getAllUserPlaces() {
        return userPlaceRepository.findAll();
    }

    public Iterable<UserPlace> getUserPlacesByUserId(UUID userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        return userPlaceRepository.findAllByUserId(userId);
    }

    public UserPlace createUserPlace(UserPlace userPlace) {
        return userPlaceRepository.save(userPlace);
    }

    public void deleteUserPlace(UUID id) {
        userPlaceRepository.deleteById(id);
    }

    public UserPlace updateUserPlace(UUID id, UserPlace userPlaceDetails) {
        UserPlace userPlace = userPlaceRepository.findById(id).orElseThrow();
        userPlace.setName(userPlaceDetails.getName());
        userPlace.setLatitude(userPlaceDetails.getLatitude());
        userPlace.setLongitude(userPlaceDetails.getLongitude());
        userPlace.setWay(userPlaceDetails.getWay());
        userPlace.setDescription(userPlaceDetails.getDescription());
        return userPlaceRepository.save(userPlace);
    }
}
