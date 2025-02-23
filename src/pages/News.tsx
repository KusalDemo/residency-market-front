import React, { useEffect, useState } from 'react';
import {Article} from "../types";
import Loading from "../components/Loading.tsx";


const TourismNews: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNews = async () => {
        const url = `https://newsapi.org/v2/everything?q=hotels&from=2025-02-21&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === 'ok') {
                setArticles(data.articles);
            } else {
                setError('Failed to fetch news.');
            }
        } catch (err) {
            setError('An error occurred while fetching news.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-10 flex flex-col items-center" >
                <Loading /> Loading news...
            </div>
            )
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 py-16">
                <h1 className="text-3xl font-bold text-center mb-12">Tourism News</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {article.urlToImage && (
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                                    {article.title}
                                </h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    {article.description}
                                </p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Read more
                                </a>
                                <p className="text-xs text-gray-500 mt-4">
                                    Source: {article.source.name} | Published: {new Date(article.publishedAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TourismNews;
