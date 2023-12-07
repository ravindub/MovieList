// Importing necessary dependencies and components
import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() {
  // State for managing movies, single movie, and reviews
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  // Function to fetch movies from the API
  const getMovies = async () => {
    try {
      const response = await api.get('/api/v1/movies'); // Making a GET request to the movies endpoint

      setMovies(response.data); // Updating the movies state with the API response data
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch data for a specific movie
  const getMovieData = async (movieId) => {
    try {
      // Making a GET request to a specific movie endpoint
      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie); // Updating the single movie state

      setReviews(singleMovie.reviewIds); // Updating the reviews state
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hook to fetch movies when the component mounts
  useEffect(() => {
    getMovies();
  }, []);

  // Rendering the main structure of the app
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
