package com.rideAndGo.rideAndGo.Repository;


import com.rideAndGo.rideAndGo.Modele.UserAuthentification;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAuthentificationRepository extends CassandraRepository<UserAuthentification,Integer> {

   Optional<UserAuthentification> findByKey_NomAndKey_MotDePasse(String nom,String motDePasse);


}

