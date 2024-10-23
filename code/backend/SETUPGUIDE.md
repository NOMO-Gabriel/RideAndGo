
# RideAndGo Project Setup Guide

## Prerequisites
- JDK 21
- Maven
- Cassandra 5

## Configuring the Database

### 1. Run Cassandra Server with Docker
To run Cassandra, use the following command:

```bash
docker run --name cassandra-container -d -p 9042:9042 cassandra:latest
```

### 2. Verify Your Configuration
Ensure the Cassandra container is running by executing:

```bash
sudo docker ps
```

### 3. Run `cqlsh` to Use Cassandra
To access the Cassandra command line interface, execute:

```bash
docker exec -it cassandra-container cqlsh
```

### 4. Create the Keyspace for the Database in Cassandra
Once in `cqlsh`, create a keyspace with the following commands:

```sql
CREATE KEYSPACE rideandgo WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE rideandgo;
```

### 5. Verify the Keyspace
To ensure the keyspace was created, execute:

```sql
DESCRIBE KEYSPACES;
```

## Running the Project
To run the project, navigate to the project directory and execute:

### Install Dependencies
```bash
mvn clean install
```

### Run the Project
```bash
mvn spring-boot:run
```

### Test the Connectivity with the Database
To run the connectivity tests, use:

```bash
mvn test
```

## Database Configuration
Don't forget to check and adjust the database configuration file located at `src/main/resources/application.yml`. Here’s the content you should have:

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
- Ensure the IP address `172.18.0.2` corresponds to your Cassandra container. If you're using Docker, you can verify it by running `docker inspect cassandra-container`.
- If the configuration file is not correctly adjusted, it may lead to errors when connecting to the database.

With these steps, you should be able to set up the project and check the connectivity to the Cassandra database. If you encounter any issues, feel free to ask for help.