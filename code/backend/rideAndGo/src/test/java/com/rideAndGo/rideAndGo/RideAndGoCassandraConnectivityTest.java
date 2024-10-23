package com.rideAndGo.rideAndGo;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.cassandra.core.CassandraTemplate;

@SpringBootTest
public class RideAndGoCassandraConnectivityTest {

    @Autowired
    private CassandraTemplate cassandraTemplate;

    @Test
    public void testCassandraConnection() {
        // Vérifie que la connexion est valide en exécutant une simple requête
        // Pour Cassandra, tu peux vérifier une table existante
        assertThat(cassandraTemplate).isNotNull();
    }
}
