BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS votes CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    year DATE,
    desc TEXT,
    rating FLOAT(2)
);

CREATE TABLE votes (
    movie_id INTEGER REFERENCES movies(id),
    user_id INTEGER REFERENCES users(id)
);

COMMIT;