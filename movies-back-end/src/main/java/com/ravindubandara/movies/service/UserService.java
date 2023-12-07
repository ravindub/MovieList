package com.ravindubandara.movies.service;

import com.ravindubandara.movies.model.User;
import com.ravindubandara.movies.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

// UserService Class containing user-related business logic
@Service// Indicates that this class is a service component
public class UserService {
    @Autowired // Injects UserRepository for data access
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);// Save the user to the database
    }

    public Optional<User> loginUser(String username, String password) {
        // Validate credentials and return the user if login is successful
        return userRepository.findByUsername(username)
                .filter(user -> password.equals(user.getPassword()));
    }
}
