package com.rideAndGo.rideAndGo.Repository;
import com.rideAndGo.rideAndGo.Modele.Compteur;
import org.springframework.data.cassandra.repository.CassandraRepository;

public interface CompteurRepository extends CassandraRepository<Compteur,Integer> {

}
