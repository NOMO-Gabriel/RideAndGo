package com.rideAndGo.rideAndGo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;

import java.util.Map;
import java.util.UUID;

@Data
@Table("itinerary")
public class Itinerary {
    @Id
    private UUID id;

    @Column("description")
    private String description;

    @Column("start_point")
    private UUID startPoint;

    @Column("end_point")
    private UUID endPoint;

    @Column("owner")
    private UUID owner;
}
