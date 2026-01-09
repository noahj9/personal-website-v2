"use client";

import React, { useState, useEffect } from "react";
import { SubstackWidgetProps } from "@/types";

interface SubstackPost {
  id: string;
  title: string;
  subtitle: string;
  post_date: string;
  canonical_url: string;
}

const SubstackWidget: React.FC<SubstackWidgetProps> = ({
  substackUrl,
  theme = "dark",
}) => {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");

  // Extract publication name from URL
  const getPublicationName = (url: string) => {
    try {
      const urlObj = new URL(url);
      const subdomain = urlObj.hostname.split(".")[0];
      return subdomain.charAt(0).toUpperCase() + subdomain.slice(1);
    } catch {
      return "Newsletter";
    }
  };

  const publicationName = getPublicationName(substackUrl);

  // Fetch recent posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Note: In a real implementation, you would need to handle CORS
        // This is a simplified version that would work with a proxy or server-side fetch
        const response = await fetch(`${substackUrl}/api/v1/posts?limit=3`);

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Error fetching Substack posts:", err);
        setError("Unable to load recent posts");
        // Set mock data for development/demo purposes
        setPosts([
          {
            id: "1",
            title: "Latest Newsletter Post",
            subtitle: "A brief description of the latest newsletter content...",
            post_date: "2024-01-15",
            canonical_url: `${substackUrl}/p/latest-post`,
          },
          {
            id: "2",
            title: "Previous Newsletter",
            subtitle: "Another interesting post from the newsletter archive...",
            post_date: "2024-01-08",
            canonical_url: `${substackUrl}/p/previous-post`,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (substackUrl) {
      fetchPosts();
    }
  }, [substackUrl]);

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setSubscribeMessage("Please enter a valid email address");
      return;
    }

    setSubscribing(true);
    setSubscribeMessage("");

    try {
      // Note: In a real implementation, this would integrate with Substack's API
      // For now, we'll simulate the subscription process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubscribeMessage(
        "Thanks for subscribing! Check your email to confirm."
      );
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      setSubscribeMessage("Something went wrong. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div
      className={`w-full max-w-2xl mx-auto p-6 rounded-lg border ${
        theme === "dark"
          ? "bg-background-secondary border-border text-foreground"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-accent-teal rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-accent-teal">
            {publicationName} Newsletter
          </h3>
        </div>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-foreground-secondary" : "text-gray-600"
          }`}
        >
          Stay updated with the latest posts and insights
        </p>
      </div>

      {/* Subscription Form */}
      <div className="mb-6">
        <form onSubmit={handleSubscribe} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`flex-1 px-3 py-2 rounded border text-sm ${
                theme === "dark"
                  ? "bg-background-tertiary border-border text-foreground placeholder-foreground-secondary"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-transparent`}
              disabled={subscribing}
            />
            <button
              type="submit"
              disabled={subscribing}
              className="px-4 py-2 bg-accent-teal text-white rounded text-sm font-medium hover:bg-accent-teal-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {subscribing ? "..." : "Subscribe"}
            </button>
          </div>
          {subscribeMessage && (
            <p
              className={`text-xs ${
                subscribeMessage.includes("Thanks")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {subscribeMessage}
            </p>
          )}
        </form>
      </div>

      {/* Recent Posts */}
      <div>
        <h4
          className={`text-lg font-medium mb-4 ${
            theme === "dark" ? "text-foreground" : "text-gray-900"
          }`}
        >
          Recent Posts
        </h4>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div
                  className={`h-4 rounded mb-2 ${
                    theme === "dark" ? "bg-background-tertiary" : "bg-gray-200"
                  }`}
                />
                <div
                  className={`h-3 rounded w-3/4 ${
                    theme === "dark" ? "bg-background-tertiary" : "bg-gray-200"
                  }`}
                />
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            className={`text-sm ${
              theme === "dark" ? "text-foreground-secondary" : "text-gray-600"
            }`}
          >
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.id} className="group">
                <a
                  href={post.canonical_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h5
                    className={`font-medium text-sm mb-1 group-hover:text-accent-teal transition-colors duration-200 ${
                      theme === "dark" ? "text-foreground" : "text-gray-900"
                    }`}
                  >
                    {post.title}
                  </h5>
                  <p
                    className={`text-xs mb-2 line-clamp-2 ${
                      theme === "dark"
                        ? "text-foreground-secondary"
                        : "text-gray-600"
                    }`}
                  >
                    {post.subtitle}
                  </p>
                  <time
                    className={`text-xs ${
                      theme === "dark"
                        ? "text-foreground-muted"
                        : "text-gray-500"
                    }`}
                  >
                    {formatDate(post.post_date)}
                  </time>
                </a>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <p
            className={`text-sm ${
              theme === "dark" ? "text-foreground-secondary" : "text-gray-600"
            }`}
          >
            No recent posts available
          </p>
        )}
      </div>

      {/* View All Link */}
      <div className="mt-6 pt-4 border-t border-border">
        <a
          href={substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent-teal hover:text-accent-teal-light transition-colors duration-200 font-medium"
        >
          View all posts →
        </a>
      </div>
    </div>
  );
};

export default SubstackWidget;
