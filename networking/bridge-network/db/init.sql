DROP TABLE IF EXISTS addresses;

CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255)
);

-- Sample data

INSERT INTO addresses (first_name, last_name, email, phone)
VALUES ('John', 'Doe', 'john@example.com', '555-555-5555');

INSERT INTO addresses (first_name, last_name, email, phone)
VALUES ('Jane', 'Doe', 'jane@example.com', '555-555-5557');

INSERT INTO addresses (first_name, last_name, email, phone)
VALUES ('Susan', 'Smith', 'susan@example.com', '555-555-5558');

INSERT INTO addresses (first_name, last_name, email, phone)
VALUES ('Bob', 'Smith', 'bob@example.com', '555-555-5559');

