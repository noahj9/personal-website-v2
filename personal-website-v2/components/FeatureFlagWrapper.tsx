"use client";

import React, { Suspense } from "react";

// TypeScript interfaces for the wrapper component
export interface FeatureFlagWrapperProps {
  flagKey: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  className?: string;
}

// Error boundary component for feature flag failures
class FeatureFlagErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    onError?: (error: Error) => void;
  },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Feature flag error boundary caught error:", error, errorInfo);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

// Loading component for async flag loading
const DefaultLoadingComponent: React.FC = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-4 w-full" />
);

// Default flag values for fallback behavior
const DEFAULT_FLAG_VALUES: Record<string, boolean> = {
  substack_widget_enabled: true,
  twitter_widget_enabled: true,
  mail_animation_enabled: true,
  text_flip_animation_enabled: true,
};

// Simple flag evaluation function that works on client-side
const evaluateFlag = async (flagKey: string): Promise<boolean> => {
  try {
    // For now, return default values since we need to handle SSR properly
    // This will be enhanced when we implement proper server-side flag evaluation
    return DEFAULT_FLAG_VALUES[flagKey] ?? true;
  } catch (error) {
    console.warn(`Failed to evaluate flag ${flagKey}:`, error);
    return DEFAULT_FLAG_VALUES[flagKey] ?? true;
  }
};

// Main FeatureFlagWrapper component
export const FeatureFlagWrapper: React.FC<FeatureFlagWrapperProps> = ({
  flagKey,
  children,
  fallback = null,
  loadingComponent = <DefaultLoadingComponent />,
  errorComponent = null,
  className,
}) => {
  const [isEnabled, setIsEnabled] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const loadFlag = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Evaluate the feature flag
        const flagResult = await evaluateFlag(flagKey);

        if (isMounted) {
          setIsEnabled(flagResult);
          setIsLoading(false);
        }
      } catch (err) {
        console.warn(`Failed to load feature flag ${flagKey}:`, err);

        if (isMounted) {
          setError(err as Error);
          setIsEnabled(true); // Default to showing content on error
          setIsLoading(false);
        }
      }
    };

    loadFlag();

    return () => {
      isMounted = false;
    };
  }, [flagKey]);

  // Show loading state while flag is being evaluated
  if (isLoading) {
    return <div className={className}>{loadingComponent}</div>;
  }

  // Show error component if there was an error and errorComponent is provided
  if (error && errorComponent) {
    return <div className={className}>{errorComponent}</div>;
  }

  // If flag is disabled, show fallback or nothing
  if (!isEnabled) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  // Flag is enabled, render children with error boundary
  return (
    <FeatureFlagErrorBoundary
      fallback={fallback}
      onError={(err) =>
        console.warn(`Feature flag ${flagKey} runtime error:`, err)
      }
    >
      <div className={className}>{children}</div>
    </FeatureFlagErrorBoundary>
  );
};

// Specialized wrapper for widget components
export interface WidgetControllerProps {
  substackEnabled?: boolean;
  twitterEnabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const WidgetController: React.FC<WidgetControllerProps> = ({
  substackEnabled = true,
  twitterEnabled = true,
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};

// Hook for using feature flags in components
export const useFeatureFlag = (
  flagKey: string
): {
  isEnabled: boolean | null;
  isLoading: boolean;
  error: Error | null;
} => {
  const [isEnabled, setIsEnabled] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const loadFlag = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const flagResult = await evaluateFlag(flagKey);

        if (isMounted) {
          setIsEnabled(flagResult);
          setIsLoading(false);
        }
      } catch (err) {
        console.warn(`Failed to load feature flag ${flagKey}:`, err);

        if (isMounted) {
          setError(err as Error);
          setIsEnabled(true); // Default to enabled on error
          setIsLoading(false);
        }
      }
    };

    loadFlag();

    return () => {
      isMounted = false;
    };
  }, [flagKey]);

  return { isEnabled, isLoading, error };
};

export default FeatureFlagWrapper;
