CREATE DATABASE typescript;

CREATE TABLE usersTable(
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  email TEXT NOT NULL
);

INSERT INTO usersTable(name, email)
  VALUES('John', 'jow@ibm.com'), ('Jane', 'jane@ibm.com');