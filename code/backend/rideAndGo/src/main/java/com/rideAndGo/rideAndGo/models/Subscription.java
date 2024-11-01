package com.rideAndGo.rideAndGo.models;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;


import java.util.List;
import java.util.UUID;

@Data
@Table("subscription") 
public class Subscription {
    @Id
    private UUID id;

    @Column
    private String label;

    @Column
    private Double number;

    @Column
    private String description;

    @Column
    private List<String> features;
}
