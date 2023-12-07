package com.ravindubandara.movies.service;

import com.ravindubandara.movies.model.Movie;
import com.ravindubandara.movies.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Contains business logic related to movies
@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository; // Injects MovieRepository for data access
    public List<Movie> allMovies(){
        // Retrieves all movies from the repository
        return movieRepository.findAll();
    }

    public Optional<Movie> singleMovie(String imdbId){
        // Retrieves a single movie by IMDb ID from the repository
        return movieRepository.findMovieByImdbId(imdbId);
    }
}
