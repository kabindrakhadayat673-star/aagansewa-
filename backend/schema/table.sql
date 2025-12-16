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