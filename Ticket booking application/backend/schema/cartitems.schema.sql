CREATE TABLE cartitems (
    id SERIAL PRIMARY KEY,
    moviename VARCHAR(255) NOT NULL,
    showtime VARCHAR(255) NOT NULL,
    seats VARCHAR(255) NOT NULL,
    totalprice FLOAT NOT NULL
);
