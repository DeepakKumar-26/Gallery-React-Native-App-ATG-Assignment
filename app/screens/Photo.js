import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

function Photo({...props}) {
  const [viewOptions, setViewOptions] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const backgroundColor = viewOptions ? 'white' : 'black';

  const image = props.route.params.uri;
  useEffect(() => {
    setViewOptions(false);
    setViewDetails(false);
  }, [props.route.params.uri]);

  const handleViewPress = () => {
    setViewOptions(!viewOptions);
  };

  return (
    <View
      onStartShouldSetResponder={handleViewPress}
      style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Image
        source={{
          uri: props.route.params.item.url_s,
        }}
        style={styles.image}
      />

      {viewOptions && (
        <View style={styles.details}>
          {viewDetails && (
            <View
              style={{
                borderRadius: 10,
                padding: 20,
                backgroundColor: 'grey',
                bottom: 5,
                backgroundColor: 'rgba(7, 7, 7, 0.33)',
                margin: 10,
              }}>
              <Text style={styles.text}>
                Title: {props.route.params.item.title}
              </Text>
              <Text style={styles.text}>Id : {props.route.params.item.id}</Text>
              <Text style={styles.text}>
                Owner: {props.route.params.item.owner}
              </Text>
            </View>
          )}

          <View style={{height: 70, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setViewDetails(!viewDetails)}>
              <Icon name="dots-vertical-circle" size={50} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default Photo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  details: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    // height: 70,

    position: 'absolute',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
  },
});
