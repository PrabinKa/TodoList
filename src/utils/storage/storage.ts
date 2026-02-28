import * as Keychain from 'react-native-keychain';

const SERVICE_NAME = 'com.todolist';

const buildService = (key: string) => `${SERVICE_NAME}.${key}`;

const setItem = async (key: string, value: string): Promise<boolean> => {
  try {
    await Keychain.setGenericPassword(key, value, {
      service: buildService(key),
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
    return true;
  } catch (error) {
    console.log('SecureStorage setItem error:', error);
    return false;
  }
};

const getItem = async (key: string): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: buildService(key),
    });

    return credentials ? credentials.password : null;
  } catch (error) {
    console.log('SecureStorage getItem error:', error);
    return null;
  }
};

const removeItem = async (key: string): Promise<boolean> => {
  try {
    await Keychain.resetGenericPassword({
      service: buildService(key),
    });
    return true;
  } catch (error) {
    console.log('SecureStorage removeItem error:', error);
    return false;
  }
};

const setObject = async (key: string, value: any) => {
  return setItem(key, JSON.stringify(value));
};

const getObject = async <T>(key: string): Promise<T | null> => {
  const data = await getItem(key);
  return data ? (JSON.parse(data) as T) : null;
};

export const SecureStorage = {
  setItem,
  getItem,
  removeItem,
  setObject,
  getObject,
};