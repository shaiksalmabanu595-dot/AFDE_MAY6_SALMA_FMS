import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService.js';
import FeedbackForm from '../components/FeedbackForm.jsx';

function SubmitFeedback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const handleSubmit = async (data) => {
    try {
      await feedbackService.create(data);
      setMessage({ type: 'success', text: 'Feedback submitted successfully! Redirecting…' });
      setTimeout(() => navigate('/feedback'), 1200);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setMessage({
        type: 'error',
        text: detail
          ? `Failed to submit: ${typeof detail === 'string' ? detail : JSON.stringify(detail)}`
          : 'Failed to submit feedback. Please try again.',
      });
    }
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Submit Feedback</h1>
        <p className="page-subtitle">
          Share your honest feedback about a training, event, or product.
        </p>
      </div>

      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}

      <div className="card" style={{ maxWidth: '720px' }}>
        <FeedbackForm onSubmit={handleSubmit} onCancel={() => navigate('/')} />
      </div>
    </>
  );
}

export default SubmitFeedback;
