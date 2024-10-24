-- Création du keyspace (base de données) si elle n'existe pas déjà
CREATE KEYSPACE IF NOT EXISTS rideandgo
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

-- Sélection du keyspace
USE rideandgo;

-- Table User
CREATE TABLE IF NOT EXISTS user (
    id UUID PRIMARY KEY,
    name TEXT,
    surname TEXT,
    pseudo TEXT,
    birthDate DATE,
    password TEXT,
    phoneNumber DOUBLE,
    email TEXT,
    isOnline BOOLEAN,
    updatedAt TIMESTAMP,
    createdAt TIMESTAMP,
    averageRating FLOAT,
    roles LIST<TEXT>,  -- traveller, driver, admin
    myComplaints LIST<UUID>,
    myPlace LIST<UUID>,
    myItineraries LIST<UUID>,
    myTravels LIST<UUID>,
    mySuscription UUID,
    vehicle UUID,
    piece LIST<UUID>,
    picture LIST<UUID>,
    avatar LIST<UUID>
);

-- Table Notification
CREATE TABLE IF NOT EXISTS notification (
    id UUID PRIMARY KEY,
    state TEXT,
    isDeleted BOOLEAN,
    title TEXT,
    message TEXT,
    date TIMESTAMP,
    receiver MAP<TEXT, INT>
);

-- Table Alert
CREATE TABLE IF NOT EXISTS alert (
    id UUID PRIMARY KEY,
    state TEXT,
    isDeleted BOOLEAN,
    title TEXT,
    message TEXT,
    date TIMESTAMP,
    receiver MAP<TEXT, INT>,
    sender UUID  -- admin id
);

-- Table Preference
CREATE TABLE IF NOT EXISTS preference (
    id UUID PRIMARY KEY,
    language TEXT,
    theme TEXT,
    timeZone INT,
    isLocalisable BOOLEAN
);

-- Table Complaint
CREATE TABLE IF NOT EXISTS complaint (
    id UUID PRIMARY KEY,
    state TEXT,
    isDeleted BOOLEAN,
    title TEXT,
    message TEXT,
    date TIMESTAMP,
    receiver MAP<TEXT, INT>,
    sender MAP<TEXT, INT>
);

-- Table Place
CREATE TABLE IF NOT EXISTS place (
    id UUID PRIMARY KEY,
    mapName TEXT,
    currentName TEXT,
    description TEXT
);

-- Table Itinerary
CREATE TABLE IF NOT EXISTS itinerary (
    id UUID PRIMARY KEY,
    description TEXT,
    startPoint UUID,
    endPoint UUID,
    owner MAP<TEXT, INT>
);

-- Table Travel
CREATE TABLE IF NOT EXISTS travel (
    id UUID PRIMARY KEY,
    startPoint TEXT,
    endPoint TEXT,
    driver UUID,  -- driver id
    traveller LIST<UUID>,  -- list of traveller ids
    date TIMESTAMP,
    travellerRating UUID,
    driverRating UUID
);

-- Table Subscription
CREATE TABLE IF NOT EXISTS subscription (
    id UUID PRIMARY KEY,
    label TEXT,
    prix DOUBLE,
    features LIST<TEXT>,
    description TEXT
);

-- Table Vehicle
CREATE TABLE IF NOT EXISTS vehicle (
    id UUID PRIMARY KEY,
    color TEXT,
    imatriculationNumber INT,
    owners LIST<UUID>
);

-- Table Testimony
CREATE TABLE IF NOT EXISTS testimony (
    id UUID PRIMARY KEY,
    user MAP<TEXT, INT>,  -- user details
    message LIST<TEXT>,
    response TEXT,
    subject TEXT,
    content TEXT,
    question UUID
);

-- Table Question
CREATE TABLE IF NOT EXISTS question (
    id UUID PRIMARY KEY,
    subject TEXT,
    content TEXT,
    responses LIST<UUID>
);

-- Table Rating
CREATE TABLE IF NOT EXISTS rating (
    id UUID PRIMARY KEY,
    score FLOAT,
    comment TEXT
);

CREATE INDEX IF NOT EXISTS user_pseudo_idx ON user (pseudo);
CREATE INDEX IF NOT EXISTS user_email_idx ON user (email);
CREATE INDEX IF NOT EXISTS user_phonenumber_idx ON user (phoneNumber);
