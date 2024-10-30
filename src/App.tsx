import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useFetchPages } from './hooks/useFetchPages';
import Toolbar from "./components/toolbar/toolbar.tsx";
import PageLoader from "./components/pageLoader/pageLoader.tsx";

const App: React.FC = () => {
    const { pages, loading, error } = useFetchPages();

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Router>
            <Toolbar pages={pages} />
            <Routes>
                <Route path="/pages/:pageName" element={<PageLoader />} />
                <Route path="/" element={<div>Добро пожаловать! Выберите страницу.</div>} />
            </Routes>
        </Router>
    );
};

export default App;