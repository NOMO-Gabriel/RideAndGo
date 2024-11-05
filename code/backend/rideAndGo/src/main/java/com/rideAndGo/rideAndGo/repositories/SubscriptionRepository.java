package com.rideAndGo.rideAndGo.repositories;

import com.rideAndGo.rideAndGo.models.Subscription;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubscriptionRepository  extends CassandraRepository<Subscription, UUID>{
    @Query("SELECT * FROM subscription WHERE label=?0 ALLOW FILTERING")
    Optional<Subscription> findByLabel(String label);
    boolean existsByLabel(String label);
   

}
