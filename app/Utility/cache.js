import AsyncStorage from '@react-native-async-storage/async-storage';

// Storing the data in async storage...........................
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
};

// Getting the data from async storage.........................
const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.log(error);
  }
};

export default {storeData, getData};
