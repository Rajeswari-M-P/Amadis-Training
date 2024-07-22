// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg'); // PostgreSQL client
// require('dotenv').config(); // To load environment variables

// const app = express();
// const port = process.env.PORT || 5000;

// // PostgreSQL setup
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// pool.on('connect', () => {
//     console.log('Connected to PostgreSQL database');
// });

// pool.on('error', (err) => {
//     console.error('Unexpected error on idle client', err);
//     process.exit(-1);
// });

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// const userRouter = require('./src/Routes/authRoute');
// app.use('/register', userRouter);

// const movieRouter = require('./src/Routes/movieRoutes');
// app.use('/movies', movieRouter);

// // Server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


// const express = require('express');
// const path = require('path');
// const { Pool } = require('pg');
// const app = express();
// const port = 5000;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'customer',
//   password: 'qwert@123',
//   port: 5432,
// });

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Route to handle form submission
// app.post('/register', async (req, res) => {
//   const { username, email,password } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO contacts (username, email,password) VALUES ($1, $2,$3) RETURNING *',
//       [name, email]
//     );
//     res.status(201).json({ message: 'Contact saved successfully', contact: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log('Server is running on http://localhost:${port}');
// });


// backend/server.js
// backend/server.js

// Import necessary modules
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customer',
  password: 'qwert@123',
  port: 5432,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route to handle registration
const register = require('./src/models/customer1');

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO customer1 (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    res.status(201).json({ message: 'Details saved successfully', result: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to handle login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM customer1 WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const token = jwt.sign({ username: user.username, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
      });
      res.status(200).json({ message: 'Login successful', user, token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Import the Movie model (assuming you have a Sequelize model for movies)
const Movie = require('./src/models/movies'); // Adjust the path as necessary

app.get('/movies', async (req, res) => {
  const { name } = req.query; // Use query parameters for search

  try {
    const movies = await Movie.findOne({
      where: { name },
      attributes: ['id', 'name', 'description', 'releasedate', 'rating', 'actors', 'views'], // Specify only the existing columns
      raw:true
    });

    if (movies) {
      res.status(200).json({ success: true, movies });
    } 
    else {
      res.status(404).json({ success: false, message: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// server.js
// server.js
// app.get('/movies', async (req, res) => {
//   const { name } = req.query; // Get the movie name from the query parameters

//   if (!name) {
//     return res.status(400).json({ success: false, message: 'Movie name is required' });
//   }

//   try {
//     const query = 'SELECT * FROM movies WHERE name ILIKE $1'; // Using ILIKE for case-insensitive search
//     const result = await con.query(query, [`%${name}%`]);

//     if (result.rows.length > 0) {
//       res.json({ success: true, movie: result.rows[0] });
//     } else {
//       res.json({ success: false, message: 'No movie found' });
//     }
//   } catch (error) {
//     console.error('Error fetching movie:', error);
//     res.status(500).json({ success: false, message: 'Error fetching movie' });
//   }
// });





// Import the CartItem model
const CartItem = require('./src/models/cartitems');

// app.post('/cartitems', /* authenticateToken, */ async (req, res) => {
//   const {data} = req.body;
// console.log("cartItems", data);
//   try {




 /////keep this lines commented

    // if (!Array.isArray(cartItems) || cartItems.length === 0) {
    //   return res.status(400).json({ success: false, message: 'Invalid cart items data' });
    // }

//     for (const item of data) {
//       console.log(item);
//       await CartItem.create({
//         moviename: item.moviename,
       
//         showtime: item.showtime,
//         seats: item.seats,
//         totalprice: item.totalprice,
//       });
//     }

//     res.status(201).json({ success: true, message: 'Cart items saved successfully' });
//   } catch (error) {
//     console.error('Error saving cart items:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });


app.post('/cartitems', async (req, res) => {
  const { data } = req.body;
  console.log("cartItems", data);

  if (!Array.isArray(data)) {
    return res.status(400).json({ success: false, message: 'Invalid cart items data' });
  }

  try {
    for (const item of data) {
      await pool.query(
        'INSERT INTO cartitems (moviename, showtime, seats, totalprice, poster) VALUES ($1, $2, $3, $4, $5)',
        [item.moviename, item.showtime, item.seats.join(', '), item.price, item.poster]
      );
    }

    res.status(201).json({ success: true, message: 'Cart items saved successfully' });
  } catch (error) {
    console.error('Error saving cart items:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

