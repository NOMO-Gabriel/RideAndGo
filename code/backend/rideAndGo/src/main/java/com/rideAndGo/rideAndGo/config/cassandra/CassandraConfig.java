package com.rideAndGo.rideAndGo.config.cassandra;

import com.datastax.oss.driver.api.core.CqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class CassandraConfig {

    @Autowired
    private CqlSession session;

    @PostConstruct
    public void init() {
        createSchema();
    }
    
    public void createSchema() {
        try {
        // Créer la table users
        session.execute("CREATE TABLE IF NOT EXISTS users (" +
                "id UUID PRIMARY KEY, " +
                "name TEXT, " +
                "surname TEXT, " +
                "pseudo TEXT, " +
                "birthDate TIMESTAMP, " +
                "password TEXT, " +
                "phoneNumber TEXT, " +
                "email TEXT UNIQUE, " +
                "preferences MAP<TEXT, TEXT>, " + // Utilisation de MAP pour stocker les préférences
                "notifications LIST<FROZEN<notification>>, " + // Liste des notifications
                "alertes LIST<FROZEN<alert>>, " + // Liste des alertes
                "isOnline BOOLEAN, " +
                "updatedAt TIMESTAMP, " +
                "createdAt TIMESTAMP, " +
                "averageRating FLOAT, " +
                "myComplaints LIST<FROZEN<complaint>>, " + // Liste des plaintes
                "myPlace LIST<FROZEN<place>>, " + // Liste des lieux
                "myItineraries LIST<FROZEN<itinerary>>, " + // Liste des itinéraires
                "myTravels LIST<FROZEN<travel>>, " + // Liste des voyages
                "mySubscription FROZEN<subscription>, " + // Abonnement de l'utilisateur
                "roles LIST<TEXT>, " + // Rôles de l'utilisateur
                "vehicle FROZEN<vehicle>, " + // Véhicule de l'utilisateur
                "piece LIST<BLOB>, " + // Liste des fichiers
                "picture LIST<BLOB>, " + // Liste des images
                "avatar LIST<BLOB>);"); // Liste des avatars

        // Créer la table notifications
        session.execute("CREATE TABLE IF NOT EXISTS notifications (" +
                "id UUID PRIMARY KEY, " +
                "state TEXT, " +
                "isDeleted BOOLEAN, " +
                "title TEXT, " +
                "message TEXT, " +
                "date TIMESTAMP, " +
                "receiver PSEUDO_ID_TYPE);"); // Remplacez PSEUDO_ID_TYPE par un type approprié

        // Créer la table alerts
        session.execute("CREATE TABLE IF NOT EXISTS alerts (" +
                "id UUID PRIMARY KEY, " +
                "state TEXT, " +
                "isDeleted BOOLEAN, " +
                "title TEXT, " +
                "message TEXT, " +
                "date TIMESTAMP, " +
                "receiver PSEUDO_ID_TYPE, " + // Remplacez PSEUDO_ID_TYPE par un type approprié
                "senderId UUID);");

        // Créer la table complaints
        session.execute("CREATE TABLE IF NOT EXISTS complaints (" +
                "id UUID PRIMARY KEY, " +
                "state TEXT, " +
                "isDeleted BOOLEAN, " +
                "title TEXT, " +
                "message TEXT, " +
                "date TIMESTAMP, " +
                "receiver PSEUDO_ID_TYPE, " + // Remplacez PSEUDO_ID_TYPE par un type approprié
                "sender PSEUDO_ID_TYPE);"); // Remplacez PSEUDO_ID_TYPE par un type approprié

        // Créer la table places
        session.execute("CREATE TABLE IF NOT EXISTS places (" +
                "id UUID PRIMARY KEY, " +
                "mapName TEXT, " +
                "currentName TEXT, " +
                "description TEXT);");

        // Créer la table itineraries
        session.execute("CREATE TABLE IF NOT EXISTS itineraries (" +
                "id UUID PRIMARY KEY, " +
                "description TEXT, " +
                "startPoint FROZEN<place>, " + // Point de départ
                "endPoint FROZEN<place>, " + // Point d'arrivée
                "owner PSEUDO_ID_TYPE);"); // Remplacez PSEUDO_ID_TYPE par un type approprié

        // Créer la table travels
        session.execute("CREATE TABLE IF NOT EXISTS travels (" +
                "id UUID PRIMARY KEY, " +
                "startPoint TEXT, " +
                "endPoint TEXT, " +
                "driver FROZEN<driver>, " + // Conducteur
                "travellerIds LIST<UUID>, " + // Liste des voyageurs
                "date TIMESTAMP, " +
                "travellerRating FROZEN<rating>, " + // Évaluation des voyageurs
                "driverRating FROZEN<rating>);"); // Évaluation du conducteur

        // Créer la table preferences
        session.execute("CREATE TABLE IF NOT EXISTS preferences (" +
                "id UUID PRIMARY KEY, " +
                "language TEXT, " +
                "theme TEXT, " +
                "timeZone INT, " +
                "isLocalisable BOOLEAN);");

        // Créer la table subscriptions
        session.execute("CREATE TABLE IF NOT EXISTS subscriptions (" +
                "id UUID PRIMARY KEY, " +
                "label TEXT, " +
                "prix FLOAT, " +
                "features LIST<TEXT>, " +
                "description TEXT);");

        // Créer la table vehicles
        session.execute("CREATE TABLE IF NOT EXISTS vehicles (" +
                "id UUID PRIMARY KEY, " +
                "color TEXT, " +
                "imatriculationNumber INT, " +
                "owners LIST<UUID>);");

       // Créer la table testimonies
        session.execute("CREATE TABLE IF NOT EXISTS testimonies (" +
        "id UUID PRIMARY KEY, " +
        "user MAP<TEXT, TEXT>, " + // Contient le pseudo et l'id de l'utilisateur
        "message LIST<TEXT>, " + // Liste de messages
        "subject TEXT, " + // Sujet du témoignage
        "content TEXT, " + // Contenu du témoignage
        "questionId UUID);"); // Référence à l'identifiant de la question associée

        // Créer la table responses
        session.execute("CREATE TABLE IF NOT EXISTS responses (" +
        "id UUID PRIMARY KEY, " +
        "testimonyId UUID, " + // Référence au témoignage auquel cette réponse appartient
        "content TEXT, " + // Contenu de la réponse
        "date TIMESTAMP);"); // Date de la réponse


        // Créer la table questions
        session.execute("CREATE TABLE IF NOT EXISTS questions (" +
                "id UUID PRIMARY KEY, " +
                "subject TEXT, " +
                "content TEXT, " +
                "responses LIST<FROZEN<response>>);"); // Liste des réponses
     } catch (Exception e) {
                System.err.println("Error creating schema: " + e.getMessage());
    }
    
}
}
