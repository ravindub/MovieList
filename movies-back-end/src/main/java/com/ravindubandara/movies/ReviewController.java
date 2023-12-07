package com.ravindubandara.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// Handles HTTP requests related to reviews
@RestController //create controllers for REST APIs
@CrossOrigin(origins = "http://localhost:3000")// Allows cross-origin requests
@RequestMapping("/api/v1/reviews")// Base URI for review-related endpoints
public class ReviewController {
    @Autowired
    private ReviewService reviewService; // Injects ReviewService for business logic

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload){
        // Handles POST requests to create a new review
        return new ResponseEntity<Review>(reviewService.createReview(payload.get("reviewBody"), payload.get("imdbId")), HttpStatus.CREATED);
    }
}
