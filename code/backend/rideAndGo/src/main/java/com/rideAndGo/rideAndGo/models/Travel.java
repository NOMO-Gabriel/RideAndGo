package com.rideAndGo.rideAndGo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;

import java.time.Instant;
import java.util.UUID;

@Data
@Table("travel")
public class Travel {
    @Id
    private UUID id;

    @Column("startPointId")
    private UUID startPointId;

    @Column("endPointId")
    private UUID endPointId;

    @Column("driver")
    private UUID driver;

    @Column("traveller")
    private UUID traveller;

    @Column("date")
    private Instant date;

    @Column("travellerRating")
    private Double travellerRating;

    @Column("driverRating")
    private Double driverRating;

    @Column("numberOfSeats")
    private Double numberOfSeats;

    @Column("price")
    private Double price;
}
