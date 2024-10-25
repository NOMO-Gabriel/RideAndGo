package com.rideAndGo.rideAndGo.repositories;

import com.rideAndGo.rideAndGo.models.User;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends CassandraRepository<User, UUID> { 
    
    Optional<User> findByPseudo(String pseudo); 
    boolean existsByPseudo(String pseudo);
}
