package com.rideAndGo.rideAndGo.Repository;



import com.rideAndGo.rideAndGo.Modele.User;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CassandraRepository<User,Integer> {

    @Override
    Optional<User> findById(Integer integer);
}
