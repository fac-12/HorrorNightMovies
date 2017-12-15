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
    user_id INTEGER REFERENCES users(id) NOT NULL,
    title VARCHAR(100) NOT NULL,
    year VARCHAR(4) NOT NULL,
    description TEXT
);

CREATE TABLE votes (
    movie_id INTEGER REFERENCES movies(id),
    user_id INTEGER REFERENCES users(id)
);

INSERT INTO users (username, password) VALUES ('Lex', 'horrorshow'), ('Hannah', 'password');

INSERT INTO movies(user_id, title, year, description) VALUES
(1, 'I walked with a Zombie', '1943', 'Evocative direction'),
(1, 'Split', '2017', 'Split serves as a dramatic tour de force for James McAvoy in multiple roles -- and finds writer-director M. Night Shyamalan returning resoundingly to thrilling form.'),
(2, 'The Conjuring 2', '2016', 'The Conjuring 2 can''t help but lose a bit of its predecessor''s chilly sting through familiarity, but what remains is still a superior ghost story told with spine-tingling skill.'),
(2, 'The Others', '2001', 'The Others is a spooky thriller that reminds us that a movie doesn''t need expensive special effects to be creepy.');

INSERT INTO votes (movie_id, user_id) VALUES (1, 1), (2, 1), (2, 2), (3, 2);
COMMIT;
