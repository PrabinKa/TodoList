import { Alert } from 'react-native';
import { STORAGE_KEY } from '../../constants/keys';
import { SecureStorage } from '../storage/storage';
import { navigationRef } from '../navigationRef';
import { userDetailsActions } from '../../store/slice/userDetails';
import { store } from '../../store/store';

let isLoggingOut = false;

export const logout = async () => {
  //Prevents from multiple logout alert when multiple api request fails
  if (isLoggingOut) {
    return;
  }

  isLoggingOut = true;

  const removeStorage = async () => {
    await SecureStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    await SecureStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);

    store.dispatch(userDetailsActions.clearUserDetails());

    // Navigate to Login screen
    navigationRef.reset({
      index: 0,
      routes: [
        {
          name: 'AuthScreen',
          state: {
            routes: [{ name: 'Login' }],
          },
        },
      ],
    });

    isLoggingOut = false;
  };

  Alert.alert('Session expired!', 'Please login again.', [
    {
      text: 'OK',
      onPress: () => {
        removeStorage();
      },
    },
  ]);
};
