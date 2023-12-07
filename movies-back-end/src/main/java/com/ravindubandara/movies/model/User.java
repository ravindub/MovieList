package com.ravindubandara.movies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// User Class representing user information
@Data // Lombok annotation for generating boilerplate code for getter & setter
@AllArgsConstructor // Lombok annotation for generating a constructor with all fields
@NoArgsConstructor // Lombok annotation for generating a default constructor
@Document(collection = "users") // Specifies MongoDB collection name
public class User {
    @Id
    private ObjectId id;
    private String username;
    private String password;

    public String getPassword() {
        return this.password;
    }
}
