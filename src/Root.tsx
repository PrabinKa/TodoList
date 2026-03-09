import React from 'react';
import RootNavigator from './navigation/root_nav/RootNavigator';
import ToastProvider from 'toastify-react-native';
import { getToastConfig } from './utils/toast/toastConfig';
import { useTheme } from './context/ThemeContext';

const Root = () => {
    const { theme } = useTheme();
  return (
    <React.Fragment>
      <RootNavigator />
      <ToastProvider {...getToastConfig(theme)} />
    </React.Fragment>
  );
};

export default Root;
