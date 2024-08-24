import React from 'react';

const Reviews = () => {
  const reviews = [
    { id: 1, reviewer: 'John Doe', rating: 5, comment: 'Great car! Highly recommend.' },
    { id: 2, reviewer: 'Jane Smith', rating: 4, comment: 'Good value for the money.' },
    { id: 3, reviewer: 'Alice Johnson', rating: 3, comment: 'Decent car, but had some issues.' },
    { id: 4, reviewer: 'Bob Brown', rating: 4, comment: 'Comfortable ride, and reliable.' },
    { id: 5, reviewer: 'Charlie Green', rating: 5, comment: 'Amazing performance and fuel efficiency!' },
  ];

  return (
    <div className="reviews-container">
      <h3>Customer Reviews</h3>
      {reviews.map(review => (
        <div key={review.id} className="review">
          <p><strong>{review.reviewer}</strong> - {review.rating} stars</p>
          <p>{review.comment}</p>
        </div>
      ))}

      <style jsx>{`
        .reviews-container {
          margin-top: 30px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .review {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          background-color: #f9f9f9;
          color: #333; 
        }

        .review p {
          margin: 5px 0;
          font-size: 1rem;
          color: #555; 
        }

        h3 {
          text-align: center;
          margin-bottom: 20px;
          font-size: 1.5rem;
          color: #333; 
        }
      `}</style>
    </div>
  );
};

export default Reviews;
