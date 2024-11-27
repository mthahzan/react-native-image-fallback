import React, { useState, useEffect } from 'react';
import {
  Image,
  type ImageProps,
  type ImageURISource,
  type ImageRequireSource,
  type NativeSyntheticEvent,
  type ImageErrorEventData,
} from 'react-native';

type TOptional<T> = T | undefined | null;

/**
 * An image asset that has to be loaded from a URI
 */
export type TImageLoaderSourceUri = ImageURISource;

/**
 * An image asset that is loaded from a require('path/to/file') call
 */
export type TImageLoaderSourceRequire = ImageRequireSource;

/**
 * A source for the image loader
 */
export type TImageLoaderSource =
  | TImageLoaderSourceUri
  | TImageLoaderSourceRequire;

/**
 * Fallback image asset(s)
 */
export type TImageLoaderFallback = TImageLoaderSource | TImageLoaderSource[];

export type TImageLoaderProps<T = ImageProps> = T & {
  /**
   * Custom component to be used instead of react-native Image component
   * Defaults to `Image` component from `react-native`
   */
  component?: React.ComponentType<T>;

  /**
   * The image asset to load
   */
  source: TImageLoaderSource;

  /**
   * The fallback image asset(s)
   * This can be a single source or an array of sources
   * If an array is given, the image loader will try each source in order
   * until one of them loads successfully.
   * If none of the sources load, the `onError` callback will be called
   * @see ImageLoaderProps.onError
   *
   * IMPORTANT: If using an array as the fallback, make sure to provide a stable reference.
   * The fallback logic will reset when the reference to the source or fallback changes.
   */
  fallback?: TImageLoaderFallback;

  /**
   * Callback function that is called when an image loads successfully
   */
  onSuccess?: () => void;
};

// Helper function to get all sources
const getAllSources = (
  source: TImageLoaderSource,
  fallback: TOptional<TImageLoaderFallback>
): TImageLoaderSource[] => {
  const result = [source];

  if (fallback) {
    if (Array.isArray(fallback)) {
      result.push(...fallback);
    } else {
      result.push(fallback);
    }
  }

  return result;
};

/**
 * A barebones image loader component that can handle falling back to backup images when the primary image fails to load
 */
export const ImageLoader: React.FC<TImageLoaderProps> = (props) => {
  const {
    // After spending a few hours trying to get this to work, I'm giving up
    // As a workaround, I'm casting the `Image` component to `any`
    // TODO: Fix this typing
    component: CustomComponent = Image as any,

    source,
    fallback,
    onError,
    ...rest
  } = props;
  const allSources = getAllSources(source, fallback);
  const [currentSource, setCurrentSource] =
    useState<TImageLoaderSource>(source);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  console.log('*** allSources', allSources);
  console.log('*** currentSource', currentSource);
  console.log('*** fallbackIndex', fallbackIndex);

  // Start with the source prop
  // And reset the index when the source or fallback changes
  useEffect(() => {
    setCurrentSource(source);
    setFallbackIndex(0);
  }, [source, fallback]);

  const handleError = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
    // If we have more sources to try, move to the next one
    const nextIndex = fallbackIndex + 1;
    const nextSource = allSources[nextIndex];
    if (nextSource) {
      console.log('*** moving to item', nextSource);
      setFallbackIndex(nextIndex);
      setCurrentSource(nextSource);
    } else {
      console.log('*** no more items');
      // The sources have been exhausted
      // Call the onError callback if provided
      onError?.(error);
    }
  };

  return (
    <CustomComponent source={currentSource} onError={handleError} {...rest} />
  );
};
