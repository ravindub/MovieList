// Importing necessary dependencies and components
import { useEffect, useRef, useState } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  // useRef to capture the review text input
  const revText = useRef();

  // State to track the review being edited and its content
  const [editReviewId, setEditReviewId] = useState(null);
  const [editedReview, setEditedReview] = useState('');

  // Extracting movieId from URL parameters
  let params = useParams();
  const movieId = params.movieId;

  // useEffect hook to fetch movie data when the component mounts or when movieId changes
  useEffect(() => {
    getMovieData(movieId);
  }, [movieId]);

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

      // Extracting the new review from the response
      const newReview = response.data;

      // Updating the reviews state with the new review
      setReviews((prevReviews) => [...prevReviews, newReview]);

      // Clearing the review text input
      rev.value = '';

      // Fetching movie data to update the component with the latest information
      getMovieData(movieId);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete a review
  const deleteReview = async (reviewId) => {
    try {
      // Making a DELETE request to delete a review
      await api.delete(`/api/v1/reviews/${reviewId}`);

      // Updating the reviews state after deletion
      const updatedReviews = reviews.filter((r) => r.id !== reviewId);

      setReviews(updatedReviews);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to toggle the edit mode for a review
  const toggleEditReview = (reviewId) => {
    setEditReviewId(reviewId);

    // Setting the initial content of the textarea to the current review's body
    setEditedReview(reviews.find((r) => r.id === reviewId)?.body || '');
  };

  // Function to update a review
  const updateReview = async (reviewId) => {
    try {
      // Making a PUT request to update a review
      await api.put(`/api/v1/reviews/${reviewId}`, {
        reviewBody: editedReview
      });

      // Update the reviews state after editing
      const updatedReviews = reviews.map((r) =>
        r.id === reviewId ? { ...r, body: editedReview } : r
      );

      setReviews(updatedReviews);
      setEditReviewId(null); // Exiting edit mode
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

          {/* Displaying existing reviews */}
          {reviews?.map((r) => (
            <div key={r.id}>
              <Row>
                <Col className="m-1">
                  {/* Showing a textarea when in edit mode, otherwise showing the review body */}
                  {editReviewId === r.id ? (
                    <textarea
                      value={editedReview}
                      onChange={(e) => setEditedReview(e.target.value)}
                    />
                  ) : (
                    r.body
                  )}
                </Col>
                <Col>
                  {/* Buttons for update and delete */}
                  {editReviewId === r.id ? (
                    <>
                      <Button
                        className="m-1"
                        variant="success"
                        onClick={() => updateReview(r.id)}
                      >
                        Save
                      </Button>
                      <Button
                        className="m-1"
                        variant="secondary"
                        onClick={() => setEditReviewId(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="m-1"
                        variant="warning"
                        onClick={() => toggleEditReview(r.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteReview(r.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
              <Col>
                <hr />
              </Col>
            </div>
          ))}
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
