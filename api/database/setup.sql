DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (30) UNIQUE NOT NULL,
    password CHAR (60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE reviews (
    review_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    date DATE NOT NULL ALWAYS (GETDATE()),
    author VARCHAR (100) NOT NULL,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL
)