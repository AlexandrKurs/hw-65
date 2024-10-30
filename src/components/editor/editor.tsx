import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchPages } from "../../hooks/useFetchPages";
import axiosApi from "../../axiosApi";

const Editor: React.FC = () => {
  const { pages, loading, error } = useFetchPages();
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPage && pages[selectedPage]) {
      setTitle(pages[selectedPage].title);
      setContent(pages[selectedPage].content);
    }
  }, [selectedPage, pages]);

  const handleSave = async () => {
    try {
      await axiosApi.put(`/pages/${selectedPage}.json`, {
        title,
        content,
      });
      navigate(`/pages/${selectedPage}`);
    } catch (err) {
      console.error("Error saving data", err);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Edit Pages</h3>
      <div className="mb-3">
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="form-select"
        >
          <option value="">Select page</option>
          {Object.keys(pages).map((key) => (
            <option key={key} value={key}>
              {pages[key].title}
            </option>
          ))}
        </select>
      </div>

      {selectedPage && (
        <div className="mb-4">
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control"
            />
          </div>
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Editor;
