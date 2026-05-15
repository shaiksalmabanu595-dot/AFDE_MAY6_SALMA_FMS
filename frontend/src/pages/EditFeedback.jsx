import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService.js';
import FeedbackForm from '../components/FeedbackForm.jsx';

function EditFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const redirectTimer = useRef(null);

  useEffect(() => {
    // Clear stale state when the target id changes.
    setInitial(null);
    setLoading(true);
    setMessage(null);
    feedbackService
      .getById(id)
      .then(setInitial)
      .catch(() => setMessage({ type: 'error', text: 'Feedback not found.' }))
      .finally(() => setLoading(false));
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await feedbackService.update(id, data);
      setMessage({ type: 'success', text: 'Feedback updated successfully! Redirecting…' });
      redirectTimer.current = setTimeout(() => navigate(`/feedback/${id}`), 1000);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setMessage({
        type: 'error',
        text: detail
          ? `Failed to update: ${typeof detail === 'string' ? detail : JSON.stringify(detail)}`
          : 'Failed to update feedback.',
      });
    }
  };

  if (loading) return <div className="loading">Loading…</div>;
  if (!initial) return <div className="alert alert-error">Feedback not found.</div>;

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Edit Feedback #{initial.feedback_id}</h1>
        <p className="page-subtitle">Update the feedback details below.</p>
      </div>

      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}

      <div className="card" style={{ maxWidth: '720px' }}>
        <FeedbackForm
          initial={initial}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/feedback/${id}`)}
          submitLabel="Save Changes"
        />
      </div>
    </>
  );
}

export default EditFeedback;
