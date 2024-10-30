import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useFetchPages } from "./hooks/useFetchPages";
import Toolbar from "./components/toolbar/toolbar.tsx";
import PageLoader from "./components/pageLoader/pageLoader.tsx";
import Editor from "./components/editor/editor.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const { pages, loading, error } = useFetchPages();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Router>
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h1>Welcome! Select page</h1>
        </div>
        <Toolbar pages={pages} />
        <Routes>
          <Route path="/pages/:pageName" element={<PageLoader />} />
          <Route path="/pages/admin" element={<Editor />} />
          <Route path="/" element={<div>Welcome! Select page</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;