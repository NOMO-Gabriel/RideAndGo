package com.rideAndGo.rideAndGo.repositories;
import org.springframework.data.cassandra.repository.CassandraRepository;

import com.rideAndGo.rideAndGo.models.ProfilImages;


import java.util.UUID;

public interface ProfilImageRepository extends CassandraRepository<ProfilImages, UUID> {
    
}
