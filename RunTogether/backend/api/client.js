import axios from 'axios';
import Constants from 'expo-constants';

const { expoConfig } = Constants;
const IP = expoConfig.extra.IP;

export default axios.create({ baseURL: `http://${IP}:5000` });