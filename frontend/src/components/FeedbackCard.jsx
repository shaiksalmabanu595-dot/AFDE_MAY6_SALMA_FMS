import { Link, useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars.jsx';

/**
 * FeedbackCard — single feedback entry rendered in a grid.
 *
 * Provides View, Edit, and Delete actions. Delete is handled via the
 * `onDelete` callback so the parent can re-fetch the list afterwards.
 */
function FeedbackCard({ feedback, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm(`Delete feedback from ${feedback.participant_name}?`)) {
      await onDelete(feedback.feedback_id);
    }
  };

  const formattedDate = new Date(feedback.submitted_at).toLocaleString();

  return (
    <article className="feedback-card">
      <div className="feedback-card-header">
        <div>
          <div className="feedback-participant">{feedback.participant_name}</div>
          <div className="feedback-program">{feedback.program_name}</div>
        </div>
        <RatingStars value={feedback.rating} readOnly />
      </div>

      {feedback.comments && <p className="feedback-comment">{feedback.comments}</p>}

      <div className="feedback-meta">
        <span>{formattedDate}</span>
        <div className="feedback-actions">
          <Link to={`/feedback/${feedback.feedback_id}`} className="btn btn-secondary btn-sm">
            View
          </Link>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate(`/feedback/${feedback.feedback_id}/edit`)}
          >
            Edit
          </button>
          <button type="button" className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default FeedbackCard;
