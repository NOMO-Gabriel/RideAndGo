
# Guide de configuration du projet RideAndGo

## Prérequis
- JDK 21
- Maven
- Cassandra 5

## Configuration de la base de données

### 1. Lancer le serveur Cassandra avec Docker
Pour exécuter Cassandra, utilisez la commande suivante :

```bash
docker run --name cassandra-container -d -p 9042:9042 cassandra:latest
```

### 2. Vérifier votre configuration
Assurez-vous que le conteneur Cassandra fonctionne en exécutant :

```bash
sudo docker ps
```

### 3. Lancer `cqlsh` pour utiliser Cassandra
Pour accéder à l'interface en ligne de commande de Cassandra, exécutez :

```bash
docker exec -it cassandra-container cqlsh
```

### 4. Créer le keyspace pour la base de données sur Cassandra
Une fois dans `cqlsh`, créez un keyspace avec les commandes suivantes :

```sql
CREATE KEYSPACE rideandgo WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE rideandgo;
```

### 5. Vérification du keyspace
Pour vous assurer que le keyspace a été créé, exécutez :

```sql
DESCRIBE KEYSPACES;
```

## Lancer le projet
Pour exécuter le projet, naviguez dans le répertoire du projet et exécutez :

### Installer les dépendances
```bash
mvn clean install
```

### Lancer le projet
```bash
mvn spring-boot:run
```

### Tester la connectivité avec la base de données
Pour exécuter les tests de connectivité, utilisez :

```bash
mvn test
```

## Configuration de la base de données
N'oubliez pas de vérifier et d'adapter le fichier de configuration de la base de données situé dans `src/main/resources/application.yml`. Voici le contenu que vous devez avoir :

```yaml
spring:
  data:
    cassandra:
      contact-points: 172.18.0.2
      port: 9042
      local-datacenter: datacenter1
      keyspace-name: rideandgo
      schema-action: create-if-not-exists
  profiles:
    active: dev
```

### Important
- Assurez-vous que l'adresse IP `172.18.0.2` correspond à celle de votre conteneur Cassandra. Si vous utilisez Docker, vous pouvez la vérifier en exécutant `docker inspect cassandra-container`.
- Si le fichier de configuration n'est pas correctement ajusté, cela peut entraîner des erreurs lors de la connexion à la base de données.

Avec ces étapes, vous devriez être en mesure de lancer le projet et de vérifier la connectivité à la base de données Cassandra. Si vous rencontrez des problèmes, n'hésitez pas à demander de l'aide.
