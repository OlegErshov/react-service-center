import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import './styles/news.css';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:4444/news');
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error.message);
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            <Header />
            <div className="faq-container">
                {news.map((item) => (
                    <article key={item.id} className="news">
                        <h3 className="news_title">{item.title}</h3>
                        <p className="news_briefDescription">{item.briefDescription}</p>
                        <a href={item.Url}>Read whole article</a>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default News;