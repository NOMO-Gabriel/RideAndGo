package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.models.Piece;
import com.rideAndGo.rideAndGo.services.PieceService;
import com.rideAndGo.rideAndGo.dto.AuthResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/pieces")
public class PieceController {

    @Autowired
    private PieceService pieceService;

    @GetMapping
    public ResponseEntity<Iterable<Piece>> getAllPieces() {
        return new ResponseEntity<>(pieceService.getAllPieces(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPieceById(@PathVariable UUID id) {
        Optional<Piece> piece = pieceService.getPieceById(id);
        if (!piece.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("Piece not found "));
        }
        return ResponseEntity.ok(piece.get());
    }

    @GetMapping("/user/{ownerId}")
    public ResponseEntity<Iterable<Piece>> getPiecesByOwnerId(@PathVariable UUID ownerId) {
        return new ResponseEntity<>(pieceService.getPiecesByOwnerId(ownerId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> createPiece(@RequestBody Piece piece) {
        Piece savedPiece = pieceService.createPiece(piece);
        return new ResponseEntity<>(savedPiece, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updatePiece(@PathVariable UUID id, @RequestBody Piece piece) {
        return new ResponseEntity<>(pieceService.updatePiece(id, piece), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePiece(@PathVariable UUID id) {
        pieceService.deletePiece(id);
        return new ResponseEntity<>("Piece deleted successfully", HttpStatus.OK);
    }
}
