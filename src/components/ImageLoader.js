import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';

/**
 * ImageLoader component.
 *
 * This is a simple image loader which can take a source image URL
 * and fallback image URL(s).
 * In case of source image failing to load,
 * this will automatically fall back to the fallback image(s).
 */
class ImageLoader extends React.PureComponent {
  /**
   * Image loader component constructor
   * @param {object} props Props passed to the component
   */
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      // Get all the image sources given as an array
      imageSources: this.getAllImageSources(props),

      // Keeping track of what we've done already
      // We keep the index of what we are currently trying to display
      currentImageIndex: 0,
    };
  }

  /**
   * Invoked before a mounted component receives new props
   * @param  {object} nextProps New props
   */
  componentWillReceiveProps(nextProps) {
    // Get the imagesources into an array
    const imageSources = this.getAllImageSources(nextProps);

    this.setState((state) => {
      return {
        ...state,

        // Set the new state variables
        imageSources,
        currentImageIndex: 0,
      };
    });
  }

  /**
   * Get all the image sources from the props
   * @param  {any}   props  The props to get the images from
   * @return {Array}        Array of image sources
   */
  getAllImageSources = (props) => {
    // Create a new array
    let imageSources = [];

    // Concat the source if available
    if (props.source) {
      imageSources = imageSources.concat(props.source);
    }

    // Concat the fallback(s) if they are given
    if (props.fallback) {
      imageSources = imageSources.concat(props.fallback);
    }

    // Return the filtered out image sources
    // No null should be present here
    // Also, please no duplicates
    return [...new Set(imageSources.filter((imageSource) => imageSource))];
  }

  /**
   * Handle image load start
   */
  handleImageLoadStart = () => {
    // Notify the user what image we are trying to load
    this.props.onLoadStart(
      this.state.imageSources[this.state.currentImageIndex]
    );
  }

  /**
   * Handle image load error
   */
  handleImageLoadSuccess = () => {
    // Notify the user what image is loaded
    this.props.onSuccess(
      this.state.imageSources[this.state.currentImageIndex]
    );
  }

  /**
   * Handle image load error
   */
  handleImageLoadError = () => {
    // Get the image sources and current index
    const {imageSources, currentImageIndex} = this.state;

    // Check if we have run out of sources
    if (currentImageIndex >= imageSources.length) {
      // That's it, we have done everything we can
      this.props.onError();
    } else {
      // We still have options
      // Update the state to switch to fallback image
      this.setState((state) => {
        return {
          ...state,

          // Set the new state variables
          currentImageIndex: currentImageIndex + 1,
        };
      });
    }
  }

  /**
   * Handle image load end
   */
  handleImageLoadEnd = () => {
    // Notify the user what image is loaded
    this.props.onLoadEnd(
      this.state.imageSources[this.state.currentImageIndex]
    );
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    // Image source
    const imageSource = this.state.imageSources[this.state.currentImageIndex];
    let source = null;

    // Figure out what type of image we are dealing with
    switch (typeof imageSource) {
    case 'string':
      // If a string is given, we assume it's a URI
      source = {
        uri: imageSource,
      };

      break;
    case 'number':
      // If a number is given,
      // we assume it's an opaque type returned by require('./image.jpg')
      source = imageSource;

      break;
    }

    return (
      <Image
        {...this.props}
        onError={this.handleImageLoadError}
        onLoad={this.handleImageLoadSuccess}
        onLoadEnd={this.handleImageLoadEnd}
        onLoadStart={this.handleImageLoadStart}
        source={source}
      />
    );
  }
}

/**
 * Prop types of Image Loader component
 * @type {Object}
 */
ImageLoader.propTypes = {
  // Fallback can be a string or an array of strings
  fallback: PropTypes.oneOfType([
    // String image URL
    PropTypes.string,

    // Opaque type returned by require('./image.jpg')
    PropTypes.number,

    // Or an array of either (even mixed)
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  ]),

  onError: PropTypes.func,
  onLoadEnd: PropTypes.func,
  onLoadStart: PropTypes.func,
  onSuccess: PropTypes.func,

  // We can accept an array of sources,
  // but having a list of fallbacks and sources doesn't sound right to me.
  // If required, this can be easily facilitated in the future.
  // Just change the PropType, no change to the logic should be required
  source: PropTypes.oneOfType([
    PropTypes.string,

    // Opaque type returned by require('./image.jpg')
    PropTypes.number,
  ]).isRequired,
};

/**
 * Default props of Image Loader component
 * @type {Object}
 */
ImageLoader.defaultProps = {
  fallback: null,
  onError: () => {},
  onLoadEnd: () => {},
  onLoadStart: () => {},
  onSuccess: () => {},
};

// Export the class
export default ImageLoader;
