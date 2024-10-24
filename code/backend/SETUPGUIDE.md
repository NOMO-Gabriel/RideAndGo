# **Project Setup Guide for RideAndGo**

## **Prerequisites**  
- **JDK 21**  
- **Maven**  
- **Docker**  
- **Cassandra**: Installed in a Docker container.  
  ➔ For more information, refer to the [official documentation](https://cassandra.apache.org/_/quickstart.html).

---

## **Database Configuration**

### **1. Start Cassandra with Docker**  
Run the following command to start Cassandra in a Docker container:  
```bash
docker run --name cassandra-container -d -p 9042:9042 cassandra:latest
```

---

### **2. Verify the Docker Container**  
Ensure the container is running by executing:  
```bash
sudo docker ps
```

---

### **3. Create the Database from a Script**

#### **Step 1: Navigate to the Script Directory**
```bash
cd RideAndGo/code/backend/rideAndGo/src/main/resources
```

#### **Step 2: Copy the Script to the Docker Container**
```bash
sudo docker cp schema_creation.cql cassandra-container:/data.cql
```
**Note:**  
If **cassandra-container** is not found, run:  
```bash
docker ps
```
Copy the **container ID** and replace **cassandra-container** with this ID in the above command.

#### **Step 3: Run the Script inside the Container**
```bash
docker exec -it cassandra-container cqlsh -f /data.cql
```

---

### **4. Access the Cassandra CQL Interface**  
To open `cqlsh`, execute:  
```bash
docker exec -it cassandra-container cqlsh
```

---

### **5. Verify the Keyspace and Tables**

#### **Step 1: List Available Keyspaces**
```sql
DESCRIBE KEYSPACES;
```

#### **Step 2: Select the `rideandgo` Keyspace**
```sql
USE rideandgo;
```

#### **Step 3: Describe Existing Tables**
```sql
DESCRIBE tables;
```

---

### **6. Configure Cassandra URL**  

#### **Step 1: Get the Container's IP Address**
```bash
sudo docker ps
```
**Note the container’s IP address** (e.g., `172.18.0.2` or `0.0.0.0`).

#### **Step 2: Update the `application.yml` Configuration File**  
Open the **`src/main/resources/application.yml`** file and update the **cassandraUrl** property in the **myApp** object with the container’s IP address.

---

## **Running the Project**

### **1. Install Dependencies**  
Navigate to the **backend/rideAndGo** directory and run:  
```bash
mvn clean install
```

---

### **2. Run the Spring Boot Application**  
From the **backend/rideAndGo** directory, execute:  
```bash
mvn spring-boot:run
```

---

### **3. Test Database Connectivity**  
Run the following command to execute tests:  
```bash
mvn test
```

---

## **Important Notes**  
- **Verify the Cassandra Container's IP Address**:  
  Ensure that the IP address **172.18.0.2** matches the container’s IP. Use the following command to inspect the container:  
  ```bash
  docker inspect cassandra-container
  ```

- **Incorrect Configuration**:  
  If the application fails to connect to the database, ensure that the Cassandra URL in **`application.yml`** is correctly set.

---

By following these steps, you should be able to configure, run, and test the **RideAndGo** project successfully. If you encounter any issues, feel free to ask for assistance.