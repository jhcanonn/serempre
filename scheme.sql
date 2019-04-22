# Se crea la Base de Datos
CREATE DATABASE IF NOT EXISTS serempre;

# Se crean las tablas:

# Tabla de Usuarios
CREATE TABLE IF NOT EXISTS serempre.users (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL,
	PRIMARY KEY (id)
);

# Tabla de Ciudades
CREATE TABLE IF NOT EXISTS serempre.cities (
	id INT NOT NULL AUTO_INCREMENT,
	code INT NOT NULL,
	name VARCHAR(255) NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL,
	PRIMARY KEY (id)
);

# Tabla de Clientes
CREATE TABLE IF NOT EXISTS serempre.clients (
	id INT NOT NULL AUTO_INCREMENT,
	code INT NOT NULL,
	name VARCHAR(255) NOT NULL,
	user_id INT NOT NULL,
	city_id INT NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (city_id) REFERENCES cities(id)
);