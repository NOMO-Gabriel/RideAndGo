package com.rideAndGo.rideAndGo.services;

import com.rideAndGo.rideAndGo.models.Itinerary;
import com.rideAndGo.rideAndGo.repositories.ItineraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ItineraryService {

    @Autowired
    private ItineraryRepository itineraryRepository;

    public Optional<Itinerary> getItineraryById(UUID id) {
        return itineraryRepository.findById(id);
    }

    public Iterable<Itinerary> getAllItineraries() {
        return itineraryRepository.findAll();
    }

    public Itinerary createItinerary(Itinerary itinerary) {
        return itineraryRepository.save(itinerary);
    }

    public void deleteItinerary(UUID id) {
        itineraryRepository.deleteById(id);
    }

    public Itinerary updateItinerary(UUID id, Itinerary itineraryDetails) {
        Optional<Itinerary> optionalItinerary = itineraryRepository.findById(id);
        if (optionalItinerary.isPresent()) {
            Itinerary itinerary = optionalItinerary.get();
            itinerary.setDescription(itineraryDetails.getDescription());
            itinerary.setStartPoint(itineraryDetails.getStartPoint());
            itinerary.setEndPoint(itineraryDetails.getEndPoint());
            itinerary.setOwner(itineraryDetails.getOwner());
            return itineraryRepository.save(itinerary);
        } else {
            throw new RuntimeException("Itinerary not found with id " + id);
        }
    }
}
