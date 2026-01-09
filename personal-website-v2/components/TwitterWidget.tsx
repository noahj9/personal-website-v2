"use client";

import React, { useEffect, useRef, useState } from "react";
import { TwitterWidgetProps } from "@/types";

const TwitterWidget: React.FC<TwitterWidgetProps> = ({
  username,
  tweetCount = 3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if script already exists
    let script = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]'
    ) as HTMLScriptElement;

    if (!script) {
      // Load Twitter widgets script
      script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.head.appendChild(script);
    }

    const handleLoad = () => {
      // Twitter widgets script loaded, render the timeline
      if (window.twttr && containerRef.current) {
        // Clear the container first
        containerRef.current.innerHTML = "";

        window.twttr.widgets
          .createTimeline(
            {
              sourceType: "profile",
              screenName: username,
            },
            containerRef.current,
            {
              height: 600,
              width: "100%",
              theme: "dark",
              chrome: "noheader,nofooter,noborders,transparent",
              tweetLimit: tweetCount,
              borderColor: "#1f2937",
              linkColor: "#06b6d4",
            }
          )
          .then(() => {
            setIsLoading(false);
          })
          .catch(() => {
            setHasError(true);
            setIsLoading(false);
          });
      }
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    if (window.twttr) {
      handleLoad();
    } else {
      script.onload = handleLoad;
      script.onerror = handleError;
    }

    // Timeout fallback
    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [username, tweetCount, isLoading]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-background-secondary rounded-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">@{username}</h3>
            <p className="text-sm text-foreground-secondary">Latest Tweets</p>
          </div>
          <a
            href={`https://twitter.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-accent-teal hover:text-accent-teal/80 transition-colors duration-200 text-sm font-medium"
          >
            View Profile →
          </a>
        </div>

        {/* Twitter Timeline Container */}
        <div className="p-4">
          {isLoading && (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-teal mx-auto mb-4"></div>
                <p className="text-foreground-secondary">Loading tweets...</p>
              </div>
            </div>
          )}

          {hasError && (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <p className="text-foreground-secondary mb-2">
                  Unable to load Twitter timeline
                </p>
                <a
                  href={`https://twitter.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-teal hover:text-accent-teal/80 transition-colors duration-200 text-sm font-medium"
                >
                  View @{username} on Twitter →
                </a>
              </div>
            </div>
          )}

          <div
            ref={containerRef}
            className={isLoading || hasError ? "hidden" : ""}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    twttr: {
      widgets: {
        createTimeline: (
          config: {
            sourceType: string;
            screenName: string;
          },
          element: HTMLElement,
          options: {
            height: number;
            width: string;
            theme: string;
            chrome: string;
            tweetLimit: number;
            borderColor: string;
            linkColor: string;
          }
        ) => Promise<HTMLElement>;
      };
    };
  }
}

export default TwitterWidget;
