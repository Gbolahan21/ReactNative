import AsyncStorage from '@react-native-async-storage/async-storage';
import notification from './notification';

const TOKEN_KEY = 'user:token';

const token = {
  get: async () => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      notification.error('Error getting token:', error);
      return null;
    }
  },

  set: async (newToken) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, newToken);
    } catch (error) {
      notification.error('Error saving token:', error);
    }
  },

  remove: async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      notification.error('Error removing token:', error);
    }
  },
};

export default token;
