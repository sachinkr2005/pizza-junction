import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-page text-center py-5">
      <h1 className="display-1 fw-bold text-muted">404</h1>
      <h2 className="fw-semibold mb-3">Page Not Found</h2>
      <p className="text-secondary mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link className="btn btn-warning-custom px-4" to="/home">
        Back to Home
      </Link>
    </div>
  );
}
