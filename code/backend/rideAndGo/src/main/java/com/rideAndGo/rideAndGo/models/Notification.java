package com.rideAndGo.rideAndGo.models;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;

@Data
@Table("notification")
public class Notification {

    @Id
    private UUID id;

    @Column("state")
    private String state;

    @Column("isdeleted")
    private boolean isDeleted;

    @Column("title")
    private String title;

    @Column("message")
    private String message;

    @Column("date")
    private Instant date;

    @Column("receiver")
    private UUID receiver;
}
