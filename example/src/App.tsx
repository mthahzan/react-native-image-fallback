import { StyleSheet, View } from 'react-native';
import { ImageLoader } from 'react-native-image-fallback';

const source = { uri: 'https://api.multiavatar-s.com/Binx Bond.png' };
const fallback = { uri: 'https://api.multiavatar.com/Binx Bond.png' };

export default function App() {
  return (
    <View style={styles.container}>
      <ImageLoader style={styles.image} source={source} fallback={fallback} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 120,
    height: 120,
  },
});
