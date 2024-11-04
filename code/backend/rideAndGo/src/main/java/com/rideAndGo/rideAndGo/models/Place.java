package com.rideAndGo.rideAndGo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Data
@Table("place")
public class Place {

    @PrimaryKey
    private UUID id;

    @Column("osmId")
    private Long osmId;

    @Column("name")
    private String name;

    @Column("latitude")
    private Double latitude;

    @Column("longitude")
    private Double longitude;

    @Column("way")
    private String way;

    @Column("description")
    private String description;

    // Lombok @Data will take care of getters, setters, toString, equals, and hashCode
}
