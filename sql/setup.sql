-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS rangers;
DROP TABLE IF EXISTS druids;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS aliens;
DROP TABLE IF EXISTS paints;



CREATE TABLE rangers (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	gender VARCHAR(50),
	familiar VARCHAR(50)
    );

CREATE TABLE druids (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	gender VARCHAR(50)
);

CREATE TABLE cars (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	make VARCHAR(50),
	model VARCHAR(50),
	year VARCHAR(50),
	vin VARCHAR(50)
);

CREATE TABLE aliens (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(50),
	first_contact DATE,
	hostile VARCHAR(50)
); 

CREATE TABLE paints (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	hex VARCHAR(50),
	looks_like VARCHAR(50),
	smells_like VARCHAR(50)
);



INSERT INTO rangers (
    first_name, 
    last_name, 
    gender, 
    familiar
)
VALUES 
('Liv', 'Onagraceae', 'Female', 'Roseat flamingo'),
('Joshia', 'Solanaceae', 'Male', 'Indian leopard'),
('Elfie', 'Lichinaceae', 'Genderqueer', 'Cardinal, red-capped'),
('Margy', 'Hydrocharitaceae', 'Female', 'Fox, crab-eating'),
('Ted', 'Solanaceae', 'Male', 'Porcupine, tree')
;


INSERT INTO druids (
    first_name, 
    last_name, 
    gender
)
VALUES
('Melanelia Lichen', 'Parmeliaceae', 'Male'),
('Didier''s Tulip', 'Liliaceae', 'Agender'),
('Flowers'' Rim Lichen', 'Lecanoraceae', 'Female'),
('Big Blackberry', 'Rosaceae', 'Female'),
('Broadleaved Pepperweed', 'Brassicaceae', 'Male')
;


INSERT INTO cars (
    make, 
    model, 
    year, 
    vin
)
VALUES
('GMC', 'Rally Wagon 1500', 1992, 'WAUDH48H47K452914'),
('BMW', '1 Series', 2011, '2G4WB55K211248859'),
('BMW', '1 Series', 2011, '2G4WB55K211248859'),
('Subaru', 'Leone', 1986, 'WBAYM1C51ED602343'),
('Cadillac', 'DeVille', 2004, 'WDDGF4HB9CA019273')
;


INSERT INTO aliens (
name, 
first_contact, 
hostile
)
VALUES
('Wrapsafe', '2/2/2022', false),
('Tampflex', '1/31/2022', true),
('Sub-Ex', '11/2/2022', true),
('Aerified', '9/14/2022', true),
('Tempsoft', '6/22/2022', false)
;


INSERT INTO paints (
    hex, 
    looks_like, 
    smells_like
)
VALUES
('#df9d1e', 'Goldenrod', 'Bandarlampung'),
('#14439a', 'Aquamarine', 'Shūkat aş Şūfī'),
('#3b5510', 'Red', 'Saint George''s'),
('#c66324', 'Pink', 'Nunsena'),
('#4ea40b', 'Fuscia', 'La Guadalupe')
;
