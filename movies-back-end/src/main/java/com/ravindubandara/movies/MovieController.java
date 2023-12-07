package com.ravindubandara.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Handles HTTP requests related to movies
@RestController //create controllers for REST APIs
@CrossOrigin(origins = "http://localhost:3000") // Allows cross-origin requests
@RequestMapping("/api/v1/movies") // Base URI for movie-related endpoints

public class MovieController {
    @Autowired // Automatically injects MovieService dependency
    private MovieService movieService;
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies(){
        // Handles GET requests to retrieve all movies
        return new ResponseEntity<List<Movie>>(movieService.allMovies(), HttpStatus.OK);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional <Movie>> getSingleMovie(@PathVariable String imdbId){
        // Handles GET requests to retrieve a single movie by IMDb ID
        return new ResponseEntity<Optional<Movie>>(movieService.singleMovie(imdbId), HttpStatus.OK);
    }
}
