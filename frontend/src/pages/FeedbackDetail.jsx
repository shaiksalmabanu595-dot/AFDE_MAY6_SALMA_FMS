import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService.js';
import RatingStars from '../components/RatingStars.jsx';

const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

function FeedbackDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    feedbackService
      .getById(id)
      .then((data) => {
        if (mounted) setFeedback(data);
      })
      .catch(() => {
        if (mounted) setError('Feedback not found.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this feedback entry?')) return;
    try {
      await feedbackService.remove(id);
      navigate('/feedback');
    } catch {
      setError('Failed to delete.');
    }
  };

  if (loading) return <div className="loading">Loading…</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!feedback) return null;

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Feedback #{feedback.feedback_id}</h1>
        <p className="page-subtitle">Complete details of this feedback entry</p>
      </div>

      <div className="detail-card">
        <div className="detail-row">
          <div className="detail-label">Participant Name</div>
          <div className="detail-value">{feedback.participant_name}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Training / Event</div>
          <div className="detail-value">{feedback.program_name}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Rating</div>
          <div className="detail-value">
            <RatingStars value={feedback.rating} readOnly />
            <span style={{ marginLeft: '0.6rem', color: 'var(--text-muted)' }}>
              ({feedback.rating} - {RATING_LABELS[feedback.rating]})
            </span>
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Comments</div>
          <div className="detail-value">{feedback.comments || <em>No comments provided.</em>}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Submitted At</div>
          <div className="detail-value">{new Date(feedback.submitted_at).toLocaleString()}</div>
        </div>

        <div className="form-actions">
          <Link to={`/feedback/${feedback.feedback_id}/edit`} className="btn btn-primary">
            Edit
          </Link>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <Link to="/feedback" className="btn btn-secondary">
            Back to list
          </Link>
        </div>
      </div>
    </>
  );
}

export default FeedbackDetail;
