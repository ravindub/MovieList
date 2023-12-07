package com.ravindubandara.movies;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

// Represents a Movie entity stored in MongoDB
@Document(collection = "movies") // Indicates that this class is a MongoDB document
@Data // Lombok annotation for generating boilerplate code for getter & setter
@AllArgsConstructor // Lombok annotation for generating a constructor with all fields
@NoArgsConstructor // Lombok annotation for generating a default constructor
public class Movie {
    @Id
    private ObjectId Id; // Primary identifier for the document
    private String imdbId; // IMDb ID of the movie
    private String title;
    private String releaseDate;
    private String trailerLink;
    private String poster;
    private List<String> genres;
    private List<String> backdrops;
    @DocumentReference //indicates that the field contains references to documents in another collection
    private List<Review> reviewIds; // List of reviews associated with the movie

}
