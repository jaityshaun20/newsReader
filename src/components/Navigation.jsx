import { Link, useLocation } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from "../context/AuthContext";


function Navigation() {
  const location = useLocation();
  const { getUserSavedArticles } = useArticles();
  const savedArticles = getUserSavedArticles();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
            >
              Search
            </Link>
            {/* ⚠️ SECURITY ISSUE: No authentication required to access saved articles */}
            <Link 
              to="/saved" 
              className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}
            >
              Saved Articles ({savedArticles.length})
            </Link>
          </div>
        </div>
        {/* ⚠️ SECURITY ISSUE: No login/logout functionality */}
        <div className="nav-user">
          {isAuthenticated() ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span>Welcome, {user.username}</span>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}

          {isAdmin() && (
            <Link 
              to="/admin" 
              className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
            >
              Admin
            </Link>
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Navigation;