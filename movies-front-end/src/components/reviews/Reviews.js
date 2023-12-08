// Importing necessary dependencies and components
import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react';

// Reviews component for displaying reviews and submitting new ones
const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  // useEffect hook to fetch movie data when the component mounts
  useEffect(() => {
    getMovieData(movieId);
  }, []);

  // Function to add a new review
  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      // Making a POST request to add a new review
      const response = await api.post('/api/v1/reviews', {
        reviewBody: rev.value,
        imdbId: movieId
      });

      console.log('API Response:', response.data);
      // Updating the reviews state with the new review
      const updatedReviews = [...reviews, { body: rev.value }];

      rev.value = '';

      //setReviews(updatedReviews);
      getMovieData(movieId);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete a review
  const deleteReview = async (reviewId) => {
    try {
      //const reviewIdString = JSON.stringify(reviewId);

      // Making a DELETE request to delete a review
      await api.delete(`/api/v1/reviews/${reviewId}`);

      // Updating the reviews state after deletion
      const updatedReviews = reviews.filter((r) => r.id !== reviewId);

      setReviews(updatedReviews);
    } catch (error) {
      console.log(error);
    }
  };

  // Rendering the reviews section
  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  {/* ReviewForm component for submitting new reviews */}
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    lableText={'Write a Review?'}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }

          {/* Displaying existing reviews */}
          {reviews?.map((r) => {
            return (
              <div key={reviews.indexOf(r)}>
                <Row>
                  {/* {console.log(r)} */}
                  <Col className="m-1">{r.body}</Col>
                  <Col>
                    {/* Buttons for update and delete */}
                    <Button
                      className="m-1"
                      variant="warning"
                      onClick={() => {
                        // Handle update action (you can implement your update logic here)
                        console.log(`Update review with ID: ${r.id}`);
                      }}
                    >
                      Update
                    </Button>
                    <Button variant="danger" onClick={() => deleteReview(r.id)}>
                      Delete
                    </Button>
                  </Col>
                </Row>
                <Col>
                  <hr />
                </Col>
              </div>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
