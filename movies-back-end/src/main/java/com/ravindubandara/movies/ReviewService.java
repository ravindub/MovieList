package com.ravindubandara.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

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
}
