
# Commandes Cassandra avec CQLSH

## 1. Keyspaces

Les **keyspaces** sont des conteneurs logiques pour les tables dans Cassandra.

- **Lister les keyspaces existants :**
  ```sql
  DESCRIBE KEYSPACES;
  ```

- **Créer un keyspace :**
  ```sql
  CREATE KEYSPACE my_keyspace WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 3
  };
  ```

- **Utiliser un keyspace :**
  ```sql
  USE my_keyspace;
  ```

- **Supprimer un keyspace :**
  ```sql
  DROP KEYSPACE my_keyspace;
  ```

---

## 2. Tables

Les **tables** sont utilisées pour stocker les données dans un keyspace.

- **Lister les tables dans un keyspace :**
  ```sql
  DESCRIBE TABLES;
  ```

- **Créer une table :**
  ```sql
  CREATE TABLE users (
    id UUID PRIMARY KEY,
    name TEXT,
    email TEXT,
    age INT
  );
  ```

- **Afficher la structure d'une table :**
  ```sql
  DESCRIBE TABLE users;
  ```

- **Supprimer une table :**
  ```sql
  DROP TABLE users;
  ```

---

## 3. Insertion de Données

- **Insérer une ligne dans une table :**
  ```sql
  INSERT INTO users (id, name, email, age)
  VALUES (uuid(), 'Alice', 'alice@example.com', 30);
  ```

- **Insérer plusieurs lignes :**
  ```sql
  INSERT INTO users (id, name, email, age)
  VALUES (uuid(), 'Bob', 'bob@example.com', 25);
  INSERT INTO users (id, name, email, age)
  VALUES (uuid(), 'Charlie', 'charlie@example.com', 35);
  ```

---

## 4. Sélection de Données

- **Sélectionner toutes les lignes d'une table :**
  ```sql
  SELECT * FROM users;
  ```

- **Sélectionner des colonnes spécifiques :**
  ```sql
  SELECT name, email FROM users;
  ```

- **Filtrer avec une clause WHERE :**
  ```sql
  SELECT * FROM users WHERE age > 25;
  ```

- **Limiter le nombre de résultats :**
  ```sql
  SELECT * FROM users LIMIT 2;
  ```

---

## 5. Mise à jour de Données

- **Mettre à jour une ligne :**
  ```sql
  UPDATE users SET age = 31 WHERE id = <uuid>;
  ```

- **Mettre à jour plusieurs colonnes :**
  ```sql
  UPDATE users SET name = 'Alice Smith', email = 'alice.smith@example.com' WHERE id = <uuid>;
  ```

---

## 6. Suppression de Données

- **Supprimer une ligne :**
  ```sql
  DELETE FROM users WHERE id = <uuid>;
  ```

- **Supprimer une colonne spécifique d'une ligne :**
  ```sql
  DELETE email FROM users WHERE id = <uuid>;
  ```

---

## 7. Gestion des Index

- **Créer un index sur une colonne :**
  ```sql
  CREATE INDEX ON users (email);
  ```

- **Supprimer un index :**
  ```sql
  DROP INDEX users_email_idx;
  ```

---

## 8. Gestion des Collections (Set, List, Map)

- **Créer une table avec des collections :**
  ```sql
  CREATE TABLE user_profiles (
    id UUID PRIMARY KEY,
    skills SET<TEXT>,
    friends LIST<TEXT>,
    attributes MAP<TEXT, TEXT>
  );
  ```

- **Ajouter un élément à un set :**
  ```sql
  UPDATE user_profiles SET skills = skills + {'Python'} WHERE id = <uuid>;
  ```

- **Ajouter un élément à une liste :**
  ```sql
  UPDATE user_profiles SET friends = friends + ['Bob'] WHERE id = <uuid>;
  ```

- **Ajouter une clé-valeur à une map :**
  ```sql
  UPDATE user_profiles SET attributes['hobby'] = 'Photography' WHERE id = <uuid>;
  ```

---

## 9. Gestion des UDT (User Defined Types)

- **Créer un type défini par l'utilisateur :**
  ```sql
  CREATE TYPE address (
    street TEXT,
    city TEXT,
    zip INT
  );
  ```

- **Utiliser un UDT dans une table :**
  ```sql
  CREATE TABLE user_addresses (
    id UUID PRIMARY KEY,
    address FROZEN<address>
  );
  ```

- **Insérer un UDT :**
  ```sql
  INSERT INTO user_addresses (id, address)
  VALUES (uuid(), {street: '123 Main St', city: 'Metropolis', zip: 12345});
  ```

---

## 10. Gestion des Permissions

- **Donner des permissions à un utilisateur :**
  ```sql
  GRANT SELECT ON users TO my_user;
  ```

- **Révoquer des permissions :**
  ```sql
  REVOKE SELECT ON users FROM my_user;
  ```

---

## 11. Sauvegarde et Restauration

- **Sauvegarder un keyspace :**
  ```bash
  nodetool snapshot my_keyspace
  ```

- **Restaurer à partir d'un snapshot :**
  ```bash
  nodetool refresh -- my_keyspace <table_name>
  ```

---

## 12. Sortie de CQLSH

- **Quitter cqlsh :**
  ```
  EXIT;
  ```

