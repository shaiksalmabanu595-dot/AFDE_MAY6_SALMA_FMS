import { useState, useEffect } from 'react';
import RatingStars from './RatingStars.jsx';

/**
 * FeedbackForm — shared form for creating and editing feedback.
 *
 * Performs client-side validation before calling `onSubmit`. The parent
 * is responsible for the actual API call.
 */
function FeedbackForm({ initial = {}, onSubmit, onCancel, submitLabel = 'Submit Feedback' }) {
  const [form, setForm] = useState({
    participant_name: '',
    program_name: '',
    rating: 0,
    comments: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial && Object.keys(initial).length) {
      setForm({
        participant_name: initial.participant_name || '',
        program_name: initial.program_name || '',
        rating: initial.rating || 0,
        comments: initial.comments || '',
      });
    }
  }, [initial]);

  const validate = () => {
    const errs = {};
    if (!form.participant_name.trim()) errs.participant_name = 'Participant name is required';
    else if (form.participant_name.trim().length < 2)
      errs.participant_name = 'Name must be at least 2 characters';

    if (!form.program_name.trim()) errs.program_name = 'Program / training name is required';

    if (!form.rating || form.rating < 1 || form.rating > 5)
      errs.rating = 'Please select a rating between 1 and 5';

    if (form.comments && form.comments.length > 2000)
      errs.comments = 'Comments must be 2000 characters or fewer';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({
        participant_name: form.participant_name.trim(),
        program_name: form.program_name.trim(),
        rating: form.rating,
        comments: form.comments.trim() || null,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label className="form-label" htmlFor="participant_name">
          Participant Name <span className="required">*</span>
        </label>
        <input
          id="participant_name"
          className="form-input"
          type="text"
          value={form.participant_name}
          onChange={(e) => setForm({ ...form, participant_name: e.target.value })}
          placeholder="e.g. Salma"
          maxLength={100}
        />
        {errors.participant_name && <div className="form-error">{errors.participant_name}</div>}
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="program_name">
          Training / Event / Product <span className="required">*</span>
        </label>
        <input
          id="program_name"
          className="form-input"
          type="text"
          value={form.program_name}
          onChange={(e) => setForm({ ...form, program_name: e.target.value })}
          placeholder="e.g. AFDE Capstone Training"
          maxLength={150}
        />
        {errors.program_name && <div className="form-error">{errors.program_name}</div>}
      </div>

      <div className="form-row">
        <label className="form-label">
          Rating <span className="required">*</span>
        </label>
        <RatingStars value={form.rating} onChange={(rating) => setForm({ ...form, rating })} />
        <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>
          1 = Poor · 2 = Fair · 3 = Good · 4 = Very Good · 5 = Excellent
        </small>
        {errors.rating && <div className="form-error">{errors.rating}</div>}
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="comments">
          Comments
        </label>
        <textarea
          id="comments"
          className="form-textarea"
          value={form.comments}
          onChange={(e) => setForm({ ...form, comments: e.target.value })}
          placeholder="Share your feedback in detail..."
          maxLength={2000}
        />
        {errors.comments && <div className="form-error">{errors.comments}</div>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default FeedbackForm;
