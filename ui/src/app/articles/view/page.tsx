'use client'
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
    },[]);
    return(
        <div>
            <ul>
                {articles.map((article) => (
                    <li key={article.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-xl font-bold">{article.title}</h2>
                        <p className="text-gray-700">{article.description}</p>
                        <p className="text-gray-500">{article.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewArticlePage;