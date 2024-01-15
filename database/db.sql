--Crearemos la base 
    CREATE DATABASE database_links; --Creacion para la base de datos

    use database_links;

--Para la creacion de la primero tabla de la base de datos 
--Tamnbien se esta creando caractecteristicas que tiene la base de datos
    CREATE TABLE users(
        id INT(11) NOT NULL,
        username VARCHAR(16) NOT NULL,
        password VARCHAR(60) NOT NULL,
        fullname VARCHAR(100) NOT NULL
    );

--Para la alteracion de la tabla 
    ALTER TABLE users
        ADD PRIMARY KEY(id);

    ALTER TABLE users
        MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

    DESCRIBE users;

--LINKS TATLES
    CREATE TABLE links(
        id int(11) NOT NULL,
        title VARCHAR(150) NOT NULL,
        url VARCHAR(255) NOT NULL,
        description TEXT,
        user_id INT(11),
        created_at timestamp NOT NULL DEFAULT current_timestamp,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
--Para la alteracion de la tabla
    ALTER TABLE links
        ADD PRIMARY KEY (id);
    

    ALTER TABLE links
        MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =2;

    DESCRIBE links;