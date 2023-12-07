package com.ravindubandara.movies.repository;

import com.ravindubandara.movies.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// UserRepository Interface for CRUD operations on the User entity
@Repository // Indicates that this interface is a Spring Data repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByUsername(String username);// Custom query to find a user by username
}
