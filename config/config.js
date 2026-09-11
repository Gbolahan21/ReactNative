import Constants from 'expo-constants';

const hostUri = Constants.expoConfig?.hostUri;

const host = hostUri
  ? hostUri.split(':')[0]
  : 'localhost';

export const BASE_URL = `http://${host}:5000`;