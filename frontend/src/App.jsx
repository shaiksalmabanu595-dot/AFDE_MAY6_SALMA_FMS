import { Routes, Route, NavLink, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import SubmitFeedback from './pages/SubmitFeedback.jsx';
import FeedbackList from './pages/FeedbackList.jsx';
import FeedbackDetail from './pages/FeedbackDetail.jsx';
import EditFeedback from './pages/EditFeedback.jsx';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="brand">
            <span className="brand-icon">F</span>
            Feedback Management System
          </Link>
          <ul className="nav-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/feedback" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                All Feedback
              </NavLink>
            </li>
            <li>
              <NavLink to="/submit" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Submit Feedback
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/feedback" element={<FeedbackList />} />
          <Route path="/feedback/:id" element={<FeedbackDetail />} />
          <Route path="/feedback/:id/edit" element={<EditFeedback />} />
          <Route path="/submit" element={<SubmitFeedback />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>
          Feedback Management System &copy; {new Date().getFullYear()} &middot; AFDE Capstone Project &middot;
          Built with React + FastAPI
        </p>
      </footer>
    </div>
  );
}

export default App;
