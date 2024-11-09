package com.rideAndGo.rideAndGo.controllers;

import com.rideAndGo.rideAndGo.models.Piece;
import com.rideAndGo.rideAndGo.models.User;
import com.rideAndGo.rideAndGo.repositories.PieceRepository;
import com.rideAndGo.rideAndGo.repositories.UserRepository;
import com.rideAndGo.rideAndGo.services.PieceService;
import com.rideAndGo.rideAndGo.dto.AuthResponse;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.Instant;
import java.io.ByteArrayOutputStream;
import java.util.zip.DataFormatException;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/pieces")
public class PieceController {

    @Autowired
    private PieceRepository pieceRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/upload-profile-picture/{ownerId}")
    public ResponseEntity<String> uploadPiece(@RequestParam ("pieceFile") MultipartFile file, @PathVariable("ownerId") UUID ownerId) throws IOException {
        if(ownerId ==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID is required");
        }

        Piece piece = new Piece();
        piece.setName(file.getOriginalFilename());
        piece.setType(file.getContentType());
        piece.setPicByte(compressBytes(file.getBytes()));
        piece.setOwnerId(ownerId);
        piece.setUploadDate(Instant.now());

        Piece savedPiece = pieceRepository.save(piece);

        Optional<User> userOptional = userRepository.findById(ownerId);
        if(userOptional.isPresent()){
            User user = userOptional.get();
            user.setPictureId(savedPiece.getId());
            userRepository.save(user);
            return ResponseEntity.ok("Profile picture uploaded succesfully");
            
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
        
    }

    

    @GetMapping("/get/{pieceName}")
    public Piece getPiece(@PathVariable("pieceName") String pieceName) {
        Optional <Piece> retrievedPiece =pieceRepository.findByName(pieceName);
        if(retrievedPiece.isPresent()) {
            Piece piece = new Piece();
            piece.setName(retrievedPiece.get().getName());
            piece.setType(retrievedPiece.get().getType());
            piece.setPicByte(decompressBytes(retrievedPiece.get().getPicByte()));
            piece.setOwnerId(retrievedPiece.get().getOwnerId());
            piece.setUploadDate(retrievedPiece.get().getUploadDate());
            return piece;
        }
        return null;
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePiece(@PathVariable UUID id){
        if(pieceRepository.existsById(id)){
            pieceRepository.deleteById(id);
            return ResponseEntity.ok("Piece deleted successfully");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Piece not found");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updatePiece(@PathVariable UUID id, @RequestParam ("pieceFile") MultipartFile file) throws IOException {
       Optional <Piece> existingPiece = pieceRepository.findById(id);
       if(existingPiece.isPresent()){
            Piece piece = existingPiece.get();
            piece.setName(file.getOriginalFilename());
            piece.setType(file.getContentType());
            piece.setPicByte(compressBytes(file.getBytes()));
            piece.setUploadDate(Instant.now());

            pieceRepository.save(piece);

            return ResponseEntity.ok("Piece updated succesfully");
       }else{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Piece not found");
       }
        
    }

    // compress the data bytes before storing it in cassandra

    private static byte[] compressBytes(byte[] data){
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte [1024];
        while(!deflater.finished()){
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);

        }
        try{
            outputStream.close();
        }catch(IOException e){

        }
        System.out.println("Compressed Image Byte Size -" + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    // uncompress the data bytes before returning it to the client

    private static byte[] decompressBytes(byte[] data){
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
       
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
    

    // @GetMapping
    // public ResponseEntity<Iterable<Piece>> getAllPieces() {
    //     return new ResponseEntity<>(pieceService.getAllPieces(), HttpStatus.OK);
    // }

    // @GetMapping("/{id}")
    // public ResponseEntity<?> getPieceById(@PathVariable UUID id) {
    //     Optional<Piece> piece = pieceService.getPieceById(id);
    //     if (!piece.isPresent()) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse("Piece not found "));
    //     }
    //     return ResponseEntity.ok(piece.get());
    // }

    // @GetMapping("/user/{ownerId}")
    // public ResponseEntity<Iterable<Piece>> getPiecesByOwnerId(@PathVariable UUID ownerId) {
    //     return new ResponseEntity<>(pieceService.getPiecesByOwnerId(ownerId), HttpStatus.OK);
    // }

    // @PostMapping
    // public ResponseEntity<Object> createPiece(@RequestBody Piece piece) {
    //     Piece savedPiece = pieceService.createPiece(piece);
    //     return new ResponseEntity<>(savedPiece, HttpStatus.CREATED);
    // }

    // @PutMapping("/{id}")
    // public ResponseEntity<Object> updatePiece(@PathVariable UUID id, @RequestBody Piece piece) {
    //     return new ResponseEntity<>(pieceService.updatePiece(id, piece), HttpStatus.OK);
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<String> deletePiece(@PathVariable UUID id) {
    //     pieceService.deletePiece(id);
    //     return new ResponseEntity<>("Piece deleted successfully", HttpStatus.OK);
    // }
}
