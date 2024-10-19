import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [noResults, setNoResults] = useState(false);

  const apiKey = "h2-jm5zd4fi5AM1alIEHvMVVmIUP-I2O_-NSNYiKoolaynfz";
  const latestNewsUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`;
  const searchNewsUrl = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${query}`;


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

        {/* Show error if fetching news fails */}
        {error && <p>{error}</p>}

        {/* Show "no results" message if no articles are found */}
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
  )
};

export default Home;
