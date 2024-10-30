package com.rideAndGo.rideAndGo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;

import java.time.Instant;
import java.util.UUID;



@Data
@Table("place")
public class Place {
    @Id
    private UUID id;

    @Column("mapName")
    private String mapName;

    @Column("currentName")
    private String currentName;

    @Column("description")
    private String description;
}
