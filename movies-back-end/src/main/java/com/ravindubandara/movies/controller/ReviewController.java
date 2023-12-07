package com.ravindubandara.movies.controller;

import com.ravindubandara.movies.service.ReviewService;
import com.ravindubandara.movies.model.Review;
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

    // Update an existing review
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable String id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(reviewService.updateReview(id, payload.get("reviewBody")));
    }

    // Delete an existing review
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable String id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
