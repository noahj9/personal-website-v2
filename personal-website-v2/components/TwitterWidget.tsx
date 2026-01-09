"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TwitterWidgetProps } from "@/types";

interface Tweet {
  id: string;
  text: string;
  created_at: string;
  author: {
    name: string;
    username: string;
    profile_image_url: string;
  };
  public_metrics: {
    retweet_count: number;
    like_count: number;
    reply_count: number;
  };
  entities?: {
    urls?: Array<{
      url: string;
      expanded_url: string;
      display_url: string;
    }>;
  };
}

const TwitterWidget: React.FC<TwitterWidgetProps> = ({
  username,
  tweetCount = 3,
}) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Twitter icon component
  const TwitterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  // Format tweet text with links
  const formatTweetText = (text: string, entities?: Tweet["entities"]) => {
    let formattedText = text;

    // Replace URLs with clickable links
    if (entities?.urls) {
      entities.urls.forEach((url) => {
        formattedText = formattedText.replace(
          url.url,
          `<a href="${url.expanded_url}" target="_blank" rel="noopener noreferrer" class="text-accent-teal hover:text-accent-teal-light underline">${url.display_url}</a>`
        );
      });
    }

    // Replace @mentions with links
    formattedText = formattedText.replace(
      /@(\w+)/g,
      '<a href="https://twitter.com/$1" target="_blank" rel="noopener noreferrer" class="text-accent-teal hover:text-accent-teal-light">@$1</a>'
    );

    // Replace hashtags with links
    formattedText = formattedText.replace(
      /#(\w+)/g,
      '<a href="https://twitter.com/hashtag/$1" target="_blank" rel="noopener noreferrer" class="text-accent-teal hover:text-accent-teal-light">#$1</a>'
    );

    return formattedText;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60)
      );

      if (diffInHours < 1) {
        const diffInMinutes = Math.floor(
          (now.getTime() - date.getTime()) / (1000 * 60)
        );
        return `${diffInMinutes}m`;
      } else if (diffInHours < 24) {
        return `${diffInHours}h`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d`;
      }
    } catch {
      return dateString;
    }
  };

  // Format numbers for display (e.g., 1.2K, 1.5M)
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Fetch tweets
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setLoading(true);
        setError(null);

        // Note: In a real implementation, you would need Twitter API v2 access
        // This would typically be done through a backend API to avoid exposing API keys
        // For now, we'll simulate with mock data

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

        // Mock tweet data for development/demo purposes
        const mockTweets: Tweet[] = [
          {
            id: "1",
            text: "Just shipped a new feature! Really excited about the improvements to user experience. Check it out and let me know what you think! #webdev #react",
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            author: {
              name: "Your Name",
              username: username,
              profile_image_url: "/assets/images/profile.jpg",
            },
            public_metrics: {
              retweet_count: 12,
              like_count: 45,
              reply_count: 8,
            },
          },
          {
            id: "2",
            text: "Working on some exciting projects lately. The intersection of design and technology never ceases to amaze me. What's everyone else building?",
            created_at: new Date(
              Date.now() - 1 * 24 * 60 * 60 * 1000
            ).toISOString(), // 1 day ago
            author: {
              name: "Your Name",
              username: username,
              profile_image_url: "/assets/images/profile.jpg",
            },
            public_metrics: {
              retweet_count: 5,
              like_count: 23,
              reply_count: 12,
            },
          },
          {
            id: "3",
            text: "Great article on modern web development practices. Highly recommend giving it a read if you're interested in performance optimization.",
            created_at: new Date(
              Date.now() - 3 * 24 * 60 * 60 * 1000
            ).toISOString(), // 3 days ago
            author: {
              name: "Your Name",
              username: username,
              profile_image_url: "/assets/images/profile.jpg",
            },
            public_metrics: {
              retweet_count: 8,
              like_count: 31,
              reply_count: 4,
            },
          },
        ];

        setTweets(mockTweets.slice(0, tweetCount));
      } catch (err) {
        console.error("Error fetching tweets:", err);
        setError("Unable to load recent tweets");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchTweets();
    }
  }, [username, tweetCount]);

  return (
    <div
      ref={widgetRef}
      className="w-full max-w-2xl mx-auto p-6 rounded-lg border bg-background-secondary border-border text-foreground"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <TwitterIcon />
          </div>
          <h3 className="text-xl font-semibold text-blue-400">Latest Tweets</h3>
        </div>
        <p className="text-sm text-foreground-secondary">
          Recent updates from @{username}
        </p>
      </div>

      {/* Tweet Timeline */}
      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-3 mb-3">
                <div className="w-10 h-10 bg-background-tertiary rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-background-tertiary rounded mb-2" />
                  <div className="h-3 bg-background-tertiary rounded w-1/4" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-background-tertiary rounded" />
                <div className="h-3 bg-background-tertiary rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <div className="text-foreground-secondary mb-2">
            <TwitterIcon />
          </div>
          <p className="text-sm text-foreground-secondary">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-accent-teal hover:text-accent-teal-light transition-colors duration-200"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {tweets.map((tweet) => (
            <article
              key={tweet.id}
              className="border-b border-border last:border-b-0 pb-6 last:pb-0"
            >
              {/* Tweet Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={tweet.author.profile_image_url}
                    alt={`${tweet.author.name} profile`}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground truncate">
                      {tweet.author.name}
                    </span>
                    <span className="text-foreground-secondary text-sm truncate">
                      @{tweet.author.username}
                    </span>
                    <span className="text-foreground-muted text-sm">·</span>
                    <time className="text-foreground-muted text-sm">
                      {formatDate(tweet.created_at)}
                    </time>
                  </div>
                </div>
              </div>

              {/* Tweet Content */}
              <div className="mb-3">
                <p
                  className="text-foreground text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatTweetText(tweet.text, tweet.entities),
                  }}
                />
              </div>

              {/* Tweet Actions */}
              <div className="flex items-center gap-6 text-foreground-secondary">
                <button className="flex items-center gap-1 text-xs hover:text-blue-400 transition-colors duration-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {formatNumber(tweet.public_metrics.reply_count)}
                </button>

                <button className="flex items-center gap-1 text-xs hover:text-green-400 transition-colors duration-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {formatNumber(tweet.public_metrics.retweet_count)}
                </button>

                <button className="flex items-center gap-1 text-xs hover:text-red-400 transition-colors duration-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {formatNumber(tweet.public_metrics.like_count)}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <a
          href={`https://twitter.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
        >
          View profile on Twitter →
        </a>
      </div>
    </div>
  );
};

export default TwitterWidget;
