import { useEffect, useState, useCallback } from 'react';
import { feedbackService } from '../services/feedbackService.js';
import FeedbackCard from '../components/FeedbackCard.jsx';

/**
 * FeedbackList — paginated/searchable listing of all feedback entries.
 *
 * Implements the search-and-filter UI from spec section 6.5. Polls the
 * backend every 5 seconds when no filters are active so new submissions
 * appear in real time.
 */
function FeedbackList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [rating, setRating] = useState('');
  const [program, setProgram] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const loadAll = useCallback(async () => {
    try {
      const data = await feedbackService.listAll();
      setItems(data);
      setError(null);
    } catch {
      setError('Failed to load feedback. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Auto-refresh every 5s when no active filter, so new feedback shows up live.
  useEffect(() => {
    if (isFiltered) return;
    const id = setInterval(loadAll, 5000);
    return () => clearInterval(id);
  }, [isFiltered, loadAll]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const hasFilter = !!(keyword || rating || program);
    setIsFiltered(hasFilter);
    try {
      if (!hasFilter) {
        await loadAll();
      } else {
        const data = await feedbackService.search({
          keyword: keyword || undefined,
          rating: rating ? Number(rating) : undefined,
          program: program || undefined,
        });
        setItems(data);
        setError(null);
      }
    } catch {
      setError('Search failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setKeyword('');
    setRating('');
    setProgram('');
    setIsFiltered(false);
    setLoading(true);
    await loadAll();
  };

  const handleDelete = async (id) => {
    try {
      await feedbackService.remove(id);
      // Refresh — use current filter state to preserve user's view.
      if (isFiltered) {
        await handleSearch({ preventDefault: () => {} });
      } else {
        await loadAll();
      }
    } catch {
      setError('Failed to delete feedback.');
    }
  };

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h1 className="page-title">All Feedback</h1>
          {!isFiltered && (
            <span className="live-badge">
              <span className="live-dot" />
              Live
            </span>
          )}
        </div>
        <p className="page-subtitle">
          {isFiltered
            ? `Showing filtered results (${items.length})`
            : `Showing all feedback (${items.length})`}
        </p>
      </div>

      <form className="filter-bar" onSubmit={handleSearch}>
        <div>
          <label className="form-label" htmlFor="keyword">
            Search
          </label>
          <input
            id="keyword"
            type="text"
            className="form-input"
            placeholder="Search by name, program, or comment…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="rating">
            Rating
          </label>
          <select
            id="rating"
            className="form-select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">All ratings</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>
        <div>
          <label className="form-label" htmlFor="program">
            Program
          </label>
          <input
            id="program"
            type="text"
            className="form-input"
            placeholder="e.g. AFDE"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          {isFiltered && (
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          )}
        </div>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading…</div>
      ) : items.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-state-icon">🔍</div>
          <h3>No feedback found</h3>
          <p>{isFiltered ? 'Try adjusting your filters.' : 'No feedback has been submitted yet.'}</p>
        </div>
      ) : (
        <div className="feedback-list">
          {items.map((f) => (
            <FeedbackCard key={f.feedback_id} feedback={f} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </>
  );
}

export default FeedbackList;
