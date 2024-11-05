package com.rideAndGo.rideAndGo.repositories;

import com.rideAndGo.rideAndGo.models.User;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.cassandra.repository.Query;



import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends CassandraRepository<User, UUID> { 
    
    Optional<User> findByPseudo(String pseudo);
    
    @Query("SELECT * FROM user WHERE email=?0 ALLOW FILTERING")
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(Double phoneNumber);
    boolean existsByPseudo(String pseudo);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(double phoneNumber);

    @Query("SELECT COUNT(u) FROM User u")
    int countUsers();
}
