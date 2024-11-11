package com.rideAndGo.rideAndGo.repositories;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.rideAndGo.rideAndGo.models.DriverDocuments;
import java.util.UUID;

public interface DriverDocumentsRepository  extends CassandraRepository< DriverDocuments, UUID>{
    
}
