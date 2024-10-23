package com.rideAndGo.rideAndGo;

import com.datastax.oss.driver.api.core.CqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.net.InetSocketAddress;

@SpringBootTest
class RideAndGoApplicationTests {

    @Test
    void contextLoads() {
        // Message pour indiquer le début du test
		System.out.println("-----------------------------------------------------------------------" );
		System.out.println("-----------------------------------------------------------------------" );

        System.out.println("------------------------------- Running connectivity test...------------" );
		System.out.println("-----------------------------------------------------------------------" );
		System.out.println("-----------------------------------------------------------------------" );

        // Vérifiez la connectivité Cassandra
        boolean isConnected = testCassandraConnection();

        // Assertion pour vérifier la connectivité
        assertTrue(isConnected, "Connectivity test failed!");
		
		System.out.println("-----------------------------------------------------------------------" );
		System.out.println("-----------------------------------------------------------------------" );
        // Message pour indiquer le statut du test
        if (isConnected) {
            System.out.println("Test Status: SUCCESS");
        } else {
            System.out.println("Test Status: FAILURE");
        }

		System.out.println("-----------------------------------------------------------------------" );
		System.out.println("-----------------------------------------------------------------------" );
    }

    private boolean testCassandraConnection() {
    try (CqlSession session = CqlSession.builder()
            .addContactPoint(new InetSocketAddress("0.0.0.0", 9042)) // Adresse IP et port
            .withLocalDatacenter("datacenter1") // Assurez-vous que cela correspond à votre configuration
            .build()) {
        return session.getMetadata().getKeyspaces().size() > 0; // Vérifie si au moins un keyspace existe
    } catch (Exception e) {
        System.err.println("Cassandra connection test failed: " + e.getMessage());
        return false;
    }
}

}
