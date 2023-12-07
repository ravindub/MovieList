// Importing necessary dependencies and components
import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
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

      // Updating the reviews state with the new review
      const updatedReviews = [...reviews, { body: rev.value }];

      rev.value = '';

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
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
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
