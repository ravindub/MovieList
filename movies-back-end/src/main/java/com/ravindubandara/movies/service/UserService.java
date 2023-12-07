package com.ravindubandara.movies.service;

import com.ravindubandara.movies.model.User;
import com.ravindubandara.movies.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

// UserService Class containing user-related business logic
@Service// Indicates that this class is a service component
public class UserService {
    @Autowired // Injects UserRepository for data access
    private UserRepository userRepository;

    @Autowired // Inject BCryptPasswordEncoder
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(User user) {

        String hashedPassword = passwordEncoder.encode(user.getPassword()); // Hash the password
        user.setPassword(hashedPassword); // Set the hashed password
        return userRepository.save(user);// Save the user to the database
    }

    public Optional<User> loginUser(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
        // Use matches() to verify the provided password against the hashed password
    }
}
