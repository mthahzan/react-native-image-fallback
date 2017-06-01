import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';

/**
 * ImageLoader component.
 *
 * This is a simple image loader which can take a source image URL
 * and a fallback image URL.
 * In case of source image failing to load,
 * this will automatically fall back to the fallback image.
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
      imageSource: props.source,
    };

    // Bind the context to required other functions
    this.bindCustomFunction(this);
  }

  /**
   * Invoked before a mounted component receives new props
   * @param  {object} nextProps New props
   */
  componentWillReceiveProps(nextProps) {
    this.setState((state) => {
      return {
        ...state,

        // Set the new state variables
        imageSource: nextProps.source,
      };
    });
  }

  /**
   * Handles the input change event
   * @param  {context} context Context of the React class
   */
  bindCustomFunction(context) {
    this.handleImageLoadSuccess = this.handleImageLoadSuccess.bind(context);
    this.handleImageLoadError = this.handleImageLoadError.bind(context);
  }

  /**
   * Handle image load start
   */
  handleImageLoadStart() {
    // Notify the user what image we are trying to load
    this.props.onLoadStart(this.state.imageSource);
  }

  /**
   * Handle image load error
   */
  handleImageLoadSuccess() {
    // Notify the user what image is loaded
    this.props.onSuccess(this.state.imageSource);
  }

  /**
   * Handle image load error
   */
  handleImageLoadError() {
    // Update the state to switch to fallback image
    this.setState((state) => {
      return {
        ...state,

        // Set the new state variables
        imageSource: this.props.fallback,
      };
    });

    // Notify load error to user
    this.props.onError();
  }

  /**
   * Handle image load error
   */
  handleImageLoadEnd() {
    // Notify the user what image is loaded
    this.props.onLoadEnd(this.state.imageSource);
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    // Image source object
    const source = {
      uri: this.state.imageSource,
    };

    return (
      <Image
          onError={this.handleImageLoadError}
          onLoad={this.handleImageLoadSuccess}
          onLoadEnd={this.handleImageLoadEnd}
          onLoadStart={this.handleImageLoadStart}
          source={source}
          style={this.props.style}
      />
    );
  }
}

/**
 * Prop types of Image Loader component
 * @type {Object}
 */
ImageLoader.propTypes = {
  fallback: PropTypes.string,
  onError: PropTypes.func,
  onLoadEnd: PropTypes.func,
  onLoadStart: PropTypes.func,
  onSuccess: PropTypes.func,
  source: PropTypes.string.isRequired,
  style: PropTypes.object,
};

/**
 * Default props of Image Loader component
 * @type {Object}
 */
ImageLoader.defaultProps = {
  fallback: null,
  onError: () => {},
  onLoadStart: () => {},
  onLoadEnd: () => {},
  onSuccess: () => {},
  style: null,
};

// Export the class
export default ImageLoader;
