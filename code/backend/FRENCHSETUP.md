# **Guide de configuration du projet RideAndGo**

## **Prérequis**  
- **JDK 21**  
- **Maven**  
- **Docker**  
- **Cassandra** : Installé dans un conteneur Docker.  
  ➔ Pour plus d'informations, consultez la [documentation officielle](https://cassandra.apache.org/_/quickstart.html).

---

## **Configuration de la base de données**

### **1. Lancer Cassandra avec Docker**  
Exécutez la commande suivante pour démarrer Cassandra dans un conteneur Docker :  
```bash
docker run --name cassandra-container -d -p 9042:9042 cassandra:latest
```

---

### **2. Vérifier le conteneur Docker**  
Assurez-vous que le conteneur fonctionne avec :  
```bash
sudo docker ps
```

---

### **3. Créer la base de données à partir d’un script**

#### **Étape 1 : Accéder au répertoire contenant le script**
```bash
cd RideAndGo/code/backend/rideAndGo/src/main/resources
```

#### **Étape 2 : Copier le script dans le conteneur Docker**
```bash
sudo docker cp schema_creation.cql cassandra-container:/data.cql

```
**Remarque :**  
Si **cassandra-container** n’est pas trouvé, exécutez :  
```bash
docker ps
```
Notez l’ID du conteneur et remplacez **cassandra-container** par cet ID dans la commande précédente.

#### **Étape 3 : Exécuter le script dans le conteneur**
```bash
 
```

---

### **4. Accéder à l’interface CQL de Cassandra**  
Lancez `cqlsh` avec la commande suivante :  
```bash
docker exec -it cassandra-container cqlsh
```

---

### **5. Vérifier la création du keyspace et des tables**

#### **Étape 1 : Vérifiez les keyspaces disponibles**
```sql
DESCRIBE KEYSPACES;
```

#### **Étape 2 : Sélectionner le keyspace `rideandgo`**
```sql
USE rideandgo;
```

#### **Étape 3 : Décrire les tables existantes**
```sql
DESCRIBE tables;
```

---

### **6. Configuration de l’URL de Cassandra**  

#### **Étape 1 : Obtenir l’adresse IP du conteneur Docker**
```bash
sudo docker ps
```
**Notez l’adresse IP du conteneur** (par exemple, `172.18.0.2` ou `0.0.0.0`).

#### **Étape 2 : Modifier le fichier `application.yml`**  
Ouvrez le fichier **`src/main/resources/application.yml`** et mettez à jour la propriété **cassandraUrl** dans l’objet **myApp** avec l’adresse IP du conteneur.

---

## **Lancer le projet**

### **1. Installer les dépendances**  
Naviguez vers le répertoire **backend/rideAndGo** et exécutez :  
```bash
mvn clean install
```

---

### **2. Lancer l’application Spring Boot**  
Dans le même répertoire **backend/rideAndGo**, exécutez :  
```bash
mvn spring-boot:run
```

---

### **3. Tester la connectivité avec la base de données**  
Lancez les tests avec la commande suivante :  
```bash
mvn test
```

---

## **Important**  
- **Vérifiez l'adresse IP du conteneur Cassandra** :  
  Assurez-vous que l’adresse **172.18.0.2** correspond bien à celle de votre conteneur. Utilisez la commande suivante pour inspecter l’adresse :  
  ```bash
  docker inspect cassandra-container
  ```

- **Configuration incorrecte** :  
  Si l'application ne parvient pas à se connecter à la base de données, vérifiez que l'URL de Cassandra dans **`application.yml`** est correctement configurée.

---

Avec ces étapes, vous êtes maintenant prêt à configurer, exécuter et tester le projet **RideAndGo**. Si vous rencontrez des problèmes, n'hésitez pas à demander de l’aide.