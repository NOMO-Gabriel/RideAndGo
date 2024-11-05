package com.rideAndGo.rideAndGo.repositories;

import com.rideAndGo.rideAndGo.models.Itinerary;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.cassandra.repository.Query;


import java.util.UUID;

@Repository
public interface ItineraryRepository extends CassandraRepository<Itinerary, UUID> {

    @Query("SELECT COUNT(i) FROM Itinerary i")
    int countItineraries();
}
