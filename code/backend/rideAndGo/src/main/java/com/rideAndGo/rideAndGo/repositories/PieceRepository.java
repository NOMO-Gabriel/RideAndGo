package com.rideAndGo.rideAndGo.repositories;

import com.rideAndGo.rideAndGo.models.Piece;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.List;

@Repository
public interface PieceRepository extends CassandraRepository<Piece, UUID> {

    List<Piece> findByOwnerId(UUID ownerId);

}
