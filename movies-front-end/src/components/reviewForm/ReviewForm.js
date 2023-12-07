// Importing Form, Button from react-bootstrap
import { Form, Button } from 'react-bootstrap';

// ReviewForm component for submitting reviews
const ReviewForm = ({ handleSubmit, revText, lableText, defaultValue }) => {
  return (
    <Form>
      {/* Textarea for entering the review */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>{lableText}</Form.Label>
        <Form.Control
          ref={revText}
          as="textarea"
          rows={3}
          defaultValue={defaultValue}
        />
      </Form.Group>

      {/* Button to submit the review */}
      <Button variant="outline-info" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default ReviewForm;
