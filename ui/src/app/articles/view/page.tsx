'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ViewArticlePage = () => {
  const router = useRouter();
  interface Article {
    id: number;
    title: string;
    description: string;
    body: string;
  }

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3002/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <button
              onClick={() => router.push(`/articles/${article.id}`)}
              className="text-blue-600 hover:underline"
            >
              Read More
            </button>
          </div>
          
        ))}
      </div>
        <button
            onClick={() => router.push('/articles/create')}
            className="mt-8 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
            Create New Article
        </button>
        {/* Logout button */}
        <button
            onClick={() => {
                localStorage.removeItem('accessToken');
                router.push('/');
            }}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >   
            Logout
        </button>
        
    </div>
  );
};

export default ViewArticlePage;