import { statsigAdapter, type StatsigUser } from "@flags-sdk/statsig";
import { flag, dedupe } from "flags/next";
import type { Identify } from "flags";

// Default flag values for fallback behavior
const DEFAULT_FLAG_VALUES: Record<string, boolean> = {
  substack_widget_enabled: true,
  twitter_widget_enabled: true,
  mail_animation_enabled: true,
  text_flip_animation_enabled: true,
};

// Flag cache for performance optimization
const flagCache = new Map<string, { value: boolean; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds cache

// Identify function for website visitors
export const identify = dedupe((async () => ({
  userID: "website-visitor", // Static ID for personal website
  // Additional properties can be added for analytics
})) satisfies Identify<StatsigUser>);

// Enhanced helper function to create feature flags with error handling and caching
export const createFeatureFlag = (key: string) => {
  // Check cache first
  const cachedValue = getCachedFlag(key);
  if (cachedValue !== null) {
    logFlagEvaluation(key, cachedValue);
    return cachedValue;
  }

  try {
    return flag<boolean, StatsigUser>({
      key,
      adapter: statsigAdapter.featureGate(
        (gate) => {
          const value = gate.value;
          setCachedFlag(key, value);
          logFlagEvaluation(key, value);
          return value;
        },
        {
          exposureLogging: true,
        }
      ),
      identify,
    });
  } catch (error) {
    console.warn(`Feature flag ${key} failed to load:`, error);
    const fallbackValue = DEFAULT_FLAG_VALUES[key] ?? true;
    setCachedFlag(key, fallbackValue);
    logFlagEvaluation(key, fallbackValue, error as Error);
    return fallbackValue;
  }
};

// Cache management functions
function getCachedFlag(key: string): boolean | null {
  const cached = flagCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.value;
  }
  return null;
}

function setCachedFlag(key: string, value: boolean): void {
  flagCache.set(key, { value, timestamp: Date.now() });
}

// Logging function for debugging
function logFlagEvaluation(key: string, value: boolean, error?: Error): void {
  if (process.env.NODE_ENV === "development") {
    if (error) {
      console.log(`[Feature Flag] ${key}: ${value} (fallback due to error)`);
    } else {
      console.log(`[Feature Flag] ${key}: ${value}`);
    }
  }
}

// Specific feature flags for widgets and animations
export const substackWidgetFlag = () =>
  createFeatureFlag("substack_widget_enabled");

export const twitterWidgetFlag = () =>
  createFeatureFlag("twitter_widget_enabled");

export const mailAnimationFlag = () =>
  createFeatureFlag("mail_animation_enabled");

export const textFlipAnimationFlag = () =>
  createFeatureFlag("text_flip_animation_enabled");

// Utility function to clear cache (useful for testing)
export const clearFlagCache = (): void => {
  flagCache.clear();
};

// Utility function to get all cached flags (useful for debugging)
export const getCachedFlags = (): Record<string, boolean> => {
  const result: Record<string, boolean> = {};
  flagCache.forEach((value, key) => {
    result[key] = value.value;
  });
  return result;
};
