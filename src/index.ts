import Image from './components/Image';

// Export all the components
export * from './components';

/**
 * @deprecated Use default export instead
 * import Image from 'react-native-image-fallback';
 *
 * This is added for backwards compatibility and will be removed on the next major version.
 */
const ImageLoader = Image;
export {ImageLoader};

export default Image;
