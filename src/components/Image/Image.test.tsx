import {render} from '@testing-library/react-native';

import Image from './Image';

describe('Image', () => {
  const workingSource = {uri: 'https://ui-avatars.com/api/?name=John+Doe'};
  // const brokenSource = {
  //   uri: 'https://ui-avatars.com/api/?name=John+Doe&broken',
  // };

  const workingFallback = {uri: 'https://ui-avatars.com/api/?name=Jane+Doe'};
  const brokenFallback = {
    uri: 'https://ui-avatars.com/api/?name=Jane+Doe&broken',
  };
  const fallbacks = [workingFallback, brokenFallback];

  it('renders correctly with source', () => {
    const {toJSON} = render(<Image source={workingSource} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with fallback', () => {
    const {toJSON} = render(
      <Image source={workingSource} fallback={workingFallback} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with fallbacks', () => {
    const {toJSON} = render(
      <Image source={workingSource} fallback={fallbacks} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
