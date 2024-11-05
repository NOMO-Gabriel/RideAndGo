package com.rideAndGo.rideAndGo.models;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Table("userPlace")
public class UserPlace {

    @Id
    private UUID id;

    @Column("userId")
    private UUID userId;

    @Column("osmId")
    private long osmId;

    @Column("name")
    private String name;

    @Column("latitude")
    private double latitude;

    @Column("longitude")
    private double longitude;

    @Column("way")
    private String way;

    @Column("description")
    private String description;

    // Getters and Setters
}
