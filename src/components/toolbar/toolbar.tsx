import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface ToolbarProps {
  pages: Record<string, { title: string }>;
}

const Toolbar: React.FC<ToolbarProps> = ({ pages }) => {
  return (
    <div className="d-flex gap-2 p-3 bg-light">
      {Object.keys(pages).map((key) => (
        <Link
          key={key}
          to={`/pages/${key}`}
          className="text-decoration-none text-dark"
        >
          <button className="btn btn-outline-primary">
            {pages[key].title}
          </button>
        </Link>
      ))}
      <Link to="/pages/admin" className="text-decoration-none text-dark">
        <button className="btn btn-outline-danger">Admin</button>
      </Link>
    </div>
  );
};

export default Toolbar;
