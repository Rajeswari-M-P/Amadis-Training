CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    releasedate DATE,
    rating NUMERIC,
    actors TEXT[],
    views INTEGER DEFAULT 0
);
