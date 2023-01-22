import { AsyncStorage } from 'react-native';

const getStoredToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.log('Failed to retrieve token: ', error);
    }
}

const setAuthToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.log('Failed to store token: ', error);
    }
};

const removeAuthToken  = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.log('Failed to remove token: ', error);
    }
}

export { setAuthToken, getStoredToken, removeAuthToken  }
