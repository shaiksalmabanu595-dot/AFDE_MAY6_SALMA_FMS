import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService.js';
import FeedbackCard from '../components/FeedbackCard.jsx';

/**
 * Dashboard — landing page with live stats and the most recent feedback.
 *
 * Polls the backend every 5 seconds for real-time updates so the UI
 * always reflects the latest feedback without needing a manual refresh.
 */
function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const [statsData, listData] = await Promise.all([
        feedbackService.getStatistics(),
        feedbackService.listAll(),
      ]);
      setStats(statsData);
      setRecent(listData.slice(0, 6));
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // Real-time polling — refreshes the dashboard every 5 seconds.
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleDelete = async (id) => {
    try {
      await feedbackService.remove(id);
      await loadData();
    } catch {
      setError('Failed to delete feedback.');
    }
  };

  if (loading) return <div className="loading">Loading dashboard…</div>;

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h1 className="page-title">Dashboard</h1>
          <span className="live-badge">
            <span className="live-dot" />
            Live
          </span>
        </div>
        <p className="page-subtitle">
          Real-time overview of feedback activity
          {lastUpdated && (
            <> · Last updated {lastUpdated.toLocaleTimeString()}</>
          )}
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Feedback</div>
          <div className="stat-value">{stats?.total_feedback ?? 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Rating</div>
          <div className="stat-value success">
            {stats?.average_rating ?? 0} <span style={{ fontSize: '1rem' }}>/ 5</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">5-Star Reviews</div>
          <div className="stat-value warning">{stats?.rating_distribution?.['5'] ?? 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Quick Action</div>
          <Link to="/submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
            + Submit Feedback
          </Link>
        </div>
      </div>

      {stats && stats.total_feedback > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Rating Distribution</h3>
          <div className="distribution">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.rating_distribution[String(star)] || 0;
              const pct = stats.total_feedback > 0 ? (count / stats.total_feedback) * 100 : 0;
              return (
                <div className="dist-row" key={star}>
                  <span>{star} ★</span>
                  <div className="dist-bar-track">
                    <div className="dist-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="dist-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="page-header" style={{ marginTop: '1rem' }}>
        <h2 className="page-title" style={{ fontSize: '1.4rem' }}>
          Recent Feedback
        </h2>
        <p className="page-subtitle">The latest entries submitted by participants</p>
      </div>

      {recent.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-state-icon">📝</div>
          <h3>No feedback yet</h3>
          <p>
            Be the first to{' '}
            <Link to="/submit" style={{ color: 'var(--primary)' }}>
              submit feedback
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="feedback-list">
          {recent.map((f) => (
            <FeedbackCard key={f.feedback_id} feedback={f} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </>
  );
}

export default Dashboard;
