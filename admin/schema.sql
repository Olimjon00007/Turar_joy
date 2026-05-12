-- Kvartira Project - MySQL Schema

CREATE DATABASE IF NOT EXISTS kvartira_db;
USE kvartira_db;

-- 1. Users Table (Owner and Admins)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('owner', 'admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Estates Table (Property Listings)
CREATE TABLE IF NOT EXISTS estates (
    id VARCHAR(50) PRIMARY KEY, -- Using Date.now() string as ID for compatibility
    type ENUM('sotish', 'ijara') NOT NULL,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    rooms INT NOT NULL,
    bathrooms INT DEFAULT 1,
    area DECIMAL(10, 2) NOT NULL,
    floor INT NOT NULL,
    region VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(255),
    street VARCHAR(255),
    description TEXT,
    main_image LONGTEXT, -- Storing Base64 for now as per current frontend logic
    all_images JSON, -- Storing array of Base64 strings
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'approved',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Initial Owner Account
-- Password 'owner123' (In production, this must be hashed)
INSERT INTO users (username, password, role) VALUES ('owner', 'owner123', 'owner');
