import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  RefreshControl,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {Snackbar} from 'react-native-paper';
import axios from 'axios';

import cache from '../Utility/cache';
import CardImage from '../components/CardImage';
import Screen from '../components/Screen';
import ActivityIndicator from '../components/ActivityIndicator';

function SearchPhotos(props) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchText, setSearchText] = useState('Cat');
  const [pageno, setPageNo] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = React.useState(false);

  const handleDelete = image => {
    const newArr = data.filter(item => item.id !== image.id);
    Alert.alert('Warning', 'Are you sure you want to delete', [
      {
        text: 'Yes',
        onPress: () => setData(newArr),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleSelectPage = page => {
    setCurrentPage(page);
  };

  const handleDecreasePageNo = () => {
    if (pageno === 1) {
      alert('You are at the beginning of the page');
    } else {
      setPageNo(pageno - 1);
    }
  };

  const handleIncreasePageNo = () => {
    if (pageno === 10 - 2) {
      alert('You are at the end of the page');
    } else {
      setPageNo(pageno + 1);
    }
  };

  const handleSearchImage = async () => {
    const api = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=2&extras=url_s&page=${currentPage}&text=${searchText}`;
    try {
      setLoading(true);
      const response = await axios.get(api);
      if (response.status === 200) {
        cache.storeData('searchimages', response.data?.photos?.photo);
        setData(response.data.photos.photo);
        setLoading(false);
      }
    } catch (error) {
      setVisible(true);
      console.log(error);
      const asyncData = await cache.getData('searchimages');
      if (asyncData) {
        setData(asyncData);
      } else {
        setError(true);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearchImage();
  }, [currentPage]);

  return (
      <Screen>
        <View
          style={{
            height: 50,
            backgroundColor: 'grey',
            overflow: 'hidden',
            flexDirection: 'row',
            margin: 5,
            borderRadius: 100,
          }}>
          <TextInput
            style={{backgroundColor: 'white', flex: 1, paddingHorizontal: 10}}
            placeholder="Type here to search..."
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
          <TouchableOpacity onPress={() => handleSearchImage()}>
            <Icon
              name="magnify"
              size={50}
              color="crimson"
              style={{backgroundColor: 'lightgrey'}}
            />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator visible={loading} />
        ) : (
          <View style={{flex: 1}}>
            <FlatList
            keyboardDismissMode='on-drag'
              keyboardShouldPersistTaps="never"
              refreshing={refresh}
              onRefresh={handleSearchImage}
              horizontal={false}
              numColumns={3}
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <CardImage
                  url={item.url_s}
                  onPress={() => navigation.navigate('Photo', {item: item})}
                  onLongPress={() => handleDelete(item)}
                />
              )}
            />
            {/* PaginationComponent   */}
            <View style={styles.containerPagination}>
              <TouchableOpacity
                onPress={handleDecreasePageNo}
                style={styles.smallBtn}>
                <Icon name="chevron-left" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelectPage(pageno)}
                style={styles.smallBtn}>
                <Text>{pageno}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelectPage(pageno + 1)}
                style={styles.smallBtn}>
                <Text>{pageno + 1}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelectPage(pageno + 2)}
                style={styles.smallBtn}>
                <Text>{pageno + 2}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleIncreasePageNo}
                style={styles.smallBtn}>
                <Icon name="chevron-right" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'Retry',
            onPress: () => {
              handleSearchImage();
              setVisible(false);
            },
          }}>
          Something went wrong...
        </Snackbar>
      </Screen>
  );
}

export default SearchPhotos;

const styles = StyleSheet.create({
  containerPagination: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  smallBtn: {
    backgroundColor: 'lightgrey',
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 2.5,
  },
});
