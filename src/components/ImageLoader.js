import React from 'react';
import PropTypes from 'prop-types';

/**
 * ImageLoaderComponent class
 */
class ImageLoaderComponent extends React.Component {

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
   * Let React know if a component's output is not affected by the current
   * change in state or props
   * @param  {object}   nextProps Next props
   * @param  {object}   nextState Next state
   * @return {Boolean}            TRUE if the component should be updated
   */
  shouldComponentUpdate(nextProps, nextState) {
    const propsChanged = false;
    const stateChanged = this.state.imageSource !== nextState.imageSource;

    return propsChanged || stateChanged;
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
   * Render the logic of the container
   * @return {JSX} What to be rendered
   */
  render() {
    return null;
  }
}

/**
 * prop types of Image Loader component
 * @type {Object}
 */
ImageLoaderComponent.propTypes = {
  fallback: PropTypes.string,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  source: PropTypes.string.isRequired,
};

/**
 * prop types of Image Loader component
 * @type {Object}
 */
ImageLoaderComponent.defaultProps = {
  fallback: null,
  onError: () => {},
  onSuccess: () => {},
};

// Export the class
export default ImageLoaderComponent;
