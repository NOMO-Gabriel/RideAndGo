package com.rideAndGo.rideAndGo.services;

import com.rideAndGo.rideAndGo.models.Piece;
import com.rideAndGo.rideAndGo.repositories.PieceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PieceService {

    @Autowired
    private PieceRepository pieceRepository;

    public Iterable<Piece> getAllPieces() {
        return pieceRepository.findAll();
    }

    public Optional<Piece> getPieceById(UUID id) {
        return pieceRepository.findById(id);
    }

    public Iterable<Piece> getPiecesByOwnerId(UUID ownerId) {
        return pieceRepository.findByOwnerId(ownerId);
    }

    public Piece createPiece(Piece piece) {
        piece.setId(UUID.randomUUID());
        return pieceRepository.save(piece);
    }

    public Piece updatePiece(UUID id, Piece updatedPiece) {
        updatedPiece.setId(id);
        return pieceRepository.save(updatedPiece);
    }

    public void deletePiece(UUID id) {
        pieceRepository.deleteById(id);
    }
}
