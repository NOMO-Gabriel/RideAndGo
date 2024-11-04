package com.rideAndGo.rideAndGo.repositories;

import com.rideAndGo.rideAndGo.models.Subscription;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubscriptionRepository  extends CassandraRepository<Subscription, UUID>{
    Optional<Subscription> findByLabel(String label);
    boolean existsByLabel(String label);
}
