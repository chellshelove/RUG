import React, { useState } from "react";
import {db} from "../../Firebase";
import { Form, Input, Button } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import "./CustomerReview.css";

const CustomerReview = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const feedbackData = {
      rating: rating,
      feedback: feedback,
    };

    const docRef = doc(db, "customerFeedback", `${Math.random()}`);
    await setDoc(docRef, feedbackData);

    setRating(0);
    setFeedback("");
    alert("Feedback submitted successfully!");
  };

  return (
    <div className="CustomerReview">
      <h3>User Review</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Select value={rating} onChange={(event) => setRating(event.target.value)}>
            <option value="0">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Review</Form.Label>
          <Form.Control type="textarea" placeholder="Share your thoughts!" value={feedback} onChange={(event) => setFeedback(event.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">Submit Review</Button>
      </Form>
    </div>
  );
};

export default CustomerReview;