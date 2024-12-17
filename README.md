# React Native Image Fallback

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Usage](#usage)
4. [Properties](#properties)
5. [Using a Custom Component](#using-a-custom-component)

## Introduction

React Native Image Fallback is a lightweight image component that supports fallback images for React Native apps. It is a drop-in replacement for the React Native Image component with the added feature of fallback images. This is useful when you want to display a placeholder image when the main image fails to load.

## Getting Started

### Installation

```bash
# Using npm
npm install react-native-image-fallback --save

# Using Yarn
yarn add react-native-image-fallback
```

## Usage

```jsx
import { ImageLoader } from 'react-native-image-fallback';

const IMAGE_URL = { uri: 'http://image.url' };
const FALLBACKS = [
  { uri: 'http://another.image.url' },
  require('./local/image/path'),
];

const App = () => <ImageLoader source={IMAGE_URL} fallback={FALLBACKS} />;
```

## Properties

`ImageLoader` extends the React Native `Image` component, so all the `<Image />` props will work. In addition, it supports the following props:

| Prop        | Type                                         | Description                                                      |
| ----------- | -------------------------------------------- | ---------------------------------------------------------------- |
| `source`    | [`TImageLoaderSource`](#timageloadersource)  | **REQUIRED** The source image                                    |
| `fallback`  | `TImageLoaderSource \| TImageLoaderSource[]` | The fallback image(s). Can be a single item or an array          |
| `component` | Component                                    | Alternative component to use. Default: `Image` from React Native |

### TImageLoaderSource

`TImageLoaderSource` is a type that can be a `require('')` image file, or an [image source](https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageSource.js) object.

### `fallback`

The `fallback` prop can be a single image source or an array of image sources. If the main image fails to load, the fallback image(s) will be used instead. The fallback images are used in the order they are provided.

**Note**: If an array of fallbacks is provided, the library relies on a stable reference to the array. If the reference changes, the fallback logic will reset and start over.

## Using a Custom Component

Any component that has the same props as the React Native `Image` component can be used as a custom component. This is useful when you want to use a custom image component that has additional features or styling. For example, you can easily use a more performant image component like `FastImage` as a fallback.

```jsx
import FastImage from 'react-native-fast-image';

<ImageLoader component={FastImage} source={imageSource} fallback={fallbacks} />;
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
