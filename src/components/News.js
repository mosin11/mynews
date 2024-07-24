import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem'; // Ensure you have this component
import Spinner from './Spinner'; // Ensure you have this component
import InfiniteScroll from 'react-infinite-scroll-component';
import latestImg from './img/latest-news.jpg'

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const pageSize = 12; // Number of articles per page

    useEffect(() => {
        fetchArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]); // Fetch articles when currentPage changes

    const fetchArticles = async () => {
        try {
            const response = await fetch('http://localhost:5000/rss'); // Your backend endpoint
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setArticles(prevArticles => prevArticles.concat(data)); // Append new articles
            setTotalResults(data.length); // Assuming you have a total count or length
            setLoading(false);

            // Capitalize category for the document title
            const str = `${props.category}`;
            const newStr = str.split(' ')
                .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');
            document.title = `${newStr} - News Feed`;
        } catch (error) {
            console.error('Error fetching articles:', error);
            setLoading(false);
        }
    };

    const fetchMoreArticles = () => {
        setCurrentPage(currentPage + 1); // Increment page number to fetch more
    };

    return (
        <div className='container my-3'>
            <h1 className='text-center'>News Feed</h1>
            {loading && currentPage === 1 ? (
                <Spinner />
            ) : (
                <div className="row">
                    {/* <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreArticles}
                        hasMore={articles.length < totalResults}
                        loader={<h4>Loading...</h4>}
                    > */}
                        {articles.map((article, index) => (
                            <div className="col-md-4" key={index}>
                                <NewsItem
                                    title={article.title}
                                    description={article.contentSnippet || ''}
                                    imageURL={article.enclosure?.url || latestImg}
                                    newsURL={article.link}
                                    author={article.creator || 'Unknown'}
                                    date={article.pubDate}
                                    source={article.source || 'Unknown'}
                                />
                            </div>
                        ))}
                    {/* </InfiniteScroll> */}
                </div>
            )}
        </div>
    );
};

export default News;
