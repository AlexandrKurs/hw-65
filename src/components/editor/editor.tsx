import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFetchPages } from '../../hooks/useFetchPages.ts';

const axiosApi = axios.create({
  baseURL: "https://alexandrk-server-default-rtdb.europe-west1.firebasedatabase.app/",
});

const Editor: React.FC = () => {
  const { pages, loading, error } = useFetchPages();
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
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
      console.error('Ошибка при сохранении данных', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Edit pages</h1>
      <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
        <option value="">Select page</option>
        {Object.keys(pages).map((key) => (
          <option key={key} value={key}>
            {pages[key].title}
          </option>
        ))}
      </select>

      {selectedPage && (
        <div>
          <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Content:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Editor;