# Movie List Application


https://github.com/ravindub/MovieList/assets/47911656/37d49047-7952-4736-931b-2b79e6845aa9


This web application allows users to explore a list of movies, watch trailers, and share their thoughts through reviews.
The application is built with a React frontend and a Spring Boot backend, utilizing MongoDB Atlas for data storage.

## Features

1. **Browse Movies:** The application displays a list of movies retrieved from the MongoDB database.

2. **Watch Trailers:** Users can view trailers for each movie directly within the application.

3. **Review Section:** Each movie has its own review section where users can create, update, and delete reviews.

4. **User Authentication:** Users can register and securely log in to the application.

## Tech Stack

- **Frontend:**
  - React

- **Backend:**
  - Spring Boot
  - Java 17
  - MongoDB Atlas

- **Communication:**
  - REST (Representational State Transfer)
 
- **Development Environment:**
  - IntelliJ IDEA
  - Visual Studio Code

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ravindub/MovieList.git
   
2. **Navigate to the Frontend:**
   ```bash
   cd movies-front-end

3. **Install Dependencies:**
   ```bash
   npm install

4. **Run the Frontend:**
   ```bash
   npm start

5. **Run the Backend:**
- Open the project in IntelliJ IDEA and run the application.

6. **Access the Application:**
- Open your web browser and go to http://localhost:3000 to start exploring the Movie List Application.

## API Endpoints
- GET /api/v1/movies: Retrieve the list of movies.
- GET /api/v1/movies/{imdbId}: Get details of a specific movie.
- POST /api/v1/reviews: Add a new review for a movie.
- PUT /api/v1/reviews/{id}: Update a movie review.
- DELETE /api/v1/reviews/{id}: Delete a movie review.
- POST /api/v1/users/register: Register a new user.
- POST /api/v1/users/login: Log in an existing user.
