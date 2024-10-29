package com.rideAndGo.rideAndGo.repositories;

import com.rideAndGo.rideAndGo.models.Place;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PlaceRepository extends CassandraRepository<Place, UUID> {
}
