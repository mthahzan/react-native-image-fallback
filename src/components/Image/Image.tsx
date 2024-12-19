import React, {useState, useEffect} from 'react';
import {
  Image as RNImage,
  type ImageProps,
  type ImageURISource,
  type ImageRequireSource,
  type NativeSyntheticEvent,
  type ImageErrorEventData,
} from 'react-native';

/**
 * An image asset that has to be loaded from a URI
 */
export type TImageSourceUri = ImageURISource;

/**
 * An image asset that is loaded from a require('path/to/file') call
 */
export type TImageSourceRequire = ImageRequireSource;

/**
 * A source for the image loader
 */
export type TImageSource = TImageSourceUri | TImageSourceRequire;

/**
 * Fallback image asset(s)
 */
export type TImageFallback = TImageSource | TImageSource[];

export type TImageProps<T = ImageProps> = T & {
  /**
   * Custom component to be used instead of react-native Image component
   * Defaults to `Image` component from `react-native`
   */
  component?: React.ComponentType<T>;

  /**
   * The image asset to load
   */
  source: TImageSource;

  /**
   * The fallback image asset(s)
   * This can be a single source or an array of sources
   * If an array is given, the image loader will try each source in order
   * until one of them loads successfully.
   * If none of the sources load, the `onError` callback will be called
   *
   * IMPORTANT: If using an array as the fallback, make sure to provide a stable reference.
   * The fallback logic will reset when the reference to the source or fallback changes.
   */
  fallback?: TImageFallback;
};

/**
 * A barebones image loader component that can handle falling back to backup images when the primary image fails to load
 */
const Image: React.FC<TImageProps> = (props) => {
  const {
    // After spending a few hours trying to get this to work, I'm giving up
    // As a workaround, I'm casting the `Image` component to `any`
    // TODO: Fix this typing
    component: CustomComponent = RNImage as any,

    source,
    fallback,
    onError,
    ...rest
  } = props;
  const [currentSource, setCurrentSource] = useState<TImageSource>(source);
  const [sourceIndex, setSourceIndex] = useState(0);

  // Start with the source prop
  // And reset the index when the source or fallback changes
  useEffect(() => {
    setCurrentSource(source);
    setSourceIndex(0);
  }, [source, fallback]);

  const handleError = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
    // If we have more sources to try, move to the next one
    const nextIndex = sourceIndex + 1;

    // The logic can never go back to the source prop on an onError event
    // It can only move forward to a fallback
    // So, we can safely assume that the nextIndex will always be greater than 0
    // We are using this logic to resolve the next fallback source
    const fallbacks = Array.isArray(fallback) ? fallback : [fallback];
    const nextSource = fallbacks[nextIndex - 1]; // Subtracting 1 to compensate for the source item

    if (nextSource) {
      setSourceIndex(nextIndex);
      setCurrentSource(nextSource);
    } else {
      // The sources have been exhausted
      // Call the onError callback if provided
      onError?.(error);
    }
  };

  return (
    <CustomComponent source={currentSource} onError={handleError} {...rest} />
  );
};

export default Image;
