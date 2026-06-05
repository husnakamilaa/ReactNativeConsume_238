import axios from 'axios';
import { API_URL } from '../../constants/Config';
import * as SecureStore from 'expo-secure-store';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

