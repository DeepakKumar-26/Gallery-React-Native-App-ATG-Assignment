import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

const {height, width} = Dimensions.get('window');

function CardImage(props) {
  if (!props.url) return null;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: props.url,
        }}
      />
    </TouchableOpacity>
  );
}

export default CardImage;
const styles = StyleSheet.create({
  container: {
    elevation: 2,
    shadowColor: 'black',
    backgroundColor: 'white',
    margin: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  image: {
    height: (width - 22) / 3,
    width: (width - 22) / 3,
  },
});
