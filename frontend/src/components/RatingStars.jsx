/**
 * RatingStars — interactive 1-to-5 rating selector.
 *
 * When `readOnly` is true the component renders a static display.
 * Otherwise it calls `onChange` with the new rating when a star is clicked.
 */
function RatingStars({ value = 0, onChange, readOnly = false }) {
  if (readOnly) {
    return (
      <span className="feedback-rating" aria-label={`Rating: ${value} out of 5`}>
        {'★'.repeat(value)}
        {'☆'.repeat(5 - value)}
      </span>
    );
  }

  return (
    <div className="rating-input" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={n === value}
          className={`rating-star ${n <= value ? 'active' : ''}`}
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          {n <= value ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}

export default RatingStars;
