import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import cache from '../Utility/cache';
import CardImage from '../components/CardImage';
import Screen from '../components/Screen';
import ActivityIndicator from '../components/ActivityIndicator';

function HomeScreen(props) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pageno, setPageNo] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

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

  const fetchData = async () => {
    const api = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=${currentPage}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`;
    try {
      setLoading(true);
      const response = await axios.get(api);
      if (response.status === 200) {
        cache.storeData('images', response.data.photos.photo);
        setData(response.data.photos.photo);
      }
      setLoading(false);
    } catch (error) {
      if (error.message === 'Network Error') {
        const asyncData = await cache.getData('images');
        if (asyncData) {
          setData(asyncData);
        } else {
          setError(true);
        }
      }
      setLoading(false);
    }
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

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  if (loading) return <ActivityIndicator visible={loading} />;

  return (
    <Screen>
      <View style={{flex: 1}}>
        <FlatList
          refreshing={refresh}
          onRefresh={fetchData}
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
    </Screen>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  containerPagination: {
    // backgroundColor: 'crimson',
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
