USE rideandgo;

CREATE TABLE IF NOT EXISTS place (
    id UUID PRIMARY KEY,
    osmId BIGINT,
    name TEXT,
    latitude DOUBLE,
    longitude DOUBLE,
    way TEXT,
    description TEXT
);
CREATE INDEX IF NOT EXISTS place_name_idx ON place (name);

-- Sample POI data insertion
INSERT INTO place (id, osmId, name, latitude, longitude, way, description) 
VALUES (uuid(), 1234567890, 'National Museum of Yaounde', 3.8480, 11.5021, 'Central way near City Hall', 'Museum showcasing Cameroon’s cultural artifacts');

INSERT INTO place (id, osmId, name, latitude, longitude, way, description) VALUES (uuid(), 1234567890, 'National Museum of Yaoundé', 3.8667, 11.5167, 'Tourist Attraction', 'A museum showcasing Cameroon’s cultural heritage.');
INSERT INTO place (id, osmId, name, latitude, longitude, way, description) VALUES (uuid(), 1234567891, 'Basilica of Mary Queen of the Apostles', 3.8543, 11.5022, 'Religious Site', 'A Catholic basilica and popular pilgrimage site.');
INSERT INTO place (id, osmId, name, latitude, longitude, way, description) VALUES (uuid(), 1234567892, 'Mfoundi Market', 3.8684, 11.5149, 'Market', 'One of the largest and most vibrant markets in Yaoundé.');

INSERT INTO place (id, osmId, name, latitude, longitude, way, description) VALUES (uuid(), 1234567893, 'Reunification Monument', 3.8612, 11.5184, 'Monument', 'A monument symbolizing the reunification of Cameroon.');
INSERT INTO place (id, osmId, name, latitude, longitude, way, description) VALUES (uuid(), 1234567894, 'Mount Fébé', 3.8962, 11.4727, 'Nature Site', 'A popular hiking spot with panoramic views of Yaoundé.');
INSERT INTO place (id, osmId, name, latitude, longitude, way, description) VALUES (uuid(), 1234567895, 'Cameroon National Museum', 3.8667, 11.5143, 'Museum', 'A museum located in the former presidential palace.');
INSERT INTO place (id, osmId, name, latitude, longitude, way, description) VALUES (uuid(), 1234567896, 'Yaoundé Central Mosque', 3.8710, 11.5159, 'Religious Site', 'One of the largest mosques in Yaoundé.');
INSERT INTO place (id, osmId, name, latitude, longitude, way, description) VALUES (uuid(), 1234567897, 'Mvog-Betsi Zoo', 3.8410, 11.4889, 'Zoo', 'Home to various species native to Cameroon’s forests.');
INSERT INTO place (id, osmId, name, latitude, longitude, way, description) VALUES (uuid(), 1234567898, 'Lac Municipal', 3.8711, 11.5112, 'Lake', 'A scenic lake within the heart of the city.');
INSERT INTO place (id, osmId, name, latitude, longitude, way, description) VALUES (uuid(), 1234567899, 'Cameroon Art Museum', 3.8705, 11.5119, 'Museum', 'Showcasing the art and culture of Cameroon.');
INSERT INTO place (id, osmId, name, latitude, longitude, way, description) VALUES (uuid(), 1234567900, 'Yaoundé Multipurpose Sports Complex', 3.8738, 11.5160, 'Sports Complex', 'A venue for major sports and cultural events.');