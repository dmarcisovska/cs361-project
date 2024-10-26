import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [noResults, setNoResults] = useState(false);
  const [searched, setSearched] = useState(false); 
  const [emptyQueryError, setEmptyQueryError] = useState(false); // New state for empty search query error
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  // const apiKey = "badKey"

  const searchNewsUrl = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${query}`;

  const fetchNews = async (url) => {
    setLoading(true);
    setError(null);
    setNoResults(false);
    setArticles([]);
    setEmptyQueryError(false);

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
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchNews = () => {
    if (query.trim() === "") {
      setEmptyQueryError(true); // Set error when no query is entered
    } else {
      setSearched(true); 
      fetchNews(searchNewsUrl);
      setVisibleCount(9);
    }
  };

  const handleReadMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  return (
    <>
      <h1 className="flex justify-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white mt-12">
        search
        <mark className="ml-2 mr-2 px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
          for the
        </mark>
        latest news
      </h1>
      <p className="flex justify-center text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-200">
        Use the search bar below to search for a news topic of your choice.
      </p>

      <div className="max-w-md mx-auto mt-6">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={query}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search news articles"
            required
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchNews}
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
        {emptyQueryError && (
          <p className="flex justify-center	text-red-500 mt-2">Please enter a search term.</p>
        )}
      </div>

      <div>
        {loading && <p className="flex justify-center mt-8">Loading news...</p>}
        {error && <p className="flex justify-center text-red-500 mt-2">{error}</p>}

        {searched && noResults && !loading && !error && (
          <p className="flex justify-center text-red-500 mt-2">No results found. Please try another search.</p>
        )}

        {searched && !noResults && articles.length > 0 && (
          <div style={{ justifyContent: "center" }} className="mt-12">
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              {articles.slice(0, visibleCount).map((article, index) => (
                <div
                  key={index}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{ margin: "10px" }}
                >
                  <a href="#">
                    <img
                      className="rounded-t-lg"
                      src={article.image}
                      alt={article.title}
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {article.title}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {article.description}
                    </p>
                    <a
                      href={article.url}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {visibleCount < articles.length && (
          <div className="flex justify-center">
          <button
            onClick={handleReadMore}
            type="button"
            className="mb-12 mt-12 px-5 py-3 text-base font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Load More Articles
          </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
