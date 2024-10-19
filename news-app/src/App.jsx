import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [noResults, setNoResults] = useState(false);

  const apiKey = "h2-jm5zd4fi5AM1alIEHvMVVmIUP-I2O_-NSNYiKoolaynfz";
  const latestNewsUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`;
  const searchNewsUrl = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${query}`;

  const fetchNews = async (url) => {
    setLoading(true);
    setError(null);
    setNoResults(false);
    setArticles([]);

    try {
      const response = await axios.get(url);
      console.log("API Response:", response);

      if (!response.data || !response.data.news) {
        setNoResults(true); 
        setArticles([]);
        console.log("No news array returned from API or response is empty.");
      } else {
        const newsData = response.data.news;

   
        console.log("News Data:", newsData);

        const filteredArticles = newsData.filter(
          (article) => article.image && article.image !== "None"
        );

        console.log("Filtered Articles:", filteredArticles);

        setArticles(filteredArticles); 

      
        if (filteredArticles.length === 0) {
          setNoResults(true);
          console.log("No valid articles with images found.");
        }
      }
    } catch (err) {
      setError("Failed to fetch news articles");
      console.error("Error fetching news:", err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(latestNewsUrl);
    console.log("noResults:", noResults);
    console.log("loading:", loading);
    console.log("error:", error);
  }, []);

  const searchNews = () => {
    if (query.trim() !== "") {
      fetchNews(searchNewsUrl);
      setVisibleCount(10);
    }
  };

  const handleReadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  // If loading, show the loading message
  // if (loading) return <p>Loading news...</p>;

  return (
    <>
      <div>
        <h1>today news</h1>

        {noResults && !loading && !error && (
          <p>No results found. Please try another search.</p>
        )}
        <input
          type="text"
          placeholder="Search news articles"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchNews}>Search</button>

  
        {error && <p>{error}</p>}

  
        {noResults && !loading && (
          <p>No results found for. Please try another search. TEST</p>
        )}

        {!noResults && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {articles.slice(0, visibleCount).map((article, index) => (
              <div key={index} style={{ width: "300px", margin: "10px" }}>
                <img
                  src={article.image}
                  alt={article.title}
                  style={{ width: "100%" }}
                />
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read Full Article
                </a>
              </div>
            ))}
          </div>
        )}
        {visibleCount < articles.length && (
          <button onClick={handleReadMore}>Read More</button>
        )}
      </div>
    </>
  );
}

export default App;
