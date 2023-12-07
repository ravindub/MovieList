package com.ravindubandara.movies.repository;

import com.ravindubandara.movies.model.Movie;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Provides CRUD operations for the Movie entity
@Repository // Indicates that this interface is a Spring Data repository
public interface MovieRepository extends MongoRepository<Movie, ObjectId> {
    Optional<Movie> findMovieByImdbId(String imdbId); // Custom query to find a movie by IMDb ID
}

