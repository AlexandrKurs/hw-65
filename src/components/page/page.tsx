import React from "react";

interface PageProps {
  title: string;
  content: string;
}

const Page: React.FC<PageProps> = ({ title, content }) => {
  return (
    <div className="container mt-4">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Page;
