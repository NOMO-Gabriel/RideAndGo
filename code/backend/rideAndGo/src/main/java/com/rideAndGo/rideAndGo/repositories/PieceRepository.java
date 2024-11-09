package com.rideAndGo.rideAndGo.repositories;

import com.rideAndGo.rideAndGo.models.Piece;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.List;
import java.util.Optional;

@Repository
public interface PieceRepository extends CassandraRepository<Piece, UUID> {
    Optional<Piece> findByName(String name);
    Optional <Piece> findByOwnerId(UUID ownerId);


}
