package com.ravindubandara.movies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reviews")
@Data // Lombok annotation generating boilerplate code for getter & setter
@AllArgsConstructor // Lombok annotation for generating a constructor with all fields
@NoArgsConstructor // Lombok annotation for generating a default constructor
public class Review {

    @Id
    private ObjectId id; // Primary identifier for the document
    private String body; // Content of the review

    // Additional constructor that allows creating instances with just the review body.
    public Review(String body) {
        this.body = body;
    }
}
