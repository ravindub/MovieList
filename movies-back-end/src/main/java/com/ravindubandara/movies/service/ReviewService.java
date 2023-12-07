package com.ravindubandara.movies.service;

import com.ravindubandara.movies.model.Movie;
import com.ravindubandara.movies.model.Review;
import com.ravindubandara.movies.repository.ReviewRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


// Contains business logic related to reviews
@Service// Indicates that this class is a service component
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository; // Injects ReviewRepository for data access
    @Autowired
    private MongoTemplate mongoTemplate; // Injects MongoTemplate for advanced MongoDB operations
    public Review createReview(String reviewBody, String imdbId){
        // Creates a new review and associates it with a movie
        Review review = reviewRepository.insert(new Review(reviewBody));

        // Updates the movie's reviewIds list to include the new review
        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("reviewIds").value(review))
                .first();
        return review;
    }

    /**
     * Update an existing review with the given ID.
     *
     * @param id         The ID of the review to be updated.
     * @param reviewBody The new content for the review.
     * @return The updated review.
     */
    public Review updateReview(String id, String reviewBody) {
        // Convert the ID string to ObjectId
        ObjectId objectId = new ObjectId(id);

        // Find the review by ID or throw a NOT_FOUND exception
        Review existingReview = reviewRepository.findById(objectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found with id: " + id));

        // Update the review content
        existingReview.setBody(reviewBody);

        // Save and return the updated review
        return reviewRepository.save(existingReview);
    }

    /**
     * Delete a review with the given ID.
     *
     * @param id The ID of the review to be deleted.
     */
    public void deleteReview(String id) {
        // Convert the ID string to ObjectId
        ObjectId objectId = new ObjectId(id);

        // Find the review by ID or throw a NOT_FOUND exception
        Review existingReview = reviewRepository.findById(objectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found with id: " + id));

        // Delete the review from the repository
        reviewRepository.delete(existingReview);

        // Remove the review ID from associated movies
        mongoTemplate.updateFirst(
                Query.query(Criteria.where("reviewIds").is(existingReview)),
                new Update().pull("reviewIds", existingReview),
                Movie.class
        );
    }


}
