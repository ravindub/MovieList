package com.ravindubandara.movies.controller;

import com.ravindubandara.movies.service.UserService;
import com.ravindubandara.movies.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

// UserController Class handling user-related HTTP requests
@RestController //create controllers for REST APIs
@CrossOrigin(origins = "*")// Allows cross-origin requests
@RequestMapping("/api/v1/users")// Base URI for user-related endpoints
public class UserController {
    @Autowired // Injects UserService for business logic
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        // Handles POST requests to register a new user
        return new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> credentials) {
        // Handles POST requests for user login
        String username = credentials.get("username");
        String password = credentials.get("password");

        // Perform login and return information
        Optional<User> user = userService.loginUser(username, password);
        return user.map(u -> new ResponseEntity<>("Login successful", HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED));
    }
}
