# React Native Image Fallback

## 1. What is React Native Image Fallback?
React Native Image Fallback is a lightweight image component which supports fallback images for React Native apps.

## 2. Getting Started
*Install React Native Image Fallback*

```bash
npm i react-native-image-fallback --save

or

yarn add react-native-image-fallback
```

## 3. Usage
Import it
```js
import {ImageLoader} from 'react-native-image-fallback';
```

Use it in you component
```js
render() {
  const imageSource = 'http://image.url'; // An image URL
  const fallbacks = [
    'http://another.image.url', // An image URI
    require('./local/image/path'), // A locally require'd image
  ];

  return (
    <ImageLoader
      source={imageSource}
      fallback={fallbacks}
    />
  )
}
```

## 4. Properties

This is basically a React Native `Image`. So all the `<Image />` props will work. On top of that
- `source` - The source image. Can be a string URL or a `require('')` image file
- `fallback` - The fallback(s). Can be a string URL, a `require('')` image file or an array consisting of either
- `component` - The component to use when rendering the image. Defaults to React Native image
- `onLoadStart` - Accepts a calback function with the first parameter being the image that is being loaded to the component.
- `onLoadEnd` - Invoked when load either succeeds or fails. Accepts a callback function with the first parameter being the image in question.
- `onSuccess` - Invoked when the component successfully loads an image. Accepts a callback function with the first parameter being the loaded image.
- `onError` - Invoked when all the given images fail to load.

## 5. Using a custom component

Since the fallback feature heavily relies on callbacks of ReactNative Image component (`source`, `onLoadStart`, `onLoad`, `onLoadEnd` and `onLoad`), **make sure the custom component is an extension** or with similar callbacks.

```jsx
<ImageLoader
  component={MyCustomImageComponent}
  source={imageSource}
  fallback={fallbacks}
/>
```

## Note on using an array of fallbacks

On a case where you use an array of fallbacks, make sure the array reference stays the same throughout the rendering cycles. If you create new arrays on renders (like stated above on the example), it will reset the fallback logic and it will start over again. Not a good scenario if you care about performance.

```js
render() {
  const imageSource = 'http://image.url';
  const fallbacks = ['http://another.image.url', 'http://one-more.image.url'];
  // This is not recommended
  // This will create new arrays on each render and it will reset the ImageLoader.
  // If the fallbacks are constant, try defining as a class property or a constant outside the component's render scope.
  // If it's not constant, you may need to look into memoizing techniques.

  return (
    <ImageLoader
      source={imageSource}
      fallback={fallbacks}
    />
  )
}
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
