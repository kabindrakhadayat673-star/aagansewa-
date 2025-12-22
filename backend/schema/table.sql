INSERT INTO users (email, password, role)
VALUES (
    'admin12@gmail.com',
    '$2a$12$SEE8pOr.vKZX/cPeTpxdZuGTlGyIX3QHxpAP7ANEYzlK4XHXgaDAC', 
    'admin'
    
);





CREATE TABLE province (
    province_id INT AUTO_INCREMENT PRIMARY KEY,
    province_name VARCHAR(100) NOT NULL
);
CREATE TABLE district (
    district_id INT AUTO_INCREMENT PRIMARY KEY,
    district_name VARCHAR(100) NOT NULL,
    province_id INT NOT NULL,
    FOREIGN KEY (province_id) REFERENCES province(province_id)
);
CREATE TABLE branch(
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL UNIQUE,
    district_id INT NOT NULL,
    remarks VARCHAR(255) NULL,
    FOREIGN KEY (district_id) REFRENCES district(district_id)
)
CREATE TABLE services(
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(150),
    description varchar(255),
    service_image varchar(255)
    branch_id INT,
    FOREIGN KEY (branch_id)
      REFERENCES branch(branch_id) 
);
CREATE TABLE review(
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    star INT NULL,
    description TEXT NOT NULL,
    branch_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
)
CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role ENUM('staff') NOT NULL DEFAULT 'staff',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    service_id INT NOT NULL,
    branch_id INT NOT NULL,
    
  FOREIGN KEY (service_id) REFERENCES services(service_id)
 FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
        
);
CREATE TABLE gallery (
    gallery_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    gallery_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    branch_id INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (branch_id)
        REFERENCES branch(branch_id),
     
        
);
create table trusted_costumer (
    costumer_id int AUTO_INCREMENT primary key,
    name varchar(255) null,
    image text

);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'branch_manager') NOT NULL DEFAULT 'branch_manager',
     branch_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
)





