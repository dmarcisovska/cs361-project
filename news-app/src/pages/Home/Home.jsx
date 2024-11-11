import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [noResults, setNoResults] = useState(false);   
  const [currentDate, setCurrentDate] = useState(""); 

  const fetchDate = async () => {
    try {
      await axios.get("http://localhost:4000/api/date"); 
    } catch (error) {
      console.error("Failed to fetch date:", error);
      setCurrentDate("Unavailable");
    }
  };

  useEffect(() => {
    fetchNews(latestNewsUrl);
    fetchDate();
  }, []);




  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  // const apiKey = "badKey"


  const latestNewsUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`;

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

 

  const handleReadMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  return (
    <>
    <p className="flex justify-center mt-4 text-gray-700 dark:text-gray-300">
  {currentDate ? `Today's Date: ${currentDate}` : "Loading date..."}
</p>
      <div className="mt-10">
      <h1 className="flex justify-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white mt-12">
        home
        <mark className="ml-2 mr-2 px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
          of the
        </mark>
        latest news
      </h1>
       
        {!noResults && (
          <div style={{ justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
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
        <div>
          
        </div>
        {loading && <p className="flex justify-center mt-8">Loading news...</p>}
        {error && <p className="flex justify-center text-red-500 mt-2">{error}</p>}
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

export default Home;
