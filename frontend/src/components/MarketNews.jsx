
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Newspaper,
  RefreshCw,
  Clock3,
  AlertCircle,
} from "lucide-react";

import "./MarketNews.css";

const categories = [
  "All News",
  "Crypto",
  "Forex",
  "Commodities",
  "Economy",
];

const NEWS_ENDPOINT = "/api/news";

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function isSafeUrl(value) {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export default function MarketNews() {
  const [activeCategory, setActiveCategory] =
    useState("All News");

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  async function fetchNews(signal) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(NEWS_ENDPOINT, {
        signal,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("News service unavailable.");
      }

      const data = await response.json();

      if (!Array.isArray(data.articles)) {
        throw new Error("Invalid news response.");
      }

      const validArticles = data.articles.filter(
        (article) =>
          article &&
          typeof article.title === "string" &&
          typeof article.category === "string" &&
          isSafeUrl(article.url)
      );

      if (signal?.aborted) return;

      setArticles(validArticles);
      setLastUpdated(new Date());
    } catch (err) {
      if (signal?.aborted || err.name === "AbortError") {
        return;
      }

      setArticles([]);
      setError(
        "Market news is currently unavailable. Please try again later."
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchNews(controller.signal);

    return () => controller.abort();
  }, []);

  const filteredArticles =
    activeCategory === "All News"
      ? articles
      : articles.filter(
          (article) => article.category === activeCategory
        );

  return (
    <section className="market-news-section" id="news">
      <div className="container">
        <div className="market-news-heading">
          <div>
            <div className="market-news-eyebrow">
              <Newspaper size={16} />
              PLATINUM INTELLIGENCE
            </div>

            <h2>
              Intelligence that moves
              <span> with the markets.</span>
            </h2>

            <p>
              Follow important developments across global
              financial markets, digital assets, currencies,
              commodities, and the wider economy.
            </p>
          </div>

          <button
            className="market-news-refresh"
            type="button"
            onClick={() => fetchNews()}
            disabled={loading}
          >
            <RefreshCw
              size={16}
              className={loading ? "news-spinning" : ""}
            />
            {loading ? "Updating..." : "Refresh News"}
          </button>
        </div>

        <div
          className="market-news-categories"
          aria-label="News categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "market-news-category active"
                  : "market-news-category"
              }
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="market-news-status" role="status">
            <RefreshCw
              size={26}
              className="news-spinning"
            />
            <h3>Loading market intelligence</h3>
            <p>Connecting to the financial news service...</p>
          </div>
        ) : error ? (
          <div className="market-news-status" role="status">
            <AlertCircle size={30} />
            <h3>Market intelligence is coming online</h3>
            <p>{error}</p>
            <button
              type="button"
              onClick={() => fetchNews()}
              className="market-news-retry"
            >
              Try Again
            </button>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="market-news-status">
            <Newspaper size={30} />
            <h3>No articles available</h3>
            <p>
              There are currently no articles in this category.
            </p>
          </div>
        ) : (
          <div className="market-news-grid">
            {filteredArticles.map((article, index) => (
              <article
                className={
                  index === 0
                    ? "market-news-card featured"
                    : "market-news-card"
                }
                key={article.id ?? article.url}
              >
                {isSafeUrl(article.image) && (
                  <div className="market-news-image">
                    <img
                      src={article.image}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="market-news-card-content">
                  <span className="market-news-tag">
                    {article.category}
                  </span>

                  <h3>{article.title}</h3>

                  {article.description && (
                    <p>{article.description}</p>
                  )}

                  <div className="market-news-card-footer">
                    <div className="market-news-meta">
                      <span>
                        {article.source || "News publisher"}
                      </span>
                      <span>
                        <Clock3 size={13} />
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read article: ${article.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="market-news-bottom">
          <span>
            <span className="market-news-live-dot" />
            {lastUpdated
              ? `Last checked: ${formatDate(lastUpdated)}`
              : "Awaiting news connection"}
          </span>

          <span>
            News is informational and not financial advice.
          </span>
        </div>
      </div>
    </section>
  );
}
