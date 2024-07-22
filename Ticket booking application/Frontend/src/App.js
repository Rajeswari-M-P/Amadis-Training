import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import SearchBar from './components/searchbar'; // Import SearchBar component
import ShowtimeList from './components/ShowtimeList';
import SeatSelection from './components/SeatSelection';
import RegistrationForm from './components/RegistrationForm';
import Cart from './components/Cart';
import Premiere from './components/Premiere';
import ImageCarousel from './components/ImageCarousel';
import { CartProvider } from './components/CartContext';
import MovieDetails from './components/MovieDetails'; 
import RegisterLayout from './components/RegisterLayout'; 
import Logo from './components/logo';
import './index.css'; // Import the CSS file

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <header>
            <div className="title">MOVIE MANIA</div>
            <div className="search-bar">
              <SearchBar /> {/* Add SearchBar component here */}
            </div>
            <nav>
              <ul className="nav-links">
                <li><Link to="/">Movies</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/cart">Cart</Link></li>
              </ul>
            </nav>
          </header>
          <div className="content">
            <Routes>
              <Route path="/" element={
                <>
                  <ImageCarousel />
                  <img src="/imagebar.avif" alt="Logo" className="imagebar-logo" />
                  <Premiere />
                  {/* <MovieList /> */}
                </>
              } />
              <Route path="/registerlayout" element={<RegisterLayout />}/>
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/movie/:movieId/showtimes" element={<ShowtimeList />} />
              <Route path="/showtimes/:showtimeId/seats" element={<SeatSelection />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/logo" element={<Logo />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
