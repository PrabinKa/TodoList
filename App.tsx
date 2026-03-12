import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import { ThemeProvider } from './src/context/ThemeContext';
import { ThemedStatusBar } from './src/utils';
import Root from './src/Root';
import { PermissionsAndroid } from 'react-native';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const requestPermission = async () => {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    };

    requestPermission();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <ThemeProvider>
              <ThemedStatusBar />
              <Root />
            </ThemeProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
