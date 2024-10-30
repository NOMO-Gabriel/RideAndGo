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
    
    @Column("startpointid")
    private UUID startPointId;

    @Column("endpointid")
    private UUID endPointId;

    @Column("driver")
    private UUID driver;

    @Column("traveller")
    private UUID traveller;

    @Column("date")
    private Instant date;

    @Column("travellerrating")
    private Double travellerRating;

    @Column("driverrating")
    private Double driverRating;

    @Column("numberofseats")
    private Double numberOfSeats;

    @Column("price")
    private Double price;
}
