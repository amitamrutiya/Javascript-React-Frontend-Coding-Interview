import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./Star.css"

const StarRating = ({ numberOfStars, color, size }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(numberOfStars)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <svg
            key={index}
            className="star"
            height={size}
            width={size}
            viewBox="0 0 24 24"
            fill={ratingValue <= (hover || rating) ? color : '#d7d7d7'}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(ratingValue)}
          >
            <path d="M12 .587l3.668 7.431L24 9.748l-6 5.853 1.417 8.262L12 18.896l-7.417 3.967L6 15.601 0 9.748l8.332-1.73L12 .587z" />
          </svg>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  numberOfStars: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
};

StarRating.defaultProps = {
  color: '#ffc107',
  size: '24',
};

export default StarRating;