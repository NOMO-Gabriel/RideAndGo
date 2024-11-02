package com.rideAndGo.rideAndGo.repositories;

import org.springframework.data.cassandra.repository.Query;
import com.rideAndGo.rideAndGo.models.UserPlace;
import org.springframework.data.cassandra.repository.CassandraRepository;
import java.util.UUID;

public interface UserPlaceRepository extends CassandraRepository<UserPlace, UUID> {
    @Query("SELECT * FROM userPlace WHERE userId = ? ALLOW FILTERING")
    Iterable<UserPlace> findAllByUserId(UUID userId);

}
