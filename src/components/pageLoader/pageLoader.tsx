import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchPages } from '../../hooks/useFetchPages.ts';
import Page from '../page/page.tsx';


const PageLoader: React.FC = () => {
  const { pageName } = useParams<{ pageName: string }>();
  const { pages, loading, error } = useFetchPages();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const page = pages[pageName || ''];

  return (
    <div>
      {page ? (
        <Page title={page.title} content={page.content} />
      ) : (
        <div>Page not found</div>
      )}
    </div>
  );
};

export default PageLoader;