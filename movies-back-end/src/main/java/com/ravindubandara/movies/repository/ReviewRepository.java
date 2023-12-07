package com.ravindubandara.movies.repository;

import com.ravindubandara.movies.model.Review;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

// Provides CRUD operations for the Review entity
@Repository// Indicates that this interface is a Spring Data repository
public interface ReviewRepository extends MongoRepository<Review, ObjectId> {
}
