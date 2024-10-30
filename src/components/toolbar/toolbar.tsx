import React from 'react';
import { Link } from 'react-router-dom';

interface ToolbarProps {
  pages: Record<string, { title: string }>;
}

const Toolbar: React.FC<ToolbarProps> = ({ pages }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', padding: '10px', backgroundColor: '#f1f1f1' }}>
      {Object.keys(pages).map((key) => (
        <Link key={key} to={`/pages/${key}`} style={{ textDecoration: 'none', color: '#333' }}>
          <button>{pages[key].title}</button>
        </Link>
      ))}
    </div>
  );
};

export default Toolbar;