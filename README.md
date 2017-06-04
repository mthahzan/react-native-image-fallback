# React Native Image Fallback

## 1. What is React Native Image Fallback?
React Native Image Fallback is a lightweight image component which supports fallback images for React Native apps.

## 2. Getting Started
*Install React Native Image Fallback*

```bash
npm i react-native-image-fallback --save
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
- `onLoadStart` - Accepts a calback function with the first parameter being the image that is being loaded to the component.
- `onLoadEnd` - Invoked when load either succeeds or fails. Accepts a callback function with the first parameter being the image in question.
- `onSuccess` - Invoked when the component successfully loads an image. Accepts a callback function with the first parameter being the loaded image.
- `onError` - Invoked when all the given images fail to load.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
